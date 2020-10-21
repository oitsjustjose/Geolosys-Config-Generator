import axios from 'axios';
import GetConfigs from './GetConfigs';

export default (data) => axios.put('/api/configs', data)
  .then((resp) => {
    GetConfigs();
    return resp.data;
  });
