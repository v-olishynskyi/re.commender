import React from 'react';
import axios from 'axios';

export const useAxios = () => {
  const axiosInstance = axios.create({
    responseType: 'json',
    baseURL: 'https://api.themoviedb.org/',
  });

  return axiosInstance;
};
