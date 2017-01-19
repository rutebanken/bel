/* tests on calculation logic for timeline items */
import expect from 'expect'
import {formatLineStats} from '../actions/AsyncActions'
import lineStats from './mock/lineStats'
import lineStatsNorland from './mock/lineStatsNorland'

import { validity, filterLines} from '../util/dataManipulation'

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
      "to": "2015-01-03" // 3 days => 15/100
    }

    let formattedLineStats = formatLineStats(list)
    let timelineStartPosition = formattedLineStats.linesMap[lineNumber].effectivePeriods[0].timelineStartPosition
    let timelineEndPosition = formattedLineStats.linesMap[lineNumber].effectivePeriods[0].timelineEndPosition

    expect(timelineStartPosition == 0).toBe(true)
    expect(timelineEndPosition == 15).toBe(true)

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
      "to": "2015-01-03" // 3 days => 15/100
    }

    let formattedLineStats = formatLineStats(list)
    let timelineStartPosition = formattedLineStats.linesMap[lineNumber].lines[0].timetables[0].periods[0].timelineStartPosition
    let timelineEndPosition = formattedLineStats.linesMap[lineNumber].lines[0].timetables[0].periods[0].timelineEndPosition

    expect(timelineStartPosition == 0).toBe(true)
    expect(timelineEndPosition == 15).toBe(true)

  })
})


describe('Days valid calculation', () => {
  it('Days valid calculation should include days followed by each other', () => {

    let list = { ... lineStatsNorland }
    let formattedLines = formatLineStats(list)

    expect(formattedLines.minDays.days).toBe(1)
    expect(formattedLines.minDays.validity).toBe('EXPIRED')

    let validity = { 0: 133, 14: 2, 30: 3, 60: 118, 120: 0, 127: 0}
    for (let [key, value] of Object.entries(formattedLines.validity)) {
      expect(value.lineNumbers.length).toBe(validity[value.numDaysAtLeastValid])
    }
    expect(formattedLines.invalid.lineNumbers.length).toBe(validity[0])
    expect(formattedLines.valid.lineNumbers.length).toBe(validity[127])
    expect(formattedLines.soonInvalid.lineNumbers.length).toBe(validity[120])
    expect(formattedLines.all.lineNumbers.length).toBe(Object.values(validity).reduce( (a, b) => a+b))

    let line18159 = formattedLines.linesMap['18-159']
    expect(line18159.effectivePeriods.length).toBe(2)
    expect(line18159.effectivePeriods[0].from).toBe("2016-07-01")
    expect(line18159.effectivePeriods[0].to).toBe("2017-01-31")
    expect(line18159.effectivePeriods[1].from).toBe("2017-02-01")
    expect(line18159.effectivePeriods[1].to).toBe("2017-04-27")

    expect(formattedLines.daysValid.filter(lines => lines.lineNumber === '18-159')[0].days).toBe(13 + 28 + 31 + 27)
  })

  it('Days valid calculation should not include periods with 1 day gap', () => {
    let list = { ... lineStatsNorland }
    let formattedLines = formatLineStats(list)

    let line18113 = formattedLines.linesMap['18-113']
    expect(line18113.effectivePeriods.length).toBe(2)
    expect(line18113.effectivePeriods[0].from).toBe("2016-07-01")
    expect(line18113.effectivePeriods[0].to).toBe("2017-01-30")
    expect(line18113.effectivePeriods[1].from).toBe("2017-02-01")
    expect(line18113.effectivePeriods[1].to).toBe("2017-05-03")

    expect(formattedLines.daysValid.filter(lines => lines.lineNumber === '18-113')[0].days).toBe(12)
  })
})
