import axiosInstance from '../axios-instance';

export const getPvLogs = async (query) => (await axiosInstance.get('/pv' ,  {params: query})).data