import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
import Identity from 'material-ui/svg-icons/action/perm-identity'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import { connect } from 'react-redux'
import AsyncActions from '../actions/AsyncActions'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleSupplierChange(id) {
    if (id > -1) {
      this.props.dispatch(AsyncActions.getProviderStatus(id))
    }
    this.handleRequestClose()
  }

  handleTouchTap = (event) => {
   event.preventDefault()

   this.setState({
     open: true,
     anchorEl: event.currentTarget
   })

  }

  handleRequestClose() {
    this.setState({
      open: false
    })
  }

  render() {
    // reactintl these
    const { activeSupplier } = this.props
    let help = "Hjelp", title = activeSupplier ? activeSupplier.name : '', signOut = 'Logg ut'

    return (

        <div>
          <AppBar
            title={title}
            showMenuIconButton={true}
            style={{background: "#2F2F2F", color: "#fff"}}
            iconElementLeft={
              <IconButton
                onTouchTap={this.handleTouchTap}
                >
                <Identity/>
              </IconButton>
            }

            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText={help} />
                <MenuItem primaryText={signOut} />
              </IconMenu>
            }
          />
          <Popover
           open={this.state.open}
           anchorEl={this.state.anchorEl}
           anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
           targetOrigin={{horizontal: 'left', vertical: 'top'}}
           onRequestClose={this.handleRequestClose.bind(this)}
          >
            { this.props.supplierList
              ? <Menu>
                { this.props.supplierList.map( (supplier, index) => (
                  <MenuItem
                    key={'supplier'+index}
                    onClick={() => { this.handleSupplierChange(supplier.id) }}
                    primaryText={supplier.name}
                    secondaryText={supplier.id}
                  />
                ))
                }
              </Menu>
              : <div style={{padding: 20}}>No providers found</div>
            }
          </Popover>
        </div>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    supplierList: state.nabuReducer.suppliers,
    activeSupplier: state.nabuReducer.currentSupplier
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
