/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

import React from "react";
import AppBar from "@mui/material/AppBar";
import { connect } from "react-redux";
import AsyncActions from "../actions/AsyncActions";
import logo from "../static/logo/logo_entur.png";
import {
  darkColor,
  white,
  primaryDarker,
  primary,
} from "../styles/themes/entur/";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  PermIdentity,
  MoreVert,
  Help,
  AccountCircle,
} from "@mui/icons-material";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorElMenu: null,
    };
  }

  handleSupplierChange(id) {
    if (id > -1) {
      this.props.dispatch(AsyncActions.getProviderStatus(id));
    }
    this.handleRequestClose();
  }

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { activeSupplier, auth, supplierList } = this.props;
    let title = activeSupplier ? activeSupplier.name : "";
    let signOut = "Logg ut " + auth?.user?.name;

    let userOrganisations = supplierList;

    return (
      <AppBar style={{ background: darkColor }}>
        <Toolbar>
          <IconButton
            onClick={(e) => this.handleTouchTap(e)}
            sx={{ marginLeft: "-16px", marginRight: "8px" }}
          >
            <PermIdentity sx={{ color: white }} />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              color: white,
              fontSize: "24px",
              fontWeight: 400,
            }}
          >
            {title}
          </Typography>
          <img src={logo} style={{ width: 40, height: "auto" }} />
          <IconButton
            onClick={(e) => this.setState({ anchorElMenu: e.currentTarget })}
          >
            <MoreVert sx={{ color: white }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={this.state.anchorElMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(this.state.anchorElMenu)}
            onClose={() => this.setState({ anchorElMenu: null })}
          >
            <MenuItem
              component="a"
              href="https://enturas.atlassian.net/wiki/spaces/PUBLIC/pages/637370715/Brukerveiledning+for+operat+rportal"
              target="_blank"
            >
              <ListItemIcon>
                <Help color="primary" />
              </ListItemIcon>
              <ListItemText>Brukerveiledning</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => auth.logout({ returnTo: window.location.origin })}
            >
              <ListItemIcon>
                <AccountCircle color="primary" />
              </ListItemIcon>
              <ListItemText>{signOut}</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
        {this.props.supplierList ? (
          <Menu
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            targetOrigin={{ horizontal: "left", vertical: "top" }}
            onClose={this.handleRequestClose.bind(this)}
          >
            {userOrganisations.map((supplier, index) => (
              <MenuItem
                key={"supplier" + index}
                onClick={() => {
                  this.handleSupplierChange(supplier.id);
                }}
              >
                <ListItemText>{supplier.name}</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  {supplier.id}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        ) : (
          <div style={{ padding: 20 }}>Ingen forhandlere</div>
        )}
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  supplierList: state.asyncReducer.suppliers,
  activeSupplier: state.asyncReducer.currentSupplier,
  auth: state.userReducer.auth,
});

export default connect(mapStateToProps)(Header);
