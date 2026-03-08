import api from '../api/axios';
import type { AboutData, ApiResponse } from '../types';

export const getAboutInfo = async (): Promise<AboutData | null> => {
    try {
        const response = await api.get<ApiResponse<AboutData[]>>('/about/');

        const { status, data } = response.data;

        if (status && Array.isArray(data) && data.length > 0) {
            return data[0];
        }

        return null;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error(`[AboutService]: ${errorMessage}`);

        throw new Error(errorMessage);
    }
};
