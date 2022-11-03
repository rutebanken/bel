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
  suppliers: [],
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGED_ACTIVE_PROVIDER:
      return Object.assign({}, state, {
        currentSupplier: state.suppliers.find(
          (supplier) => supplier.id === action.payLoad
        ) || null,
      });

    case types.RECEIVED_SUPPLIERS:
      return Object.assign({}, state, {
        currentSupplier: null,
        suppliers: action.payLoad.sort((a, b) => a.name.localeCompare(b.name)),
      });

    default:
      return state;
  }
};

export default asyncReducer;
