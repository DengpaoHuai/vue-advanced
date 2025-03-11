import axios from 'axios';

const crudcrud = axios.create({
  baseURL: 'https://crudcrud.com/api/949eea54d18e457192ba09737ceb4c59',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default crudcrud;
