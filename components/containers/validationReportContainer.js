import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Modal from './../views/modal.js'
import Button from 'muicss/lib/react/button'
import UserActions from '../../actions/UserActions'
import ReportView from './../views/reportView.js'

class ValidationReportContainer extends React.Component {

  closeModal() {
    const {dispatch} = this.props
    dispatch(UserActions.dismissReportsModal())
  }

  render() {

    const {isModalOpen, reportViewType} = this.props

    const closeStyle = { float: "right", marginRight: "5px" }

    const headerSyle = {
      width: "95%",
      marginLeft: "10px",
      fontSize: "1.5em",
      position: "absolute",
      marginTop: "10px",
      fontWeight: "600"
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

    return (
        <Modal minHeight="600px" minWidth="800px" isOpen={isModalOpen} onClose={() => this.closeModal()}>
          <span style={headerSyle}>Validation reports ({reportViewType})</span>
          <Button style={closeStyle} onClick={() => this.closeModal()}>X</Button>
          <ReportView status={reportViewType}/>
        </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isModalOpen: state.userReducer.isReportModalOpen,
    reportViewType: state.userReducer.reportViewType
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
)(ValidationReportContainer)
