import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MdAccount from 'material-ui/svg-icons/action/account-circle'
import Identity from 'material-ui/svg-icons/action/perm-identity'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import { connect } from 'react-redux'
import AsyncActions from '../actions/AsyncActions'
import { color } from 'bogu/styles'

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
    const { activeSupplier, kc } = this.props
    let title = activeSupplier ? activeSupplier.name : ''
    let signOut = 'Logg ut ' + kc.tokenParsed.preferred_username

    return (

        <div>
          <AppBar
            title={title}
            showMenuIconButton={true}
            style={{background: color.background, color: color.font.inverse}}
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
                <MenuItem
                  leftIcon={<MdAccount/>}
                  primaryText={signOut}
                  onClick={() => kc.logout()}
                />
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

const mapStateToProps = state => {
  return {
    supplierList: state.asyncReducer.suppliers,
    activeSupplier: state.asyncReducer.currentSupplier,
    kc: state.userReducer.kc
  }
}

export default connect(mapStateToProps)(Header)
