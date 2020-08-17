import axios from 'axios';
import * as config from './config';

export default function uploadImage(endpoint, method, data, Token) {
  // console.log(body);

  return axios({
    method: method,
    url: `${config.API_URL}${endpoint}`,
    data,
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    //   Authorization: 'Bearer ' + Token,
    // },

    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
}
