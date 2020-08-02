import axios from 'axios';
import * as config from './config';

export default function uploadImage(endpoint, method, body, Token) {
  console.log(body);
  return axios({
    method: method,
    url: `${config.API_URL}${endpoint}`,
    data: body,
    headers: {
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'multipart/form-data',
    },
  });
}
