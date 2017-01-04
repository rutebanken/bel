import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import ModalDialog from '../components/ModalDialog'
import UserActions from '../actions/UserActions'
import AsyncActions from '../actions/AsyncActions'
import FlatButton from 'material-ui/FlatButton'
import Dropzone from 'react-dropzone'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress'
import { closeStyle, selectStyle, inputStyle, filesStyle, headerStyle, dropStyle, uploadBtnStyle } from '../styles/modalFileUploadContainer'

class FileUpload extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  closeModal() {
    const {dispatch} = this.props
    this.setState({
      files: []
    })
    dispatch(UserActions.dismissFileUploadDialog())
  }

  handleOnDrop(files, ) {
    if (files.length) {
      this.setState({
        files: files
      })
      return false
    }
  }

  handleUpload() {
    const { dispatch } = this.props
    const { files } = this.state
    if (files && files.length) {
      dispatch(AsyncActions.uploadFiles(files))
    } else {
      alert('No files to upload')
    }
  }

  render() {

    const { isModalOpen, uploadCompleted } = this.props
    const { files } = this.state

    return (
        <ModalDialog isOpen={isModalOpen} onClose={() => this.closeModal()}>
          <span style={headerStyle}>Upload file</span>
          <FlatButton style={closeStyle} label="X" onClick={() => this.closeModal()}/>
          <Dropzone
              style={dropStyle}
              accept="application/zip,application/octet-stream,application/x-zip,application/x-zip-compressed"
              onDrop={(files) => { this.handleOnDrop(files) }}>
            <p style={{padding: "10%"}}>Try dropping some files here, or click to select files to upload.</p>
           </Dropzone>
           <select style={filesStyle} multiple>
            { files.map( (file, index) => { return (<option key={"file-" + index}>{file.name}</option>) } ) }
           </select>
           <div style={{marginTop: 20, width: 300, marginLeft: 14}}>
             <LinearProgress mode="determinate" value={uploadCompleted} />
           </div>
          <RaisedButton label="Upload" primary={true} onClick={ () => this.handleUpload() } style={uploadBtnStyle}/>
        </ModalDialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let progress = state.userReducer.progressBarFileUpload*100

  return {
    isModalOpen: state.userReducer.isModalOpen,
    uploadCompleted: progress
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
)(FileUpload)
