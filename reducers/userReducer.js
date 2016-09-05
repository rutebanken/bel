import * as types from './../actions/actionTypes'

const intialState = {
  eventPageIndex: 0,
  expandedEvents: [],
  isModalOpen: false,
  filesToUpload: [],
  isReportModalOpen: false,
  reportViewType: "ALL"
}

const userReducer = (state = intialState, action) => {

  switch (action.type) {

    case types.PICKED_EVENTS_PAGE:
      return {...state, eventPageIndex: action.payLoad}

    case types.TOGGLE_EVENTS_EXPANDABLE:
      return {...state, expandedEvents: toggleExpandedEvents(action.payLoad, state.expandedEvents) }

    case types.DISMISSED_FILEUPLOAD_MODAL:
      return Object.assign( {}, state, {isModalOpen: false} )

    case types.OPENED_REPORTS_MODAL:
      return Object.assign( {}, state, {reportViewType: action.payLoad, isReportModalOpen: true})

    case types.DISMISSED_REPORTS_MODAL:
      return Object.assign( {}, state, {isReportModalOpen: false})

    case types.OPENED_FILEUPLOAD_MODAL:
      return Object.assign( {}, state, {isModalOpen: true} )

    case types.CHOSE_FILES_TO_UPLOAD:
      return Object.assign ( {}, state, {filesToUpload: action.payLoad})

    default:
      return state
  }
}

const toggleExpandedEvents = (index, expanded) => {

  if (expanded.indexOf(index) === -1) {
    return expanded.concat(index)
  }

  return expanded.filter( (item) => item != index)
}


export default userReducer
