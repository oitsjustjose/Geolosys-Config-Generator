import axios from 'axios';
import GetConfigs from './GetConfigs';

export default (id, data) => axios.patch(`/api/configs/${id}`, data)
  .then((resp) => {
    GetConfigs();
    return resp.data;
  });
