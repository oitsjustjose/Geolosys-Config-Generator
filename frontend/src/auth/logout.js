import setAuthToken from '../axios/AuthToken';
import store from '../redux/store';

export default () => {
  localStorage.removeItem('auth-token');
  setAuthToken(null);
  store.dispatch({ type: 'CLEAR_USER' });
  window.location.href = '/';
};
