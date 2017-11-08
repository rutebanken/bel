import * as types from './actionTypes';

const UserActions = {};

UserActions.openFileUploadDialog = () => dispatch =>
  dispatch({ type: types.OPENED_FILEUPLOAD_MODAL });

UserActions.dismissFileUploadDialog = () => dispatch =>
  dispatch({ type: types.DISMISSED_FILEUPLOAD_MODAL });

UserActions.dismissSnackbar = () => dispatch => {
  dispatch({ type: types.DISMISSED_SNACKBAR });
};

export default UserActions;
