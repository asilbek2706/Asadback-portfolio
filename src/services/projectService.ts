import api from '../api/axios';
import type { ApiResponse, Project } from '../types';

export const getProjects = async (): Promise<Project[]> => {
    try {
        const response = await api.get<ApiResponse<Project>>('/projects/');
        if (response.data.status) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error('Loyihalarni olishda xatolik:', error);
        return [];
    }
};
