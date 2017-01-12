import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import {Tabs, Tab} from 'material-ui/Tabs'
import Events from './Events'
import LineStatsCard from './LineStatsCard'
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import moment from 'moment'
import { color } from '../components/styles'
import PieCard from './PieCard'

class TabsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'status',
      selectedSegment: 'all',
  }

    this.segmentMap = {
      'Linjer i gyldig periode' : 'valid',
      'Linjer med gyldighetsperiode som snart utgår' : 'soonInvalid',
      'Linjer med manglende gyldighetsperiode' : 'invalid',
      'valid' : 'Linjer i gyldig periode',
      'soonInvalid' : 'Linjer med gyldighetsperiode som snart utgår',
      'invalid' : 'Linjer med manglende gyldighetsperiode',
      'all' : 'Alle linjer',
      'Alle linjer' : 'all'
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

      this.setState({
       ...this.state,
       selectedSegment: this.segmentMap[clickedSegmentLabel],
       segmentValue: clickedSegmentValue
      })
    }
  }

  handleShowAllClick() {
    this.setState({
      ...this.state,
      selectedSegment: 'all',
      segmentValue: this.props.lineStats.data.all.lineNumbers.length,
    })
  }

  render() {

    const { lineStats, lastDeliveredDate } = this.props
    const valid = lineStats.data ? lineStats.data.valid.lineNumbers.length : 0
    const invalid = lineStats.data ? lineStats.data.invalid.lineNumbers.length :  0
    const soonInvalid = lineStats.data ? lineStats.data.soonInvalid.lineNumbers.length : 0
    const { selectedSegment, segmentValue } = this.state

    const formattedLastDeliveredDate = [{element: lastDeliveredDate ? moment(lastDeliveredDate).format('YYYY-MM-DD') : 'N/A', color: color.font.info1}]
    const lines = [
      {element: valid + invalid + soonInvalid, color: color.font.info2},
      {element: ' / ', color: color.font.info3},
      {element: invalid, color: color.fail}
      ]

    const minDays = [{element: 'N/A', color: color.font.info3}]

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
                <LineStatsCard selectedSegment={selectedSegment} segmentValue={segmentValue} stats={lineStats}/>
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
