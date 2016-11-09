import React from 'react'
import { Pie as PieChart } from 'react-chartjs'
import Chart from 'chartjs'
import UserActions from '../actions/UserActions'
import Error from 'material-ui/svg-icons/alert/error'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Timeline from '../components/Timeline'
import HeaderTimeline from '../components/HeaderTimeline'

class Status extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sliderEnabled: false,
      selectedSegment: 'valid'
    }

    this.segmentMap = {
      'Linjer i gyldig periode' : 'valid',
      'Linjer med gyldighetsperiode som snart utgår' : 'soonInvalid',
      'Linjer med manglende gyldighetsperiode' : 'invalid',
      'valid' : 'Linjer i gyldig periode',
      'soonInvalid' : 'Linjer med gyldighetsperiode som snart utgår',
      'invalid' : 'Linjer med manglende gyldighetsperiode'
    }

  }

  handleHideSlider() {
    this.setState({
      ...this.state,
      sliderEnabled: false
    })
  }

  handlePieOnClick(e, refId) {

    let chart = this.refs[refId].getChart()

    if (chart.getSegmentsAtEvent(e)[0]) {

      let clickedSegmentLabel = chart.getSegmentsAtEvent(e)[0].label
      let clickedSegmentValue = chart.getSegmentsAtEvent(e)[0].value

      this.setState({
        sliderEnabled: true,
        selectedSegment: this.segmentMap[clickedSegmentLabel],
        segmentValue: clickedSegmentValue
      })
    }
  }

  handleToggleListItem(index) {
    let ref = this.refs['listItem'+index]
    ref.setState({
      ...ref.state,
      open: !ref.state.open
    })
  }

  render() {

    let pieOptionsFull = {
      animation: false,
      showTooltips: true,
      responsive: true,
      tooltipTemplate: "<%= label %> - <%= value %>"
    }

    let pieOptionsReduced = { ...pieOptionsFull, animation: false}

    const { stats } = this.props

    const valid = stats.data.valid.lineNumbers.length
    const invalid = stats.data.invalid.lineNumbers.length
    const soonInvalid = stats.data.soonInvalid.lineNumbers.length

    const pieData = [
      {
        value: valid,
        highlight: "#4caf50",
        color: "#449d48",
        label: this.segmentMap['valid'],
      },
      {
        value: soonInvalid,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: this.segmentMap['soonInvalid'],
      },
      {
        value: invalid,
        color: "#b20000",
        highlight: "#cc0000",
        label: this.segmentMap['invalid'],
      }
    ]

    let validDateMiddleStyle = {
      fontWeight: 600,
      marginLeft: ((100-17) - stats.data.validDaysOffset) + '%',
      display: 'inline-block'
    }

    let validDateStartStyle = {
      fontWeight: 600,
      display: 'inline-block',
      marginLeft: '3%',
      float: 'left'
    }

    let validDateEndStyle = {
      fontWeight: 600,
      display: 'inline-block',
      float: 'right',
      marginRight: '5%'
    }

    const { sliderEnabled, selectedSegment, segmentValue } = this.state

    return (
      <div style={{marginLeft: '1vw'}}>
        <Card
          expanded={true}
          style={{width: '95vw'}}
          >
          <CardText
            style={{padding: '0vh 0'}}
            >
            <div style={{overflow: 'auto'}}>
              { sliderEnabled
                ?
                <div>
                  <div style={{float: 'left', minHeight: 700, width: '70%', border: '1px solid #2f2f2f', background: 'rgba(96, 125, 139, 0.04)'}}>
                    <div onClick={this.handleHideSlider.bind(this)}
                      style={{float: 'right', cursor: 'pointer', marginTop: 10, marginRight: 20}}>
                      X
                    </div>
                    <div style={{textTransform: 'uppercase', fontWeight: 600, marginLeft: 10, fontSize: '2em', display: 'block', paddingTop: 10, paddingBottom: 10}}>
                      {`${this.segmentMap[selectedSegment]} (${segmentValue})`}
                    </div>
                    <div style={{display: 'block', margin: 10, padding: 6, background: '#f2f2f2', opacity: '0.8', borderRadius: 7}}>
                      <div style={validDateStartStyle}>{stats.data.startDate}</div>
                      <div style={validDateMiddleStyle}>{stats.data.validFromDate} (120 dager)</div>
                      <div style={validDateEndStyle}>{stats.data.endDate}</div>
                    </div>
                    <div
                      style={{maxHeight: 800, minHeight: 800, overflowY: 'scroll', overflowX: 'hidden', margin: 'auto'}}
                      >
                      <List
                        style={{width: '100%'}}
                        >
                        { stats.data[selectedSegment].lineNumbers.map( (line, index) => (
                          <ListItem
                            key={'line'+index}
                            disabled
                            ref={'listItem'+index}
                            style={{padding: 0, marginLeft: 0, marginRight: 0, marginTop: 0, lineHeight: 0}}
                            children={
                              <div
                                key={'ht-wrapper'+index}
                                onClick={() => { this.handleToggleListItem(index) }}
                                >
                                <HeaderTimeline line={line}
                                  hoverText={stats.data.linesMap[line].lineNames.join(', ')}
                                  index={index} key={'HeaderTimeline'+index}
                                  validDaysOffset={stats.data.validDaysOffset}
                                  validFromDate={stats.data.validFromDate}
                                  effectivePeriods={stats.data.linesMap[line].effectivePeriods}
                                  />
                              </div>
                            }
                            nestedItems={
                              [
                                <ListItem style={{zIndex: 999}} disabled key={'line-n'+index}
                                  style={{padding: 0, marginLeft: 0}}
                                  children={
                                    stats.data.linesMap[line].lines.map( (l,i) => (
                                      <Timeline key={'timelineItem'+index+'-'+i}
                                        timetables={l.timetables}
                                        validDaysOffset={stats.data.validDaysOffset}
                                        />
                                    ))
                                  } />,
                                ]
                              }
                              >
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    </div>
                    <div style={{float: 'right', width: '25vw', marginTop: '5vh'}}>
                      <PieChart ref="chartSmall"  onClick={(e) => { this.handlePieOnClick(e, "chartSmall") } } data={pieData} width="auto" height="250"  options={pieOptionsFull}/>
                    </div>
                  </div>
                  :
                  <div style={{width: '100%', textAlign: 'center', padding: '2vh 0vw'}}>
                    <PieChart ref="chartFull"  onClick={(e) => { this.handlePieOnClick(e, "chartFull") } } data={pieData} width="auto" height="80"  options={pieOptionsFull}/>
                  </div>
                }
              </div>
            </CardText>
          </Card>
        </div>
      )
    }
  }

  export default Status
