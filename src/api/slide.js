import callApi from './utils';

//Get all slides
export const getAllSlide = token => {
  return callApi('/api/v1/slide', 'GET', '', token);
};
