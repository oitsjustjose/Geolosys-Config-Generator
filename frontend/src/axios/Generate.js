import axios from 'axios';

export default (data) => {
  console.log(data);
  axios.post('/api/configs', data);
};
