import axios from 'axios';
import * as config from './config';

export default function uploadImage(endpoint, method, data, Token) {
  return axios({
    method: method,
    url: `${config.API_URL}${endpoint}`,
    data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + Token,
    },
  })
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
}
