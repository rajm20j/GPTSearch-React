import axios from 'axios';
import { ISearchQuery, ISearchResponse } from '../pages/Landing/interfaces/interfaces';

export const getFakeData = () => {
  return axios.get('https://jsonplaceholder.typicode.com/comments');
};

export const postSearchRequest = ({ body }: ISearchQuery) => {
  return axios.post<ISearchResponse>('https://api.openai.com/v1/chat/completions', body, {
    headers: {
      Authorization: `Bearer ${process.env.OPEN_API_KEY}`
    }
  });
};
