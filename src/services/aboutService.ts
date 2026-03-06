import api from '../api/axios';
import type { AboutData, ApiResponse } from '../types';

export const getAboutInfo = async (): Promise<AboutData | null> => {
    try {
        const response = await api.get<ApiResponse<AboutData>>('/about/');

        if (response.data.status && response.data.data.length > 0) {
            return response.data.data[0];
        }
        return null;
    } catch (error) {
        console.error("About ma'lumotlarini olishda xatolik:", error);
        return null;
    }
};
