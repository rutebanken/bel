import * as types from './../actions/actionTypes'

const intialState = {
  isModalOpen: false,
  isReportModalOpen: false,
  reportViewType: "ALL"
}

const userReducer = (state = intialState, action) => {

  switch (action.type) {

    case types.DISMISSED_FILEUPLOAD_MODAL:
      return Object.assign( {}, state, {isModalOpen: false} )

    case types.OPENED_REPORTS_MODAL:
      return Object.assign( {}, state, {reportViewType: action.payLoad, isReportModalOpen: true})

    case types.DISMISSED_REPORTS_MODAL:
      return Object.assign( {}, state, {isReportModalOpen: false})

    case types.OPENED_FILEUPLOAD_MODAL:
      return Object.assign( {}, state, {isModalOpen: true} )

    default:
      return state
  }
}

export default userReducer
