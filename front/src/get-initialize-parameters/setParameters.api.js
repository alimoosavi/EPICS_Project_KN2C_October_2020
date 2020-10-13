import axios from '../axios-instance';

export const setParametersApi = async (data) => axios.post('/parameters', {
    'Content-Type': 'application/json',
    data
});

export const getParametersApi = async () => (await axios.get('/parameters')).data;
