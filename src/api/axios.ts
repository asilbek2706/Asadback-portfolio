import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.asilbek-karomatov.dev/api/v1',
    timeout: 10000, // 10 soniyadan ko'p kutmaslik uchun
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
