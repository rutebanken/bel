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
      onAnimationComplete: function() {
        //
      },
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
              expandable={true}
              />
            <CardText>
              <div style={{overflow: 'auto'}}>
                { sliderEnabled
                  ?
                  <div>
                    <div style={{float: 'left', minHeight: 700, width: '70%', border: '1px solid black', background: 'rgba(96, 125, 139, 0.04)'}}>
                      <div onClick={this.handleHideSlider.bind(this)} style={{float: 'right', cursor: 'pointer', marginTop: 5, marginRight: 5}}>X</div>
                        <span style={{padding: '5 10', fontSize: '3em'}}>{this.segmentMap[selectedSegment]}</span>
                        <div style={{maxHeight: 900, overflowY: 'scroll'}}>
                          <List>
                          { stats.data[selectedSegment].lineNumbers.map( (line, index) => (
                              <ListItem
                                key={'line'+index}
                                disabled
                                ref={'listItem'+index}
                                style={{padding: 0, marginLeft: 0, marginTop: 0, lineHeight: 0}}
                                children={
                                  <div
                                    key={'ht-wrapper'+index}
                                    onClick={() => { this.handleToggleListItem(index) }}
                                    >
                                    <HeaderTimeline line={line}
                                      hoverText={stats.data.linesMap[line].lineNames.join(', ')}
                                      index={index} key={'HeaderTimeline'+index}
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
                                          <Timeline key={'timelineItem'+index+'-'+i} timetables={l.timetables}/>
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
        </Card>
      </div>
    )
  }
}

export default Status
