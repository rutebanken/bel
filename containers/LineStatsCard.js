import React, { PropTypes } from 'react'
import { Card, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import Timeline from '../components/Timeline'
import HeaderTimeline from '../components/HeaderTimeline'
import { color } from '../components/styles'

class StatusCard extends React.Component {

  static propTypes = {
    selectedSegment: PropTypes.string.isRequired,
    stats: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
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

  handleToggleListItem(index) {
    let ref = this.refs['listItem'+index]
    ref.setState({
      ...ref.state,
      open: !ref.state.open
    })
  }

  render() {

    const { stats } = this.props

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

    const { selectedSegment } = this.props
    const segmentValue = stats.data[selectedSegment].lineNumbers.length

    return (
        <Card expanded={true} style={{flex: 4}}>
          <CardText
            style={{padding: '0vh 0'}}
          >
            <div style={{overflow: 'auto'}}>
                <Card>
                  <CardText style={{minHeight: 700}}>
                    <div style={{textTransform: 'uppercase', fontWeight: 600, marginLeft: 10, fontSize: '2em', display: 'block', paddingTop: 10, paddingBottom: 10}}>
                      {`${this.segmentMap[selectedSegment]} (${segmentValue})`}
                    </div>
                    <div style={{display: 'block', margin: 5, padding: 6, background: color.tableHeader, opacity: '0.8', borderRadius: 7}}>
                      <div style={validDateStartStyle}>{stats.data.startDate}</div>
                      <div style={validDateMiddleStyle}>{stats.data.validFromDate} (120 dager)</div>
                      <div style={validDateEndStyle}>{stats.data.endDate}</div>
                    </div>
                    <div
                      style={{maxHeight: 800, minHeight: 800, overflowY: 'scroll', overflowX: 'hidden', margin: 'auto', width: '100%'}}
                    >
                      <List
                        style={{width: '100%', boxShadow: 'none'}}
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
                                <ListItem disabled key={'line-n'+index}
                                  style={{padding: 0, marginLeft: 0}}
                                  children={
                                    stats.data.linesMap[line].lines.map( (l,i) => (
                                      <Timeline
                                        key={'timelineItem'+index+'-'+i}
                                        timetables={l.timetables}
                                        isLast={i === stats.data.linesMap[line].lines.length-1}
                                        validDaysOffset={stats.data.validDaysOffset}
                                      />
                                    ))
                                  } />
                              ]
                            }
                          >
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  </CardText>
                </Card>
            </div>
          </CardText>
        </Card>
    )
  }
}

export default StatusCard
