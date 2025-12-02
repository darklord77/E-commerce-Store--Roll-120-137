import api from './api.js';

// User Management APIs
export const userAPI = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
  
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
};

// Book Management APIs
export const bookAPI = {
  getAllBooks: async () => {
    const response = await api.get('/books');
    return response.data;
  },
  
  getBookById: async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },
  
  createBook: async (bookData) => {
    const response = await api.post('/books', bookData);
    return response.data;
  },
  
  updateBook: async (id, bookData) => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },
  
  deleteBook: async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },
};