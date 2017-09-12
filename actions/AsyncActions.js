import axios from 'axios';
import * as types from './actionTypes';
import moment from 'moment';
import actionNames from '../translations/no/actions';
import roleParser from '../roles/roleParser';

import { formatLineStats } from 'bogu/utils';

const AsyncActions = {};

const getConfig = () => {
  let config = {};
  let token = localStorage.getItem('BEL::jwt');

  config.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token
  };

  return config;
};

AsyncActions.getProviderStatus = id => dispatch => {
  const url = `${window.config.eventsBaseUrl}timetable/${id}`;
  dispatch(sendData(null, types.REQUESTED_EVENTS));
  dispatch(sendData(id, types.CHANGED_ACTIVE_PROVIDER));
  return axios({
    url: url,
    timeout: 20000,
    method: 'get',
    responseType: 'json',
    ...getConfig()
  })
    .then(response => {
      let providerStatus = formatProviderStatusDate(response.data);
      dispatch(AsyncActions.getLineStats(id));
      dispatch(AsyncActions.getLatestDeliveryForProvider(id));
      dispatch(sendData(providerStatus, types.RECEIVED_EVENTS));
    })
    .catch(response => {
      dispatch(sendData(response.data, types.ERROR_EVENTS));
    });
};

AsyncActions.getProviderEvents = id => dispatch => {
  const url = `${window.config.eventsBaseUrl}timetable/${id}`;
  dispatch(sendData(null, types.REQUESTED_EVENTS));
  return axios({
    url: url,
    timeout: 20000,
    method: 'get',
    responseType: 'json',
    ...getConfig()
  })
    .then(response => {
      let providerStatus = formatProviderStatusDate(response.data);
      dispatch(sendData(providerStatus, types.RECEIVED_EVENTS));
    })
    .catch(response => {
      dispatch(sendData(response.data, types.ERROR_EVENTS));
    });
};

AsyncActions.getAllSuppliers = () => (dispatch, getState) => {
  dispatch(sendData(null, types.REQUESTED_SUPPLIERS));

  const url = window.config.providersBaseUrl;
  const state = getState();

  return axios({
    url: url,
    timeout: 20000,
    method: 'get',
    responseType: 'json',
    ...getConfig()
  })
    .then(response => {
      dispatch(sendData(response.data, types.RECEIVED_SUPPLIERS));
      const userOrganisations = roleParser.getUserOrganisations(
        state.userReducer.kc.tokenParsed,
        response.data
      );

      if (userOrganisations.length) {
        dispatch(AsyncActions.getProviderStatus(userOrganisations[0].id));
      } else {
        dispatch(sendData(null, types.USER_NO_ORGANISATIONS));
      }
    })
    .catch(response => {
      dispatch(sendData(response.data, types.ERROR_SUPPLIERS));
    });
};

AsyncActions.getLineStats = id => dispatch => {
  dispatch(sendData(null, types.REQUESTED_LINE_STATS));
  return axios({
    url: `${window.config
      .mardukBaseUrl}admin/services/chouette/${id}/lineStats`,
    timeout: 10000,
    method: 'get',
    responseType: 'json',
    ...getConfig()
  })
    .then(response => {
      let formattedLines = formatLineStats(response.data);
      dispatch(sendData(formattedLines, types.RECEIVED_LINE_STATS));
    })
    .catch(response => {
      console.error(response);
    });
};

AsyncActions.getLatestDeliveryForProvider = providerId => dispatch => {
  dispatch(sendData(null, types.REQUESTED_LATEST_DELIVERY_DATE));

  return axios({
    url: `${window.config.eventsBaseUrl}latest_upload/${providerId}`,
    timeout: 1000,
    method: 'get',
    responseTYpe: 'json',
    ...getConfig()
  })
    .then(response => {
      dispatch(sendData(response.data, types.RECEIVED_LATEST_DELIVERY_DATE));
    })
    .catch(response => {
      console.error(response);
    });
};

AsyncActions.uploadFiles = files => (dispatch, getState) => {
  const state = getState();
  const id = state.asyncReducer.currentSupplier.id;

  dispatch(sendData(0, types.UPDATED_FILE_UPLOAD_PROGRESS_BAR));

  const url = `${window.config.mardukBaseUrl}admin/services/chouette/${id}/files`;

  var data = new FormData();

  files.forEach(file => {
    data.append('files', file);
  });

  const config = {
    onUploadProgress: progressEvent => {
      var percentCompleted = progressEvent.loaded / progressEvent.total * 100;
      dispatch(
        sendData(percentCompleted, types.UPDATED_FILE_UPLOAD_PROGRESS_BAR)
      );
    },
    ...getConfig()
  };

  return axios
    .post(url, data, config)
    .then(response => {
      dispatch(
        sendData(
          types.FILE_UPLOAD_COMPLETED,
          types.UPDATED_FILE_UPLOAD_PROGRESS_BAR_STATE
        )
      );
    })
    .catch(response => {
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
  type
});

const formatProviderStatusDate = list => {
  return list
    .sort((a, b) => a.firstEvent - b.firstEvent)
    .map(listItem => {
      listItem.firstEvent = moment(listItem.firstEvent)
        .locale('nb')
        .format('YYYY-MM-DD HH:mm:ss');
      listItem.lastEvent = moment(listItem.lastEvent)
        .locale('nb')
        .format('YYYY-MM-DD HH:mm:ss');
      listItem.duration = moment(listItem.durationMillis)
        .locale('nb')
        .utc()
        .format('HH:mm:ss');
      listItem.started = moment(listItem.firstEvent).locale('nb').fromNow();

      listItem.events.forEach(function(event) {
        event.date = moment(event.date)
          .locale('nb')
          .format('YYYY-MM-DD HH:mm:ss');
        event.actionString = actionNames[event.action];
      });
      return listItem;
    })
    .reverse();
};

export default AsyncActions;
