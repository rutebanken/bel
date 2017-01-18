import axios from 'axios'
import * as types from './actionTypes'
import moment from 'moment'
import actionNames from '../translations/no/actions'
import { validity } from '../util/dataManipulation'

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
      dispatch(AsyncActions.getFilesForProvider(id))
      dispatch(sendData(providerStatus, types.RECEIVED_EVENTS))
    })
    .catch(function(response){
      dispatch(sendData(response.data, types.ERROR_EVENTS))
    })
  }
}

AsyncActions.getAllSuppliers = () => {

  return function(dispatch) {
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
      responseTYpe: 'json'
    })
    .then( (response) => {
      dispatch( sendData( response.data, types.RECEIVED_FILES_FOR_PROVIDER))
    })
    .catch( (response) => {
      console.error(response)
    })
  }

}

const validPeriod = (endDate, from, to) => {
  if (moment(endDate).add(1, 'days').isBetween(from, to, 'days', '[]')) {
    return to
  }
  return endDate
}

const validDays = (lines) => {
  return lines.map(line => {return {lineNumber: line.lineNumber, days: line.daysValid} })
}

const days = (startDate, endDate) => {
  return endDate ? moment(endDate).diff(startDate, 'days') : 0
}

const minDays = (lineNumber2Days) => {
  let days = Math.min(...lineNumber2Days.filter( line => line.days != 0).map( line => line.days))

  return {
    days: days,
    validity: validity(days)
  }
}

const sortValidity = (validity) => {
  let idx = 'numDaysAtLeastValid'
  return validity.sort( (a, b) =>  {
    return a[idx] < b[idx] ? -1 : 1
  })
}

export const formatLineStats = (lineStats) => {

  try {

    const defaultObject = { lineNumbers: [] }

    let formattedLines = {
      invalid: lineStats.validityCategories
        .filter( (category) => category.numDaysAtLeastValid < 120)[0] || defaultObject,
      valid: lineStats.validityCategories
        .filter( (category) => category.numDaysAtLeastValid >= 127)[0] || defaultObject,
      soonInvalid: lineStats.validityCategories
        .filter( (category) => (category.numDaysAtLeastValid >= 120 && category.numDaysAtLeastValid < 127))[0] || defaultObject,
      validity: sortValidity(lineStats.validityCategories),
      all: defaultObject
    }

    formattedLines.all.lineNumbers = [].concat(... formattedLines.validity.map(lines => lines.lineNumbers ) )

    let linesMap = {}
    let linesValidity = {}

    let startDate = moment(lineStats.startDate, 'YYYY-MM-DD')
    let endDate = moment(startDate).add(lineStats.days, 'days')

    formattedLines.startDate = startDate.format('YYYY-MM-DD')
    formattedLines.days = lineStats.days
    formattedLines.endDate = endDate.format('YYYY-MM-DD')

    lineStats.publicLines.forEach ( (publicLine, idx) => {

        publicLine.effectivePeriods.forEach( (effectivePeriod) => {

          let fromDate = moment(effectivePeriod.from, 'YYYY-MM-DD')
          let fromDiff = startDate.diff(fromDate, 'days', true)

          if (fromDiff > 0) {
            // now is after start date of effective period
            effectivePeriod.timelineStartPosition = 0
          } else {
            effectivePeriod.timelineStartPosition = ( Math.abs(fromDiff) / formattedLines.days ) * 100
          }

          let timelineEndPosition = 100

          let toDate = moment(effectivePeriod.to, 'YYYY-MM-DD')
          let toDiff = moment(formattedLines.endDate, 'YYYY-MM-DD').diff(toDate, 'days', true)

          if (toDiff > 0) {
            timelineEndPosition = 100 - (toDiff / (formattedLines.days/100))
          }

          effectivePeriod.timelineEndPosition = timelineEndPosition

          let daysForward = (effectivePeriod.timelineEndPosition / 100) * formattedLines.days
          effectivePeriod.validationLevel = validity(daysForward)

          publicLine.daysValid = validPeriod(publicLine.daysValid || startDate, fromDate, toDate)
        })
        publicLine.daysValid = days(startDate, publicLine.daysValid)

        publicLine.lines.forEach( (line) => {

          line.timetables.forEach( (timetable) => {
            timetable.periods.forEach( (period) => {

              let fromDiff = startDate.diff(moment(period.from, 'YYYY-MM-DD'), 'days', true)

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
    formattedLines.validFromDate = moment(startDate).add(120, 'days').format('YYYY-MM-DD')
    formattedLines.daysValid = validDays(lineStats.publicLines)
    formattedLines.minDays = minDays(formattedLines.daysValid)

    return formattedLines

  } catch (e) {
    console.error("error in getLineStats", e)
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
