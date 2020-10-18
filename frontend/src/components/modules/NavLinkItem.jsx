import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';

export default ({
  name, dest, icon,
}) => (
  <NavItem>
    <NavLink exact className="nav-link" activeClassName="nav-link active" to={dest}>
      <span>
        {icon && (<FontAwesomeIcon icon={icon} />)}
        {' '}
        {name}
      </span>
    </NavLink>
  </NavItem>
);
