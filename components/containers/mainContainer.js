import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from './../../config/readConfig'

import TabsContainer from './TabsContainer'
import AsyncActions from './../../actions/AsyncActions'

class MainContainer extends React.Component {
  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
      const {dispatch} = this.props
      dispatch(AsyncActions.getAllSuppliers())
    }).bind(this))
  }

  handleSupplierchange(event) {
    const id = event.target.value
    if (id > -1) {
      const {dispatch} = this.props
      dispatch(AsyncActions.getProviderStatus(id))
    }

  }

  render() {

    const {events, suppliers, supplier} = this.props

    return (
      <div>
        <span style={ {marginRight: "5px"}}>Current supplier (DEV only)</span>
        <select onChange={ (event) => this.handleSupplierchange(event)}>
          <option key="supplier-default" value="-1">Select a provider</option>
          { suppliers.map( (supplier, index) => ( <option key={"supplier-" + index} value={supplier.id}> {supplier.id} {supplier.name}</option> ) )}
        </select>
        <div className="tabsContainerWrapper">
          { supplier ? <h2>{supplier.name}</h2> : null }
          <TabsContainer/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    suppliers: state.nabuReducer.suppliers,
    supplier: state.nabuReducer.currentSupplier
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
)(MainContainer)
