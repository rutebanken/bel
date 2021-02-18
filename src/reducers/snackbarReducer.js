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

import * as types from "./../actions/actionTypes";

const intialState = {
  isOpen: false,
  message: "",
  status: null,
  errorMsg: null,
};

const snackbarReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.SUCCESS_VALIDATE_DATASET:
      return Object.assign({}, state, {
        isOpen: true,
        message: "Validering har startet",
        status: types.STATUS_SUCCESS,
        errorMsg: null,
      });

    case types.ERROR_VALIDATE_DATASET:
      return Object.assign({}, state, {
        isOpen: true,
        message: "Validering feilet",
        status: types.STATUS_ERROR,
        errorMsg: action.payLoad.errorMsg,
      });

    case types.DISMISSED_SNACKBAR:
      return Object.assign({}, state, intialState);

    default:
      return state;
  }
};

export default snackbarReducer;
