import React from 'react';
import {
  faCode, faPlusSquare, faSignInAlt, faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Form, Nav, Navbar, NavItem,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import LogOut from '../../auth/logout';
import store from '../../redux/store';
import NavLinkItem from './NavLinkItem';

const NavBarComponent = ({
  mc114Mode,
}) => (
  <Navbar expand="lg" collapseOnSelect bg="dark" variant="dark" fixed="top">
    <Navbar.Brand>
      <span>
        <img width="24" src={`${process.env.PUBLIC_URL}/logo.png`} alt="Geolosys Logo" />
        {' '}
        Configurator
      </span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse>
      <Nav className="mr-auto">
        <NavLinkItem name="Create" dest="/" icon={faPlusSquare} />

        {store.getState().isAuthenticated && (
          <NavLinkItem name="Your Configs" dest="/browse" icon={faCode} />
        )}

        {store.getState().isAuthenticated && (
          <NavItem style={{ cursor: 'pointer' }} onClick={LogOut}>
            <div className="nav-link nav-sign-out">
              <span>
                <FontAwesomeIcon icon={faSignOutAlt} />
                {' '}
                Sign Out
              </span>
            </div>
          </NavItem>
        )}

        {!store.getState().isAuthenticated && (
          <NavLinkItem name="Log In" dest="/login" icon={faSignInAlt} />
        )}

        <NavItem className="switch-nav-item align-bottom mt-2">
          <Form.Check
            type="switch"
            label="For MC 1.14+"
            id="mc114-switch"
            checked={mc114Mode === true}
            onChange={() => {
              store.dispatch({ type: 'TOGGLE_MC_VER' });
            }}
          />
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = (state) => ({
  mc114Mode: state.mc114,
});

export default connect(mapStateToProps)(NavBarComponent);
