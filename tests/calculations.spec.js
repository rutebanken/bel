/* tests on calculation logic for timeline items */
import expect from 'expect'
import {formatLineStats} from '../actions/AsyncActions'
import lineStats from './mock/lineStats'

describe('Test calculations for effectivePeriods on timeline', () => {

  it('Effective period should not be in the boundary of the timeline', () => {

    let list = { ...lineStats }
    let lineNumber = list.publicLines[0].lineNumber
    list.publicLines[0].effectivePeriods[0] = {
      "from": "2015-01-01",
      "to": "2019-02-02"
    }

    let formattedLineStats = formatLineStats(list)
    let timelineStartPosition = formattedLineStats.linesMap[lineNumber].effectivePeriods[0].timelineStartPosition
    let timelineEndPosition = formattedLineStats.linesMap[lineNumber].effectivePeriods[0].timelineEndPosition

    expect(timelineStartPosition >= 0).toBe(true)
    expect(timelineEndPosition <= 100).toBe(true)

  })

  it('Effective period should start from the middle of the timeline if effective period starts at total amount of days /2', () => {

    let list = { ...lineStats }
    list.days = 10
    list.startDate = "2015-01-01"
    let lineNumber = list.publicLines[0].lineNumber
    list.publicLines[0].effectivePeriods[0] = {
      "from": "2015-01-06", // list.days/2 after startDate
      "to": "2019-02-02"
    }

    let formattedLineStats = formatLineStats(list)
    let timelineStartPosition = formattedLineStats.linesMap[lineNumber].effectivePeriods[0].timelineStartPosition
    let timelineEndPosition = formattedLineStats.linesMap[lineNumber].effectivePeriods[0].timelineEndPosition

    expect(timelineStartPosition == 50).toBe(true)
    expect(timelineEndPosition == 100).toBe(true)

  })

  it('Effective period should stop correctly at the timeline', () => {

    let list = { ...lineStats }
    list.days = 20
    list.startDate = "2015-01-01"
    let lineNumber = list.publicLines[0].lineNumber
    list.publicLines[0].effectivePeriods[0] = {
      "from": "2014-01-03",
      "to": "2015-01-03" // 2 days => 10/100
    }

    let formattedLineStats = formatLineStats(list)
    let timelineStartPosition = formattedLineStats.linesMap[lineNumber].effectivePeriods[0].timelineStartPosition
    let timelineEndPosition = formattedLineStats.linesMap[lineNumber].effectivePeriods[0].timelineEndPosition

    expect(timelineStartPosition == 0).toBe(true)
    expect(timelineEndPosition == 10).toBe(true)

  })

})

describe('Test calculations for timeschedules on timeline', () => {

  it('time schedule should not be in the boundary of the timeline', () => {

    let list = { ...lineStats }
    let lineNumber = list.publicLines[0].lineNumber

    list.startDate = "2015-01-01"

    list.publicLines[0].lines[0].timetables[0].periods[0] = {
      "from": "2015-01-03",
      "to": "2019-02-02"
    }

    let formattedLineStats = formatLineStats(list)
    let timelineStartPosition = formattedLineStats.linesMap[lineNumber].lines[0].timetables[0].periods[0].timelineStartPosition
    let timelineEndPosition = formattedLineStats.linesMap[lineNumber].lines[0].timetables[0].periods[0].timelineEndPosition

    expect(timelineStartPosition >= 0 && timelineStartPosition <= 100).toBe(true)
    expect(timelineEndPosition <= 100 && timelineEndPosition >= 0).toBe(true)

  })

  it('Effective period should start from the middle of the timeline if effective period starts at total amount of days /2', () => {

    let list = { ...lineStats }
    list.days = 20
    let lineNumber = list.publicLines[0].lineNumber

    list.startDate = "2015-01-01"

    list.publicLines[0].lines[0].timetables[0].periods[0] = {
      "from": "2014-01-03",
      "to": "2015-01-03" // 2 days => 10/100
    }

    let formattedLineStats = formatLineStats(list)
    let timelineStartPosition = formattedLineStats.linesMap[lineNumber].lines[0].timetables[0].periods[0].timelineStartPosition
    let timelineEndPosition = formattedLineStats.linesMap[lineNumber].lines[0].timetables[0].periods[0].timelineEndPosition

    expect(timelineStartPosition == 0).toBe(true)
    expect(timelineEndPosition == 10).toBe(true)

  })

})
