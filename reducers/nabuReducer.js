import * as types from './../actions/actionTypes'

const intialState = {
  currentSupplier: null,
  events: [],
  suppliers: []
}

const nabuReducer = (state = intialState, action) => {

  switch (action.type) {

    case types.RECEIVED_EVENTS:
      return Object.assign({}, state, {events: action.payLoad})

    case types.CHANGED_ACTIVE_PROVIDER:
      currentSupplier = state.suppliers.find( (supplier) => supplier.id == action.payLoad )
      return Object.assign({}, state, {currentSupplier: currentSupplier})

    case types.RECEIVED_SUPPLIERS:
      // set default supplier to first retrieved from list
      let currentSupplier = (action.payLoad.length) ? action.payLoad[0] : null
      return Object.assign( {}, state, {currentSupplier: currentSupplier, suppliers: action.payLoad} )

    default:
      return state
  }
}


export default nabuReducer
