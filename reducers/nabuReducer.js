import * as types from './../actions/actionTypes'

const intialState = {
  currentSupplier: null,
  events: [],
  eventsSort: {
    order: 0,
    property: 'id'
  },
  suppliers: []
}

const nabuReducer = (state = intialState, action) => {

  switch (action.type) {

    case types.RECEIVED_EVENTS:
      return Object.assign({}, state, {events: action.payLoad})

    case types.CHANGED_ACTIVE_PROVIDER:
      currentSupplier = state.suppliers.find( (supplier) => supplier.id == action.payLoad ) 
      return Object.assign({}, state, {currentSupplier: currentSupplier})

    case types.CHANGED_SORT_EVENTS_SORT_ORDER:
      let newOrder = 0, oldProperty = state.eventsSort.property, newProperty = action.payLoad

      if (oldProperty == newProperty) {
        newOrder = state.eventsSort.order >= 1 ? 0 : 1
      }

      return Object.assign( {}, state, {events: sortEvents(state.events, newOrder, newProperty), eventsSort: { order: newOrder, property: newProperty } } )

    case types.RECEIVED_SUPPLIERS:
      // set default supplier to first retrieved from list
      let currentSupplier = (action.payLoad.length) ? action.payLoad[0] : null
      return Object.assign( {}, state, {currentSupplier: currentSupplier, suppliers: action.payLoad} )

    default:
      return state
  }
}

const sortEvents = (events, sortOrder, sortProperty) => {

  // creates a copy of the array to avoid store-immutability requirements
  let sortedEvents = events.slice(0)

  sortedEvents.sort( (curr, prev) => {

    if (sortOrder === 0) {
      return (curr[sortProperty] > prev[sortProperty] ? -1 : 1)
    }

    if (sortOrder === 1) {
      return (curr[sortProperty] > prev[sortProperty] ? 1 : -1)
    }

  })

  return sortedEvents
}

export default nabuReducer
