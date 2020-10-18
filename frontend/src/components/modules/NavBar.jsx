import {  faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLinkItem from './NavLinkItem';
import store from '../../redux/store';
import LogOut from '../../auth/logout';

export default () => (
  <Navbar expand="lg" collapseOnSelect bg="dark" variant="dark" fixed="top">
    <Navbar.Brand>Geolosys Configurator</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse>
      <Nav className="mr-auto">
        <NavLinkItem name="Blog" dest="/" icon={faBook} />
        {store.getState().isAuthenticated && (
            <div>
        <NavLinkItem name="Your Configs" dest="/manage" icon={faEdit} />
        <NavItem style={{ cursor: 'pointer' }} onClick={LogOut}>
          <div className="nav-link nav-sign-out">
            <span>
              <FontAwesomeIcon icon={faSignOutAlt} />
              {' '}
              Sign Out
            </span>
          </div>
        </NavItem>
            </div>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
