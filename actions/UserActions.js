import axios from 'axios'
import * as types from './actionTypes'

const UserActions = {}

UserActions.openFileUploadDialog = () => {
  return {
    type: types.OPENED_FILEUPLOAD_MODAL
  }
}

UserActions.dismissFileUploadDialog = () => {
  return {
    type: types.DISMISSED_FILEUPLOAD_MODAL
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

export default UserActions
