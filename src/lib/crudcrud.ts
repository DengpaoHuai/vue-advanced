import axios from 'axios';

const crudcrud = axios.create({
  baseURL: 'https://crudcrud.com/api/a5717d39dd754778ad37358cd2b2bad9',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default crudcrud;
