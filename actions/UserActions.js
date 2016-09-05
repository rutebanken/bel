import axios from 'axios'
import * as types from './actionTypes'

const UserActions = {}

UserActions.setActiveEventsPage = (id) => {
  return {
    type: types.PICKED_EVENTS_PAGE,
    payLoad: id
  }
}

UserActions.toggleEventsExpanable = (index) => {
  return {
    type: types.TOGGLE_EVENTS_EXPANDABLE,
    payLoad: index
  }
}

UserActions.sortEventsByField = (field) => {
  return {
    type: types.CHANGED_SORT_EVENTS_SORT_ORDER,
    payLoad: field
  }
}

UserActions.openFileUploadDialog = () => {
  return {
    type: types.OPENED_FILEUPLOAD_MODAL
  }
}

UserActions.dismissFileUploadDialog = () => {

  return function(dispatch) {

    dispatch(UserActions.choseFilesToUpload([]))

    function dismiss() {
      return {
        type: types.DISMISSED_FILEUPLOAD_MODAL
      }
    }

    dispatch(dismiss())
  }
}

UserActions.dismissReportsModal = () => {
  return {
    type: types.DISMISSED_REPORTS_MODAL
  }
}

UserActions.openReportsModal = (reportViewType) => {
  return {
    type: types.OPENED_REPORTS_MODAL,
    payLoad: reportViewType
  }
}

UserActions.choseFilesToUpload = (files) => {
  return {
    type: types.CHOSE_FILES_TO_UPLOAD,
    payLoad: files
  }
}


export default UserActions
