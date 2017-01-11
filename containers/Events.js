import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import UserActions from '../actions/UserActions'
import FlatButton from 'material-ui/FlatButton'
import Upload from 'material-ui/svg-icons/file/file-upload'
import EventDetails from './EventDetails'

class Events extends React.Component {

  componentWillMount(){
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }

  handleUploadFile() {
    const {dispatch} = this.props
    dispatch(UserActions.openFileUploadDialog())
  }

  render() {

    const { paginationMap } = this.props

    return (
      <div>
        <div style={{padding: 20}}>
          <FlatButton
            label="Last opp datasett"
            labelPosition="before"
            primary={true}
            onClick={this.handleUploadFile.bind(this)}
            icon={<Upload/>}
            style={{float: 'right'}}
          />
        </div>
        { true
          ?
          <EventDetails paginationMap={paginationMap}/>
        :
        <div style={{padding: 40, background: '#ffffdb', marginTop: 40, fontWeight: 500}}>Ingen tidligere leveranser.</div>
      }
      </div>
  )}
}

const mapStateToProps = (state, ownProps) => {
  return {
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



const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
