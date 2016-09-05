import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Modal from './../views/modal.js'
import UserActions from '../../actions/UserActions'
import AsyncActions from '../../actions/AsyncActions'
import Button from 'muicss/lib/react/button'
import Dropzone from 'react-dropzone'

class ModalFileUploadContainer extends React.Component {

  closeModal() {
    const {dispatch} = this.props
    dispatch(UserActions.dismissFileUploadDialog())
  }

  onDrop(files) {
    if (files.length) {
      const {dispatch} = this.props
      dispatch(UserActions.choseFilesToUpload(files))
    }
  }

  handleUpload() {
    const {dispatch} = this.props
    dispatch(AsyncActions.uploadFiles())
  }

  render() {

    const {isModalOpen, files} = this.props

    const closeStyle = {
      float: "right",
      marginRight: "5px"
    }

    const selectStyle = {
      height: "100%",
      minHeight: "500px",
      width: "95%",
      margin: "10px"
    }

    const inputStyle = {
      width: "95%",
      margin: "10px"
    }

    const headerSyle = {
      width: "95%",
      marginLeft: "10px",
      fontSize: "1.5em",
      position: "absolute",
      marginTop: "10px"
    }

    const dropStyle = {
      width: "95%",
      height: "150px",
      borderWidth: 1,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 2,
      marginTop: "10%",
      marginLeft: "2.5%"
    }

    const uploadBtnStyle = {
      position: "fixed",
      top: "90%",
      left: "70%"
    }

    const filesStyle = {
      width: "95%",
      marginLeft: "2.5%",
      marginTop: "5%",
      minHeight: "300px",
      maxHeight: "300px"
    }

    return (
        <Modal isOpen={isModalOpen} onClose={() => this.closeModal()}>
          <span style={headerSyle}>Upload file</span>
          <Button style={closeStyle} onClick={() => this.closeModal()}>X</Button>
          <Dropzone style={dropStyle} accept="application/zip" onDrop={(files) => this.onDrop(files)}>
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
    files: state.userReducer.filesToUpload
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
