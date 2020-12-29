import axios from 'axios';
import store from '../../redux/store';

export default (id) => axios.get(`/api/configs/${id}`)
  .then((resp) => resp.data);

export const GetConfigForEdit = (id) => axios.get(`/api/configs/${id}`)
  .then(((resp) => {
    store.dispatch({
      type: 'SET_CONFIG_EDITING', id, json: resp.data.json, name: resp.data.name,
    });
    return resp.data;
  }));
