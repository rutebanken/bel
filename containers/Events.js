import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import UserActions from '../actions/UserActions'
import FlatButton from 'material-ui/FlatButton'
import Upload from 'material-ui/svg-icons/file/file-upload'
import EventDetails from './EventDetails'
import { color } from 'bogu/styles'
import AsyncActions from '../actions/AsyncActions'

class Events extends React.Component {

  componentWillMount(){
    cfgreader.readConfig( (function(config) {
      window.config = config
      this.startPolling()
    }).bind(this))
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  startPolling = () => {
    this.poll()
    setTimeout(() => {
      this.intervalId = setInterval(this.poll, 5000)
    }, 1000)
  }

  poll = () => {
    if (this.props.activeSupplier) {
      this.props.dispatch(AsyncActions.getProviderEvents(this.props.activeSupplier.id))
    }
  }

  handleUploadFile() {
    const {dispatch} = this.props
    dispatch(UserActions.openFileUploadDialog())
  }

  render() {

    const { paginationMap } = this.props

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: 0}}>
          <FlatButton
            label="Last opp nytt datasett"
            labelPosition="before"
            primary={true}
            onClick={this.handleUploadFile.bind(this)}
            icon={<Upload/>}
          />
        </div>
        { (paginationMap && paginationMap.length)
          ?
          <EventDetails paginationMap={paginationMap}/>
        :
        <div style={{padding: 40, background: color.tableInfo, marginTop: 40, fontWeight: 500}}>Ingen tidligere leveranser.</div>
      }
      </div>
  )}
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeSupplier: state.asyncReducer.currentSupplier,
    paginationMap: getPaginationMap(state.asyncReducer.events ? state.asyncReducer.events.slice() : [] )
  }
}

const getPaginationMap = (statusList = []) => {
  let paginationMap = []

  for (let i = 0, j = statusList.length; i < j; i+=10) {
    paginationMap.push(statusList.slice(i,i+10))
  }
  return paginationMap
}

export default connect(mapStateToProps)(Events)
