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
