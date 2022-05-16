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

const initialState = {
  isLoading: false,
  events: [],
  suppliers: [],
  isFetchingEvents: false,
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUESTED_EVENTS:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.RECEIVED_EVENTS:
      return Object.assign({}, state, {
        events: action.payLoad,
        isFetchingEvents: false,
        isLoading: false
      });

    case types.ERROR_EVENTS:
      return Object.assign({}, state, { isFetchingEvents: false });

    case types.CHANGED_ACTIVE_PROVIDER:
      return Object.assign({}, state, {
        currentSupplier: state.suppliers.find(
          (supplier) => supplier.id === action.payLoad
        ),
      });

    case types.RECEIVED_SUPPLIERS:
      return Object.assign({}, state, {
        currentSupplier: null,
        suppliers: action.payLoad,
      });

    default:
      return state;
  }
};

export default asyncReducer;
