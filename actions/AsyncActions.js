import axios from 'axios'
import * as types from './actionTypes'
import moment from 'moment'
import actionNames from '../translations/no/actions'
import roleParser from '../roles/roleParser'

import { formatLineStats } from 'bogu/utils'

const AsyncActions = {}

const getConfig = () => {

  let config = {}
  let token = localStorage.getItem('BEL::jwt')

  config.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token
  }

  return config
}

AsyncActions.getProviderStatus = (id) => {

  const url = `${window.config.nabuBaseUrl}jobs/${id}`

  return function(dispatch) {
    dispatch(sendData(null,types.REQUESTED_EVENTS))
    dispatch(sendData(id, types.CHANGED_ACTIVE_PROVIDER))
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json',
      ...getConfig()
    })
    .then(function(response) {
      let providerStatus = formatProviderStatusDate(response.data)
      dispatch(AsyncActions.getLineStats(id))
      dispatch(AsyncActions.getFilesForProvider(id))
      dispatch(sendData(providerStatus, types.RECEIVED_EVENTS))
    })
    .catch(function(response){
      dispatch(sendData(response.data, types.ERROR_EVENTS))
    })
  }
}

AsyncActions.getProviderEvents = (id) => {

  const url = `${window.config.nabuBaseUrl}jobs/${id}`

  return function(dispatch) {
    dispatch(sendData(null,types.REQUESTED_EVENTS))
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json',
      ...getConfig()
    })
    .then(function(response) {
      let providerStatus = formatProviderStatusDate(response.data)
      dispatch(sendData(providerStatus, types.RECEIVED_EVENTS))
    })
    .catch(function(response){
      dispatch(sendData(response.data, types.ERROR_EVENTS))
    })
  }
}

AsyncActions.getAllSuppliers = () => {

  return function(dispatch, getState) {
    dispatch( sendData(null,types.REQUESTED_SUPPLIERS) )
    const url = window.config.nabuBaseUrl+'providers/'

    const state = getState()

    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json',
      ...getConfig()
    })
    .then(function(response) {
      dispatch( sendData(response.data, types.RECEIVED_SUPPLIERS) )
      const userOrganisations = roleParser.getUserOrganisations(state.userReducer.kc.tokenParsed, response.data)

      if (userOrganisations.length) {
        dispatch( AsyncActions.getProviderStatus(userOrganisations[0].id))
      } else {
        dispatch( sendData(null, types.USER_NO_ORGANISATIONS))
      }
    })
    .catch(function(response){
      dispatch( sendData(response.data, types.ERROR_SUPPLIERS) )
    })
  }
}

AsyncActions.getLineStats = (id) => {
  return function(dispatch) {

    dispatch( sendData(null, types.REQUESTED_LINE_STATS) )
    return axios({
      url: `${window.config.mardukBaseUrl}admin/services/chouette/${id}/lineStats`,
      timeout: 10000,
      method: 'get',
      responseType: 'json',
      ...getConfig()
    })
    .then( (response) => {
      let formattedLines = formatLineStats(response.data)
      dispatch( sendData(formattedLines, types.RECEIVED_LINE_STATS))
    })
    .catch( (response) => {
      console.error(response)
    })
  }


}

AsyncActions.getFilesForProvider = (providerId) => {

  return function(dispatch) {

    dispatch( sendData(null, types.REQUESTED_FILES_FOR_PROVIDER) )

    return axios({
      url: `${window.config.mardukBaseUrl}admin/services/chouette/${providerId}/files`,
      timeout: 1000,
      method: 'get',
      responseTYpe: 'json',
      ...getConfig()
    })
    .then( (response) => {
      dispatch( sendData( response.data, types.RECEIVED_FILES_FOR_PROVIDER))
    })
    .catch( (response) => {
      console.error(response)
    })
  }

}

AsyncActions.uploadFiles = (files) => {

  return function (dispatch, getState) {

    const state = getState()
    const id = state.asyncReducer.currentSupplier.id

    dispatch( sendData(0, types.UPDATED_FILE_UPLOAD_PROGRESS_BAR))

    const url = `${window.config.nabuBaseUrl}files/${id}`

    var data = new FormData()

    files.forEach( (file) => {
      data.append("files", file)
    })

    var config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = (progressEvent.loaded / progressEvent.total)*100
        dispatch( sendData(percentCompleted, types.UPDATED_FILE_UPLOAD_PROGRESS_BAR))
      },
      ...getConfig()
    }

    return axios.post(url, data, config)
    .then(function(response) {
      dispatch( sendData(types.FILE_UPLOAD_COMPLETED, types.UPDATED_FILE_UPLOAD_PROGRESS_BAR_STATE))
    })
    .catch(function(response) {
      dispatch( sendData(types.FILE_UPLOAD_FAILED, types.UPDATED_FILE_UPLOAD_PROGRESS_BAR_STATE))
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
    listItem.started = moment(listItem.firstEvent).locale("nb").fromNow()

    listItem.events.forEach(function (event) {
      event.date = moment(event.date).locale("nb").format("YYYY-MM-DD HH:mm:ss")
      event.actionString = actionNames[event.action]
    })
    return listItem
  }).reverse()
}

export default AsyncActions
