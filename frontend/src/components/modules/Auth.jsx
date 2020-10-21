import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import LoginPage from '../view/Login';
import store from '../../redux/store';

export default ({ children, ...rest }) => {
  const state = store.getState();

  if (state.isAuthenticated === undefined) {
    return (
      <CSSTransition classNames="react-router" appear in timeout={300}>
        <div className="v-center"><h1>Loading...</h1></div>
      </CSSTransition>
    );
  }

  return (state.isAuthenticated && !!state.user)
    ? (<Route {...rest} />)
    : (<Route {...rest} component={LoginPage} />);
};
