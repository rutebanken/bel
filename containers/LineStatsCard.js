import React, { PropTypes } from 'react'
import { Card, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'

import { Timeline, HeaderTimeline } from 'bogu'
import { filterLines, sortLines, sortIcon } from 'bogu/utils'
import { color } from 'bogu/styles'

class LineStatsCard extends React.Component {

  static propTypes = {
    selectedSegment: PropTypes.string.isRequired,
    daysValid: PropTypes.number.isRequired,
    stats: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    handleClose: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      sorting: 0
    }
  }

  handleToggleListItem(line) {
    let isOpen = !this.state['open'+line];
    this.saveNestedState(isOpen, line)
  }

  handleToggle(item, line) {
    let isOpen = !this.state['open'+line] || item.state.open
    this.saveNestedState(isOpen, line)
  }

  saveNestedState(isOpen, line) {
    let state = this.state
    state['open'+line] = isOpen
    this.setState(state)
  }

  changeSorting() {
    let states = 5
    let sort = (this.state.sorting + 1) % states
    this.setState({sorting: sort})
  }

  sortMethod( index = 0, ascending = true) {
    return function (a, b) {
      if (a[index] === b[index]) {
        return 0
      } else if (a[index] <  b[index]) {
        return (ascending) ? -1 : 1
      } else {
        return (ascending) ? 1 : -1
      }
    }
  }

  render() {

    const { stats, selectedSegment, daysValid, title } = this.props

    let validDateMiddleStyle = {
      fontWeight: 600,
      marginLeft: ((100-17) - stats.validDaysOffset) + '%',
      display: 'inline-block'
    }

    let validDateStartStyle = {
      fontWeight: 600,
      display: 'inline-block',
      float: 'left'
    }

    let validDateEndStyle = {
      fontWeight: 600,
      display: 'inline-block',
      float: 'right',
      marginRight: '3%'
    }

    let sortIconStyle = {
      display: 'inline-block',
      float: 'left',
      cursor: 'pointer',
      width: 48,
    }

    const order = sortLines(this.state.sorting, stats, selectedSegment, daysValid)

    return (
        <Card expanded={true} style={{flex: 4, boxShadow: 'none'}}>
          <CardText
            style={{padding: '0vh 0'}}
          >
            <div>
                <Card>
                  <CardText>
                    <div style={{textTransform: 'uppercase', fontWeight: 600, marginLeft: 10, fontSize: '2em', display: 'block', paddingTop: 10, paddingBottom: 10}}>
                      {title}
                      { this.props.handleClose && <IconButton style={{float: 'right'}} onClick={() => this.props.handleClose()} touch={true}><CloseButton/></IconButton> }
                    </div>
                    <div style={{display: 'block', margin: 10, padding: 6, background: color.tableHeader, opacity: '0.8', borderRadius: 7}}>
                      <div style={sortIconStyle} onClick={this.changeSorting.bind(this)} title="Sorter linjer">{sortIcon(this.state.sorting)}</div>
                      <div style={validDateStartStyle}>{stats.startDate}</div>
                      <div style={validDateMiddleStyle}>{stats.validFromDate} (120 dager)</div>
                      <div style={validDateEndStyle}>{stats.endDate}</div>
                    </div>
                    <div
                      style={{height: 'calc(100vh - 296px)', overflowY: 'scroll', overflowX: 'hidden', margin: 'auto', width: '100%'}}
                    >
                      <List
                        style={{width: '100%', boxShadow: 'none'}}
                      >
                        { order.map( (line, index) => (
                          <ListItem
                            key={'line'+index}
                            disabled
                            style={{padding: 0, marginLeft: 0, marginRight: 0, marginTop: 0, lineHeight: 0}}
                            open={this.state['open'+line] ? this.state['open'+line] : false}
                            onNestedListToggle={ (item) => this.handleToggle(item, line) }
                            children={
                              <div
                                key={'ht-wrapper'+index}
                                onClick={() => { this.handleToggleListItem(line) }}
                              >
                                <HeaderTimeline line={line}
                                  hoverText={stats.linesMap[line].lineNames.join(', ')}
                                  index={index} key={'HeaderTimeline'+index}
                                  validDaysOffset={stats.validDaysOffset}
                                  validFromDate={stats.validFromDate}
                                  effectivePeriods={stats.linesMap[line].effectivePeriods}
                                />
                              </div>
                            }
                            nestedItems={
                              [
                                <ListItem disabled key={'line-n'+index}
                                  style={{padding: 0, marginLeft: 0}}
                                  children={
                                    stats.linesMap[line].lines.map( (l,i) => (
                                      <Timeline
                                        key={'timelineItem'+index+'-'+i}
                                        timetables={l.timetables}
                                        isLast={i === stats.linesMap[line].lines.length-1}
                                        validDaysOffset={stats.validDaysOffset}
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

export default LineStatsCard
