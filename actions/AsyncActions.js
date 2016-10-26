import axios from 'axios'
import * as types from './actionTypes'
import moment from 'moment'
import actionNames from '../translations/en/actions'
import lineStats from '../mock/lineStats.js'
const AsyncActions = {}

AsyncActions.getProviderStatus = (id) => {

  const url = `${window.config.nabuBaseUrl}jobs/${id}`

  return function(dispatch) {
    dispatch(sendData(null,types.REQUESTED_EVENTS))
    dispatch(sendData(id, types.CHANGED_ACTIVE_PROVIDER))
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    })
    .then(function(response) {
      let providerStatus = formatProviderStatusDate(response.data)
      dispatch(AsyncActions.getLineStats(id))
      dispatch(sendData(providerStatus, types.RECEIVED_EVENTS))
    })
    .catch(function(response){
      dispatch(sendData(response.data, types.ERROR_EVENTS))
    })
  }
}

AsyncActions.getAllSuppliers = () => {

  const url = window.config.nabuBaseUrl+'providers/all'

  return function(dispatch, getState) {
    dispatch( sendData(null,types.REQUESTED_SUPPLIERS) )
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    })
    .then(function(response) {
      dispatch( sendData(response.data, types.RECEIVED_SUPPLIERS) )
      dispatch( AsyncActions.getProviderStatus(response.data[0].id))
    })
    .catch(function(response){
      dispatch( sendData(response.data, types.ERROR_SUPPLIERS) )
    })
  }
}


AsyncActions.getLineStats = (id) => {

  return function(dispatch) {

    const defaultObject = { lineNumbers: []}

    let formattedLines = {
      invalid: lineStats.validityCategories
        .filter( (category) => category.numDaysAtLeastValid < 120)[0] || defaultObject,
      valid: lineStats.validityCategories
        .filter( (category) => category.numDaysAtLeastValid >= 127)[0] || defaultObject,
      soonInvalid: lineStats.validityCategories
        .filter( (category) => (category.numDaysAtLeastValid > 120 && category.numDaysAtLeastValid < 127))[0] || defaultObject,
    }

    let linesMap = {}

    lineStats.publicLines.forEach ( (lineStat) => {
        linesMap[lineStat.lineNumber] = lineStat
    })

    formattedLines.linesMap = linesMap

    dispatch( sendData(formattedLines, types.RECEIVED_LINE_STATS) )
  }
}


AsyncActions.uploadFiles = (files) => {

  return function (dispatch, getState) {

    const state = getState()
    const id = state.nabuReducer.currentSupplier.id

    const url = `${window.config.nabuBaseUrl}files/${id}`

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
        alert("Files uploaded successfully")
    })
    .catch(function(response) {
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

    listItem.events.forEach(function (event) {
      event.date = moment(event.date).locale("nb").format("YYYY-MM-DD HH:mm:ss")
      event.actionString = actionNames[event.action]
    })

    return listItem
  })

}

export default AsyncActions
