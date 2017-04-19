import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import {Tabs, Tab} from 'material-ui/Tabs'
import Events from './Events'
import LineStatsCard from './LineStatsCard'
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import moment from 'moment'
import PieCard from './PieCard'

import { color } from 'bogu/styles'
import { segmentName, segmentName2Key } from 'bogu/utils'

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

  color = (validity) => {
    switch (validity) {
      case 'INVALID':
        return color.invalid
      case 'VALID':
        return color.valid
      case 'SOON_INVALID':
        return color.soonInvalid
      case 'EXPIRED':
        return color.expired
      default:
        return color.font.disabled
    }
  }

  renderCards = (cardsDataSource) => {
    return cardsDataSource.map( (cd, index) => {
      let header = cd.title ?
        <CardHeader
          title={cd.title}
          style={{fontWeight: 600, textAlign: 'center', textTransform: 'uppercase', width: '100%'}}
          titleStyle={{textAlign: 'center', width: '100%'}}
          textStyle={{paddingRight: 0}}
        /> : null

      return (
        <Card
          style={{margin: '0.7vh 0.7vw', padding: 0, ...cd.cardStyle}}
          key={"card-" + index}
        >
          {header}
          <CardText style={{padding: 5, justifyContent: 'space-between',  textAlign: 'center', ...cd.style}}>
            {cd.children.map( (child, index) => {
              return (
                <span key={'card-element'+index} style={{fontWeight: 600, fontSize: '3vh', color: child.color, ...child.style}}>
                  {child.element}
                </span>
              )
            })}
          </CardText>
        </Card>
      )
    })
  }

  render() {

    const { lineStats, lastDeliveredDate } = this.props
    const valid = lineStats.data ? lineStats.data.valid.lineNumbers.length : 0
    const invalid = lineStats.data ? lineStats.data.invalid.lineNumbers.length :  0
    const all = lineStats.data ? lineStats.data.all.lineNumbers.length : 0
    const { selectedSegment, daysValid, segmentValue } = this.state
    const title = segmentName(selectedSegment, daysValid)

    const formattedLastDeliveredDate = [
      {element: lastDeliveredDate ? moment(lastDeliveredDate).format('YYYY-MM-DD') : 'N/A', color: color.font.info2}
    ]

    const allLinesChild = [
      {element: all, color: color.font.info2, style: {fontSize: '6vh'}}
    ]
    const lineDetailsChildren = [
      {element: valid, color: color.valid, style: {padding: '2px 0'}},
      {element: all-valid-invalid, color: color.expired, style: {padding: '2px 0'}},
      {element: invalid, color: color.invalid, style: {padding: '2px 0'}},
    ]
    const lineChildren = this.renderCards([
      {title: 'Antall linjer', style: {padding: 0}, cardStyle: {backgroundColor: 'white', padding: 0, boxShadow: 'none'}, children: allLinesChild},
      {style: {display: 'flex', flexDirection: 'column'}, cardStyle: {boxShadow: 'none'}, children: lineDetailsChildren}
    ])
    const lines = [
      {element: lineChildren, style: {display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 0}},
    ]

    const minDays = lineStats.data
      ? [ { element: lineStats.data.minDays.days, color: this.color(lineStats.data.minDays.validity) } ]
      : [ { element: 0, color: '#fff'}]

    const cardsDataSource = [
      { title: 'dato for siste leveranse', children: formattedLastDeliveredDate },
      { children: lines, style: {padding: 0}},
      { title: 'Dager til første utgående linje', children: minDays }
    ]

    let cards = this.renderCards(cardsDataSource)

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
                <LineStatsCard selectedSegment={selectedSegment} daysValid={daysValid} segmentValue={segmentValue} stats={lineStats.data} title={title}/>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: -5}}>
                <PieCard handleshowAllClick={this.handleShowAllClick.bind(this)} handlePieOnClick={this.handlePieOnClick.bind(this)} stats={lineStats.data}/>
                { cards }
              </div>
            </div>
          }
        </Tab>
        <Tab className="event-header" value="events" label="Dataleveranser" style={{marginTop: 10}}>
          {this.state.value === 'events' && <Events/>}
        </Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = state => ({
  lineStats: state.asyncReducer.lineStats,
  lastDeliveredDate: state.asyncReducer.dataDelivery.date
})

export default connect(mapStateToProps)(TabsContainer)
