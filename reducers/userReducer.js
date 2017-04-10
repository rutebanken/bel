import * as types from './../actions/actionTypes'

const intialState = {
  isModalOpen: false,
  isReportModalOpen: false,
  reportViewType: "ALL",
  fileUpload: {
    progress: 0,
    state: types.FILE_UPLOAD_NOT_STARTED
  }
}

const userReducer = (state = intialState, action) => {

  switch (action.type) {

    case types.DISMISSED_FILEUPLOAD_MODAL:
      return Object.assign( {}, state, { fileUpload: {
        progress: 0,
        state: types.FILE_UPLOAD_NOT_STARTED
      }, isModalOpen: false
      })

    case types.OPENED_REPORTS_MODAL:
      return Object.assign( {}, state, { reportViewType: action.payLoad, isReportModalOpen: true})

    case types.DISMISSED_REPORTS_MODAL:
      return Object.assign( {}, state, { isReportModalOpen: false })

    case types.OPENED_FILEUPLOAD_MODAL:
      return Object.assign( {}, state, { isModalOpen: true} )

    case types.UPDATED_FILE_UPLOAD_PROGRESS_BAR_STATE:
      return Object.assign( {}, state, {
       fileUpload: {
         ...state.fileUpload,
         state: action.payLoad
       }
      })

    case types.UPDATED_FILE_UPLOAD_PROGRESS_BAR:
      return Object.assign( {}, state, { fileUpload: {
        progress: action.payLoad,
        state: types.FILE_UPLOAD_UPLOADING
      }})

    default:
      return state
  }
}

export default userReducer
