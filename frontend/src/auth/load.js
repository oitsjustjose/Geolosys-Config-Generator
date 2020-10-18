/* eslint-disable no-underscore-dangle */
import jwtDecode from 'jwt-decode';
import store from '../redux/store';
import setAuthToken from '../axios/AuthToken';

export default () => {
  const token = window.localStorage.getItem('auth-token');
  if (token) {
    const user = jwtDecode(token);
    store.dispatch({ type: 'SET_USER', user });
    setAuthToken(token);
  }
};
