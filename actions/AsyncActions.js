import axios from 'axios'
import * as types from './actionTypes'
import moment from 'moment'
import actionNames from '../translations/en/actions'
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

  return function(dispatch, getState) {
    dispatch( sendData(null,types.REQUESTED_SUPPLIERS) )
    const url = window.config.nabuBaseUrl+'providers/all'

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

    dispatch( sendData(null, types.REQUESTED_LINE_STATS) )
    return axios({
      url: `${window.config.mardukBaseUrl}admin/services/chouette/${id}/lineStats`,
      timeout: 10000,
      method: 'get',
      responseType: 'json'
    })
    .then( (response) => {
      let formattedLines = formatLineStats(response.data)
      dispatch( sendData(formattedLines, types.RECEIVED_LINE_STATS))
    })
    .catch( (response) => {
      console.error("error", response)
    })
  }


}


export const formatLineStats = (lineStats) => {

  try {

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

    let startDate = moment(lineStats.startDate, 'YYYY-MM-DD')
    formattedLines.startDate = startDate.format('YYYY-MM-DD')
    formattedLines.days = lineStats.days
    formattedLines.endDate = startDate.add(formattedLines.days, 'days').format('YYYY-MM-DD')

    lineStats.publicLines.forEach ( (publicLine) => {

        publicLine.effectivePeriods.forEach( (effectivePeriod) => {

          let fromDiff = moment(lineStats.startDate, 'YYYY-MM-DD').diff(moment(effectivePeriod.from, 'YYYY-MM-DD'), 'days', true)

          if (fromDiff > 0) {
            // now is after start date of effective period
            effectivePeriod.timelineStartPosition = 0
          } else {
            effectivePeriod.timelineStartPosition = ( Math.abs(fromDiff) / formattedLines.days ) * 100
          }

          let timelineEndPosition = 100

          let toDiff = moment(formattedLines.endDate, 'YYYY-MM-DD').diff(moment(effectivePeriod.to, 'YYYY-MM-DD'), 'days', true)

          if (toDiff > 0) {
            timelineEndPosition = 100 - (toDiff / (formattedLines.days/100))
          }

          effectivePeriod.timelineEndPosition = timelineEndPosition

          effectivePeriod.validationLevel = 'INVALID'
          let daysForward = (effectivePeriod.timelineEndPosition / 100) * formattedLines.days

          if (daysForward >= 120 && daysForward < 127) {
            effectivePeriod.validationLevel = 'SOON_INVALID'
          } else if (daysForward > 127) {
            effectivePeriod.validationLevel = 'VALID'
          }

        })

        publicLine.lines.forEach( (line) => {

          line.timetables.forEach( (timetable) => {
            timetable.periods.forEach( (period) => {

              let fromDiff = moment(lineStats.startDate, 'YYYY-MM-DD').diff(moment(period.from, 'YYYY-MM-DD'), 'days', true)

              if (fromDiff < 0) {
                period.timelineStartPosition = ( Math.abs(fromDiff) / formattedLines.days ) * 100
              } else {
                period.timelineStartPosition = 0
              }

              let timelineEndPosition = 100

              let toDiff = moment(formattedLines.endDate, 'YYYY-MM-DD').diff(moment(period.to, 'YYYY-MM-DD'), 'days', true)

              if (toDiff > 0) {
                timelineEndPosition = 100 - (toDiff / (formattedLines.days/100))
              }

              period.timelineEndPosition = timelineEndPosition
            })
          })
        })

        linesMap[publicLine.lineNumber] = publicLine
    })

    formattedLines.linesMap = linesMap
    formattedLines.validDaysOffset = 33
    formattedLines.validFromDate = moment(lineStats.startDate, 'YYYY-MM-DD').add(120, 'days').format('YYYY-MM-DD')

    return formattedLines

  } catch (e) {
    console.error("error in getLineStats", e)
  }
}


AsyncActions.uploadFiles = (files) => {

  return function (dispatch, getState) {

    const state = getState()
    const id = state.nabuReducer.currentSupplier.id

    dispatch( sendData(0, types.UPDATED_FILE_UPLOAD_PROGRESS_BAR))

    const url = `${window.config.nabuBaseUrl}files/${id}`

    var data = new FormData()

    files.forEach( (file) => {
      data.append("files", file)
    })

    var config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = progressEvent.loaded / progressEvent.total
        dispatch( sendData(percentCompleted, types.UPDATED_FILE_UPLOAD_PROGRESS_BAR))
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
