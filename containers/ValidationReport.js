import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import ModalDialog from '../components/ModalDialog.js'
import FlatButton from 'material-ui/FlatButton'
import UserActions from '../actions/UserActions'
import Report from '../components/Report.js'

class ValidationReport extends React.Component {

  closeModal() {
    this.props.dispatch(UserActions.dismissReportsModal())
  }

  render() {

    const { isModalOpen, reportViewType } = this.props

    const closeStyle = { float: "right", marginRight: 5, marginTop: 5 }

    const headerSyle = {
      width: "95%",
      marginLeft: 10,
      fontSize: "1.5em",
      position: "absolute",
      marginTop: 10,
      fontWeight: 600
    }

    return (
        <ModalDialog minHeight="600px" minWidth="800px" isOpen={isModalOpen} onClose={() => this.closeModal()}>
          <span style={headerSyle}>Validation reports ({reportViewType})</span>
          <FlatButton label="X" style={closeStyle} onClick={() => this.closeModal()}/>
          <Report status={reportViewType}/>
        </ModalDialog>
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
)(ValidationReport)
