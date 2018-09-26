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

const initialState = {
  currentSupplier: null,
  events: [],
  suppliers: [],
  lineStats: {
    isLoading: true,
    data: null
  },
  dataDelivery: {
    state: null,
    date: null
  },
  isFetchingEvents: false
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_EVENTS:
      return Object.assign({}, state, {
        events: action.payLoad,
        isFetchingEvents: false
      });

    case types.ERROR_EVENTS:
      return Object.assign({}, state, { isFetchingEvents: false });

    case types.CHANGED_ACTIVE_PROVIDER:
      currentSupplier = state.suppliers.find(
        supplier => supplier.id == action.payLoad
      );
      return Object.assign({}, state, { currentSupplier: currentSupplier });

    case types.RECEIVED_SUPPLIERS:
      let currentSupplier = null;
      return Object.assign({}, state, {
        currentSupplier: currentSupplier,
        suppliers: action.payLoad
      });

    case types.RECEIVED_LINE_STATS:
      return Object.assign({}, state, {
        lineStats: { isLoading: false, data: action.payLoad }
      });

    case types.REQUESTED_LINE_STATS:
      return Object.assign({}, state, {
        lineStats: { isLoading: true, data: null }
      });

    case types.RECEIVED_LATEST_DELIVERY_DATE:
      return Object.assign({}, state, {
        dataDelivery: { date: action.payLoad.date, state: action.payLoad.state }
      });

    default:
      return state;
  }
};

export default asyncReducer;
