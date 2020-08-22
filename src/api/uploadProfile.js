import axios from 'axios';
import * as config from './config';

export default function uploadImage(endpoint, method, body, Token) {
  return axios({
    method: method,
    url: `${config.API_URL}${endpoint}`,
    data: body,
    headers: {
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
}
