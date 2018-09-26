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

import * as types from './../actions/actionTypes';

const intialState = {
  isModalOpen: false,
  fileUpload: {
    progress: 0,
    state: types.FILE_UPLOAD_NOT_STARTED
  },
  noOrganisations: false
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.DISMISSED_FILEUPLOAD_MODAL:
      return Object.assign({}, state, {
        fileUpload: {
          progress: 0,
          state: types.FILE_UPLOAD_NOT_STARTED
        },
        isModalOpen: false
      });

    case types.OPENED_FILEUPLOAD_MODAL:
      return Object.assign({}, state, { isModalOpen: true });

    case types.USER_NO_ORGANISATIONS:
      return Object.assign({}, state, { noOrganisations: true });

    case types.UPDATED_FILE_UPLOAD_PROGRESS_BAR_STATE:
      return Object.assign({}, state, {
        fileUpload: {
          ...state.fileUpload,
          state: action.payLoad
        }
      });

    case types.UPDATED_FILE_UPLOAD_PROGRESS_BAR:
      return Object.assign({}, state, {
        fileUpload: {
          progress: action.payLoad,
          state: types.FILE_UPLOAD_UPLOADING
        }
      });

    default:
      return state;
  }
};

export default userReducer;
