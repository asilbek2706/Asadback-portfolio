import api from '../api/axios';
import type { ApiResponse, ContactFormData, Question } from '../types';

export const getQuestions = async (): Promise<Question[]> => {
    try {
        const response =
            await api.get<ApiResponse<Question>>('/questions-list/');
        return response.data.status ? response.data.data : [];
    } catch (error) {
        console.error('Savollarni olishda xatolik:', error);
        return [];
    }
};

export interface ContactRequest extends ContactFormData {
    recaptcha_token: string;
}

export const sendContactMessage = async (
    data: ContactRequest
): Promise<ApiResponse<ContactRequest>> => {
    const response = await api.post<ApiResponse<ContactRequest>>(
        '/contact/',
        data
    );
    return response.data;
};