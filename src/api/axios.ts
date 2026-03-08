import axios, {
    AxiosError,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        'https://api.asilbek-karomatov.dev/api/v1',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.code === 'ECONNABORTED') {
            console.error("So'rov vaqti tugadi (Timeout)");
        }

        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 401:
                    console.error('Avtorizatsiya xatosi (401)');
                    break;
                case 404:
                    console.error('Resurs topilmadi (404)');
                    break;
                case 500:
                    console.error('Serverda ichki xatolik (500)');
                    break;
                default:
                    console.error(`Xatolik yuz berdi: ${status}`);
            }
        } else if (error.request) {
            console.error("Server bilan aloqa yo'q. Internetni tekshiring.");
        }

        return Promise.reject(error);
    }
);

export default api;
