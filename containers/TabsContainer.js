import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import {Tabs, Tab} from 'material-ui/Tabs'
import Events from './Events'
import Status from './Status'
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardHeader, CardText} from 'material-ui/Card'

class TabsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'status'
    }
  }

  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }

  handleChange(value) {
    this.setState({
      value: value
    })
  }

  render() {

    const { dispatch, lineStats } = this.props
    const valid = lineStats.data ? lineStats.data.valid.lineNumbers.length : 0
    const invalid = lineStats.data ? lineStats.data.invalid.lineNumbers.length :  0
    const soonInvalid = lineStats.data ? lineStats.data.soonInvalid.lineNumbers.length : 0

    const cardsDataSource = [
      {title: 'dato for siste leveranse', children: '19-11-2016', color: '#1169A7'},
      {title: 'antall linjer', children: valid + invalid + soonInvalid, color: '#083453'},
      {title: 'antall dager', children: 'N/A', color: '#000'}
    ]

    let cards = cardsDataSource.map( (cd) => {
      return (
        <Card
          style={{display: 'inline-block', width: '30.7vw', margin: '0.7vw'}}
          >
          <CardHeader
            title={cd.title}
            style={{fontWeight: 600, textAlign: 'center', textTransform: 'uppercase', width: '100%'}}
            titleStyle={{textAlign: 'center', width: '100%'}}
            textStyle={{paddingRight: 0}}
            />
          <CardText>
            <div style={{fontWeight: 600, fontSize: '4vw', textAlign: 'center', width: '100%', color: cd.color}}>
                {cd.children}
            </div>
          </CardText>
        </Card>
      )
    })

    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        tabItemContainerStyle={{background: '#2F2F2F'}}
       >
        <Tab value="status" label="Linjestatus"
          style={{marginTop: 10}}
          >
          <div style={{marginLeft: '0.5vw'}}>
            {cards}
          </div>
          { lineStats.isLoading
            ? <div style={{position: 'absolute', marginLeft: '40%', marginTop: '20%'}}>
                <CircularProgress size={120} thickness={5}/>
              </div>
            : <Status stats={lineStats} dispatch={dispatch}/>
          }
        </Tab>
        <Tab className="event-header" value="events" label="Last opp datasett"
          style={{marginTop: 10}}
          >
          <Events/>
        </Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    events: state.nabuReducer.events,
    lineStats: state.nabuReducer.lineStats
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
