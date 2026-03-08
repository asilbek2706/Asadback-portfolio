import api from '../api/axios';
import type { ApiResponse, Project } from '../types';

export const getProjects = async (): Promise<Project[]> => {
    try {
        const response = await api.get<ApiResponse<Project[]>>('/projects/');

        const { status, data } = response.data;

        if (status && Array.isArray(data)) {
            return data;
        }

        return [];
    } catch (error: any) {
        const msg = error.response?.data?.message || error.message;
        console.error(`[ProjectService Error]: ${msg}`);

        return [];
    }
};
