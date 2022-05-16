/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

import axios from "axios";
import * as types from "./actionTypes";
import moment from "moment";
import actionNames from "../translations/no/actions";

const AsyncActions = {};

const getConfig = async (auth) => {
  let config = {};
  const accessToken = await auth.getAccessToken();
  config.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + accessToken,
  };
  return config;
};

AsyncActions.getProviderStatus = (id) => async (dispatch, getState) => {
  const url = `${window.config.eventsBaseUrl}timetable/${id}`;
  dispatch(sendData(null, types.REQUESTED_EVENTS));
  dispatch(sendData(id, types.CHANGED_ACTIVE_PROVIDER));
  return axios({
    url: url,
    timeout: 20000,
    method: "get",
    responseType: "json",
    ...(await getConfig(getState().userReducer.auth)),
  })
    .then((response) => {
      let providerStatus = formatProviderStatusDate(response.data);
      dispatch(sendData(providerStatus, types.RECEIVED_EVENTS));
    })
    .catch((response) => {
      dispatch(sendData(response.data, types.ERROR_EVENTS));
    });
};

AsyncActions.getProviderEvents = (id) => async (dispatch, getState) => {
  const url = `${window.config.eventsBaseUrl}timetable/${id}`;
  dispatch(sendData(null, types.REQUESTED_EVENTS));
  return axios({
    url: url,
    timeout: 20000,
    method: "get",
    responseType: "json",
    ...(await getConfig(getState().userReducer.auth)),
  })
    .then((response) => {
      let providerStatus = formatProviderStatusDate(response.data);
      dispatch(sendData(providerStatus, types.RECEIVED_EVENTS));
    })
    .catch((response) => {
      dispatch(sendData(response.data, types.ERROR_EVENTS));
    });
};

AsyncActions.getAllSuppliers = () => async (dispatch, getState) => {
  dispatch(sendData(null, types.REQUESTED_SUPPLIERS));
  const url = window.config.providersBaseUrl;
  const state = getState();

  return axios({
    url: url,
    timeout: 20000,
    method: "get",
    responseType: "json",
    ...(await getConfig(state.userReducer.auth)),
  })
    .then((response) => {
      dispatch(sendData(response.data, types.RECEIVED_SUPPLIERS));
      const userOrganisations = response.data;

      if (userOrganisations.length) {
        dispatch(AsyncActions.getProviderStatus(userOrganisations[0].id));
      } else {
        dispatch(sendData(null, types.USER_NO_ORGANISATIONS));
      }
    })
    .catch((response) => {
      dispatch(sendData(response.data, types.ERROR_SUPPLIERS));
    });
};

AsyncActions.validateDataSet = (providerId) => async (dispatch, getState) => {
  dispatch(sendData(null, types.REQUESTED_VALIDATE_DATASET));
  const url = window.config.timetableAdminBaseUrl + `${providerId}/validate`;
  return axios
    .post(url, null, await getConfig(getState().userReducer.auth))
    .then((response) => {
      dispatch(sendData(null, types.SUCCESS_VALIDATE_DATASET));
    })
    .catch((err) => {
      /* no human-readable error message is given anyway */
      dispatch(
        sendData(
          {
            errorMsg: "En uventet feil har oppstått",
          },
          types.ERROR_VALIDATE_DATASET
        )
      );
    });
};

AsyncActions.uploadFiles = (files) => async (dispatch, getState) => {
  const state = getState();
  const id = state.asyncReducer.currentSupplier.id;

  dispatch(sendData(0, types.UPDATED_FILE_UPLOAD_PROGRESS_BAR));

  const url = `${window.config.timetableAdminBaseUrl}${id}/files`;

  var data = new FormData();

  files.forEach((file) => {
    data.append("files", file);
  });

  const config = {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = (progressEvent.loaded / progressEvent.total) * 100;
      dispatch(
        sendData(percentCompleted, types.UPDATED_FILE_UPLOAD_PROGRESS_BAR)
      );
    },
    ...(await getConfig(getState().userReducer.auth)),
  };

  return axios
    .post(url, data, config)
    .then((response) => {
      dispatch(
        sendData(
          types.FILE_UPLOAD_COMPLETED,
          types.UPDATED_FILE_UPLOAD_PROGRESS_BAR_STATE
        )
      );
    })
    .catch((response) => {
      dispatch(
        sendData(
          types.FILE_UPLOAD_FAILED,
          types.UPDATED_FILE_UPLOAD_PROGRESS_BAR_STATE
        )
      );
    });
};

const sendData = (payLoad, type) => ({
  payLoad,
  type,
});

const formatProviderStatusDate = (list) => {
  return list
    .sort((a, b) => a.firstEvent - b.firstEvent)
    .map((listItem) => {
      listItem.firstEvent = moment(listItem.firstEvent)
        .locale("nb")
        .format("YYYY-MM-DD HH:mm:ss");
      listItem.lastEvent = moment(listItem.lastEvent)
        .locale("nb")
        .format("YYYY-MM-DD HH:mm:ss");
      listItem.duration = moment(listItem.durationMillis)
        .locale("nb")
        .utc()
        .format("HH:mm:ss");
      listItem.started = moment(listItem.firstEvent).locale("nb").fromNow();

      listItem.events.forEach(function (event) {
        event.date = moment(event.date)
          .locale("nb")
          .format("YYYY-MM-DD HH:mm:ss");
        event.actionString = actionNames[event.action];
      });
      return listItem;
    })
    .reverse();
};

export default AsyncActions;
