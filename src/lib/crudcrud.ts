import axios from 'axios';

const crudcrud = axios.create({
  baseURL: 'https://crudcrud.com/api/d729d3aa3fc2464a866990498ab48deb',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default crudcrud;
