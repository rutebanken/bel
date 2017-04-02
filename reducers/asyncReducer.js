import * as types from './../actions/actionTypes'

const initialState = {
  currentSupplier: null,
  events: [],
  suppliers: [],
  lineStats: {
    isLoading: true,
    data: null
  },
  files: {
    data: [],
    lastDelivered: null
  }
}

const asyncReducer = (state = initialState, action) => {

  switch (action.type) {

    case types.RECEIVED_EVENTS:
      return Object.assign({}, state, {events: action.payLoad})

    case types.CHANGED_ACTIVE_PROVIDER:
      currentSupplier = state.suppliers.find( (supplier) => supplier.id == action.payLoad )
      return Object.assign({}, state, {currentSupplier: currentSupplier})

    case types.RECEIVED_SUPPLIERS:
      let currentSupplier = (action.payLoad.length) ? action.payLoad[0] : null
      return Object.assign( {}, state, {currentSupplier: currentSupplier, suppliers: action.payLoad} )

    case types.RECEIVED_LINE_STATS:
      return Object.assign({}, state, {lineStats: { isLoading: false, data: action.payLoad} })

    case types.REQUESTED_LINE_STATS:
      return Object.assign({}, state, {lineStats: { isLoading: true, data: null} })

    case types.RECEIVED_FILES_FOR_PROVIDER:

      let lastDelivered = null

      if (action.payLoad.files && action.payLoad.files.length) {
        const files = action.payLoad.files
        lastDelivered = files.sort( (a, b) => a.updated >= b.updated)[files.length-1].updated
      }
      return Object.assign({}, state, {files: { lastDelivered: lastDelivered, data: action.payLoad.files}})

    default:
      return state
  }
}


export default asyncReducer
