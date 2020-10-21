import axios from 'axios';
import store from '../../redux/store';

export default () => axios.get('/api/configs/')
  .then((resp) => {
    store.dispatch({ type: 'SET_CONFIGS', configs: resp.data || [] });
  });
