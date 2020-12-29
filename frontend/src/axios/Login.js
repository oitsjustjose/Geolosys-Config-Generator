/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import store from '../redux/store';
import setAuthToken from './AuthToken';

export default (data) => {
  const path = '/api/users/login';

  return axios.post(path, data)
    .then((resp) => {
      if (resp.status === 200) {
        const token = resp.data;
        localStorage.setItem('auth-token', token);

        const user = jwtDecode(token);
        store.dispatch({ type: 'SET_USER', user: user._doc });

        setAuthToken(token);
      }
      return resp;
    });
};
