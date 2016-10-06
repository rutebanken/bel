import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Modal from '../components/modal.js'
import UserActions from '../actions/UserActions'
import AsyncActions from '../actions/AsyncActions'
import Button from 'muicss/lib/react/button'
import Dropzone from 'react-dropzone'
import { closeStyle, selectStyle, inputStyle, filesStyle, headerStyle, dropStyle, uploadBtnStyle } from '../styles/modalFileUploadContainer'

class ModalFileUploadContainer extends React.Component {

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

  handleOnDrop(files, e) {

    if (files.length) {
      this.setState({
        files: files
      })
      e.preventDefault()
      e.stopPropagation()
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

    const {isModalOpen } = this.props
    const { files } = this.state

    return (
        <Modal isOpen={isModalOpen} onClose={() => this.closeModal()}>
          <span style={headerStyle}>Upload file</span>
          <Button style={closeStyle} onClick={() => this.closeModal()}>X</Button>
          <Dropzone
              style={dropStyle}
              accept="application/zip,application/octet-stream,application/x-zip,application/x-zip-compressed"
              onDrop={(files, event) => { this.handleOnDrop(files, event) }}>
            <p style={{padding: "10%"}}>Try dropping some files here, or click to select files to upload.</p>
           </Dropzone>
           <select style={filesStyle} multiple>
            { files.map( (file, index) => { return (<option key={"file-" + index}>{file.name}</option>) } ) }
           </select>
          <Button onClick={ () => this.handleUpload() } style={uploadBtnStyle} color="primary">Upload</Button>
        </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isModalOpen: state.userReducer.isModalOpen,
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
)(ModalFileUploadContainer)
