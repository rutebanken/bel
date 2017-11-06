import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MdAccount from 'material-ui/svg-icons/action/account-circle';
import MdHelp from 'material-ui/svg-icons/action/help';
import Identity from 'material-ui/svg-icons/action/perm-identity';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import { connect } from 'react-redux';
import AsyncActions from '../actions/AsyncActions';
import roleParser from '../roles/roleParser';
import logo from '../static/logo/logo_entur.png';
import { darkColor, primaryDarker } from '../styles/themes/entur/';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleSupplierChange(id) {
    if (id > -1) {
      this.props.dispatch(AsyncActions.getProviderStatus(id));
    }
    this.handleRequestClose();
  }

  handleTouchTap = event => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  render() {
    const { activeSupplier, kc, supplierList } = this.props;
    let title = activeSupplier ? activeSupplier.name : '';
    let signOut = 'Logg ut ' + kc.tokenParsed.preferred_username;

    let userOrganisations = roleParser.getUserOrganisations(
      kc.tokenParsed,
      supplierList
    );

    return (
      <div>
        <AppBar
          title={
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{pointerEvents: 'none'}}>{title}</div>
              <img src={logo} style={{width: 40, height: 'auto'}}/>
            </div>
          }
          showMenuIconButton={true}
          style={{ background: darkColor }}
          iconElementLeft={
            <IconButton onTouchTap={this.handleTouchTap}>
              <Identity />
            </IconButton>
          }
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                leftIcon={<MdHelp color={primaryDarker}/>}
                href="https://rutebanken.atlassian.net/wiki/spaces/PUBLIC/pages/142639123/Brukerveiledning+-+Operat+rportal"
                target="_blank"
                primaryText={"Brukerveiledning"}
              />
              <MenuItem
                leftIcon={<MdAccount color={primaryDarker}/>}
                primaryText={signOut}
                onClick={() => kc.logout()}
              />
            </IconMenu>
          }
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          {this.props.supplierList
            ? <Menu>
                {userOrganisations.map((supplier, index) =>
                  <MenuItem
                    key={'supplier' + index}
                    onClick={() => {
                      this.handleSupplierChange(supplier.id);
                    }}
                    primaryText={supplier.name}
                    secondaryText={<span style={{fontSize: '0.8em'}}>{supplier.id}</span>}
                  />
                )}
              </Menu>
            : <div style={{ padding: 20 }}>Ingen forhandlere</div>}
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  supplierList: state.asyncReducer.suppliers,
  activeSupplier: state.asyncReducer.currentSupplier,
  kc: state.userReducer.kc
});

export default connect(mapStateToProps)(Header);
