import axios from 'axios';

export const getFakeData = () => {
  return axios.get('https://jsonplaceholder.typicode.com/comments');
};
