import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://swapi.dev/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
