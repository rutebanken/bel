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
      'Valid lines' : 'valid',
      'Soon expiring lines' : 'soonInvalid',
      'Expired lines' : 'invalid',
      'valid' : 'Valid lines',
      'soonInvalid' : 'Soon expiring lines',
      'invalid' : 'Expired lines'
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
    let clickedSegmentLabel = chart.getSegmentsAtEvent(e)[0].label

    this.setState({
      sliderEnabled: true,
      selectedSegment: this.segmentMap[clickedSegmentLabel]
    })
  }

  render() {

    let pieOptionsFull = {
      animation: false,
      showTooltips: true,
      responsive: true,
      onAnimationComplete: function() {
        //
      },
      tooltipTemplate: "<%= label %> - <%= value %>"
    }

    let pieOptionsReduced = { ...pieOptionsFull, animation: false}

    const { stats } = this.props

    if (!stats) return null

    const valid = stats.valid.lineNumbers.length
    const invalid = stats.invalid.lineNumbers.length
    const soonInvalid = stats.soonInvalid.lineNumbers.length


    const pieData = [
      {
        value: valid,
        highlight: "#4caf50",
        color: "#449d48",
        label: "Valid lines",
      },
      {
        value: soonInvalid,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Soon expiring lines",
      },
      {
        value: invalid,
        color: "#b20000",
        highlight: "#cc0000",
        label: "Expired lines",
      }
    ]

    const { sliderEnabled, selectedSegment } = this.state

    return (
      <div>
        <Card
          expanded={true}
          >
          <CardHeader
            title='Status'
            subtitle='Lines validation'
            avatar={<Error style={{verticalAlign: 'middle', height: 44, width: 44}} color="#cc0000"/>}
            />
            <CardTitle
              title="Your data expired 2016-07-07 00:00:00"
              subtitle="Some useful information"
              expandable={true}
              />
            <CardText>
              <div style={{overflow: 'auto'}}>
                { sliderEnabled
                  ?
                  <div>
                    <div style={{float: 'left', minHeight: 700, width: '70%', border: '1px solid black', background: 'rgba(96, 125, 139, 0.04)'}}>
                      <div onClick={this.handleHideSlider.bind(this)} style={{float: 'right', cursor: 'pointer', marginTop: 5, marginRight: 5}}>X</div>
                        <span style={{padding: 10, fontSize: '3em'}}>{this.segmentMap[selectedSegment]}</span>
                        <div style={{maxHeight: 900, overflowY: 'scroll'}}>
                          <List>
                          { stats[selectedSegment].lineNumbers.map( (line, index) => (
                              <ListItem
                                key={'line'+index}
                                disabled
                                primaryText={line}
                                secondaryText={stats.linesMap[line].lineNames.join(' <=> ')}
                                children={<HeaderTimeline index={index} key={'HeaderTimeline'+index} effectivePeriods={stats.linesMap[line].effectivePeriods} startDate={stats.startDate} endDate={stats.endDate}/>}
                                nestedItems={
                                  [
                                    <ListItem disabled key={'line-n'+index} children={
                                        stats.linesMap[line].lines.map( (l,i) => (
                                          <Timeline key={'timelineItem'+index+'-'+i} timetables={l.timetables} startDate={stats.startDate} endDate={stats.endDate}/>
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
                    <div style={{float: 'right', marginRight: '5%'}}>
                      <PieChart ref="chartSmall"  onClick={(e) => { this.handlePieOnClick(e, "chartSmall") } } data={pieData} width="auto" height="250"  options={pieOptionsFull}/>
                    </div>
                  </div>
                  :
                  <div style={{width: '100%', textAlign: 'center'}}>
                    <PieChart ref="chartFull"  onClick={(e) => { this.handlePieOnClick(e, "chartFull") } } data={pieData} width="auto" height="80"  options={pieOptionsFull}/>
                  </div>
                }
              </div>
            </CardText>
            <CardText expandable={false}>
              <div>Heaps of important information below</div>
            </CardText>
        </Card>
      </div>
    )
  }
}

export default Status
