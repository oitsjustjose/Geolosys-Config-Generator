import axios from 'axios';

export default (id) => axios.get(`/api/configs/${id}`)
  .then((resp) => resp.data);
