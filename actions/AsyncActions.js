import axios from 'axios'
import * as types from './actionTypes'
import moment from 'moment'

const AsyncActions = {}

AsyncActions.getProviderStatus = (id) => {

  const url = `${window.config.nabuBaseUrl}jersey/jobs/${id}`

  return function(dispatch) {
    dispatch(sendData(null,types.REQUESTED_EVENTS))
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    })
    .then(function(response) {
      let providerStatus = formatProviderStatusDate(response.data)
      dispatch(sendData(response.data, types.RECEIVED_EVENTS))
    })
    .catch(function(response){
      dispatch(sendData(response.data, types.ERROR_EVENTS))
    })
  }
}

AsyncActions.getAllSuppliers = () => {

  const url = window.config.nabuBaseUrl+'jersey/providers/all'

  return function(dispatch) {
    dispatch( sendData(null,types.REQUESTED_SUPPLIERS) )
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    })
    .then(function(response) {
      dispatch( sendData(response.data, types.RECEIVED_SUPPLIERS) )
    })
    .catch(function(response){
      dispatch( sendData(response.data, types.ERROR_SUPPLIERS) )
    })
  }
}


AsyncActions.uploadFiles = () => {

  return function (dispatch, getState) {

    const state = getState()
    const id = state.nabuReducer.providerId

    const url = `${window.config.nabuBaseUrl}jersey/files/${id}`
    const files = state.userReducer.filesToUpload

    var data = new FormData()
    // TODO : service currently only supports one file
    data.append("file", files[0])

    var config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = progressEvent.loaded / progressEvent.total
        // TODO : add progress bar
        console.log("percentage", percentCompleted)
      }
    }

    return axios.post(url, data, config)
    .then(function(response) {
        console.log("success", response)
        alert("Files uploaded successfully")
    }) // then
    .catch(function(response) {
      console.log("error", response)
      alert("Failed to upload file(s)")

    })

  }
}

function sendData(payLoad, type) {
  return {
    payLoad: payLoad,
    type: type
  }
}

const formatProviderStatusDate = (list) => {

  return list.map( (listItem) => {

    listItem.firstEvent = moment(listItem.firstEvent).locale("nb").format("YYYY-MM-DD HH:mm:ss")
    listItem.lastEvent = moment(listItem.lastEvent).locale("nb").format("YYYY-MM-DD HH:mm:ss")
    listItem.duration = moment(listItem.durationMillis).locale("nb").utc().format("HH:mm:ss")

    return listItem
  })

}

export default AsyncActions
