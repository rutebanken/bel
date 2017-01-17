import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import {Tabs, Tab} from 'material-ui/Tabs'
import Events from './Events'
import LineStatsCard from './LineStatsCard'
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import moment from 'moment'
import { color } from '../styles/styles'
import PieCard from './PieCard'

import { segmentName, segmentName2Key } from '../util/dataManipulation'

class TabsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'status',
      selectedSegment: 'all',
      daysValid: 0
    }
  }

  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }

  handleChange(value) {
    this.setState({
      ...this.state,
      value: value
    })
  }

  handlePieOnClick(e, chart) {

    if (chart.getSegmentsAtEvent(e)[0]) {

      let clickedSegmentLabel = chart.getSegmentsAtEvent(e)[0].label
      let clickedSegmentValue = chart.getSegmentsAtEvent(e)[0].value

      let selected = segmentName2Key(clickedSegmentLabel)

      this.setState({
       ...this.state,
       selectedSegment: selected.segment,
       daysValid: selected.daysValid,
       segmentValue: clickedSegmentValue
      })
    }
  }

  handleShowAllClick() {
    this.setState({
      ...this.state,
      selectedSegment: 'all',
      daysValid: 0,
      segmentValue: this.props.lineStats.data.all.lineNumbers.length,
    })
  }

  color(validity) {
    switch (validity) {
      case 'INVALID':
        return color.invalid
      case 'VALID':
        return color.valid
      case 'SOON_INVALID':
      case 'EXPIRED':
      default:
        return color.soonInvalid
    }
  }

  render() {

    const { lineStats, lastDeliveredDate } = this.props
    const valid = lineStats.data ? lineStats.data.valid.lineNumbers.length : 0
    const invalid = lineStats.data ? lineStats.data.invalid.lineNumbers.length :  0
    const soonInvalid = lineStats.data ? lineStats.data.soonInvalid.lineNumbers.length : 0
    const all = lineStats.data ? lineStats.data.all.lineNumbers.length : 0
    const { selectedSegment, daysValid, segmentValue } = this.state
    const title = segmentName(selectedSegment, daysValid)

    const formattedLastDeliveredDate = [{element: lastDeliveredDate ? moment(lastDeliveredDate).format('YYYY-MM-DD') : 'N/A', color: color.font.info1}]
    const lines = [
      {element: all, color: color.font.info2},
      {element: ' / ', color: color.font.info3},
      {element: invalid, color: color.invalid}
      ]
    const minDays = lineStats.data
      ? [ { element: lineStats.data.minDays.days, color: this.color(lineStats.data.minDays.validity) } ]
      : [ { element: 0, color: '#fff'}]

    const cardsDataSource = [
      { title: 'dato for siste leveranse', children: formattedLastDeliveredDate },
      { title: 'antall linjer', children: lines },
      { title: 'antall dager', children: minDays }
    ]

    let cards = cardsDataSource.map( (cd, index) => {
      return (
        <Card
          style={{ margin: '0.7vw'}}
          key={"card-" + index}
          >
          <CardHeader
            title={cd.title}
            style={{fontWeight: 600, textAlign: 'center', textTransform: 'uppercase', width: '100%'}}
            titleStyle={{textAlign: 'center', width: '100%'}}
            textStyle={{paddingRight: 0}}
            />
          <CardText>
            <div style={{fontWeight: 600, fontSize: '4vw', textAlign: 'center', width: '100%'}}>
              {cd.children.map( (child, index) => {
                return (
                  <span key={'card-element'+index} style={{color: child.color}}>
                    {child.element}
                  </span>
                )
              })}
            </div>
          </CardText>
        </Card>
      )
    })

    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        inkBarStyle={{height: 7, bottom: 5, backgroundColor: color.tabActive}}
        tabItemContainerStyle={{background: color.background}}
       >
        <Tab value="status" label="Linjestatus"
          style={{marginTop: 10}}
          >
          { lineStats.isLoading
            ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500}}>
                <CircularProgress size={120} thickness={5}/>
              </div>
            :
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <LineStatsCard selectedSegment={selectedSegment} daysValid={daysValid} segmentValue={segmentValue} stats={lineStats} title={title}/>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <PieCard handleshowAllClick={this.handleShowAllClick.bind(this)} handlePieOnClick={this.handlePieOnClick.bind(this)} stats={lineStats.data}/>
                { cards }
              </div>
            </div>
          }
        </Tab>
        <Tab className="event-header" value="events" label="Last opp datasett" style={{marginTop: 10}}>
          <Events/>
        </Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    events: state.asyncReducer.events,
    lineStats: state.asyncReducer.lineStats,
    lastDeliveredDate: state.asyncReducer.files.lastDelivered
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsContainer)
