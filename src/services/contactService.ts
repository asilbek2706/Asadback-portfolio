import api from '../api/axios';
import type { ApiResponse, ContactFormData, Question } from '../types';

export const getQuestions = async (): Promise<Question[]> => {
    try {
        const response =
            await api.get<ApiResponse<Question[]>>('/questions-list/');

        const { status, data } = response.data;
        return status && Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('[QuestionService] Fetch Error:', error);
        return [];
    }
};

export interface ContactRequest extends ContactFormData {
    readonly recaptcha_token: string;
}

export const sendContactMessage = async (
    data: ContactRequest
): Promise<ApiResponse<ContactRequest>> => {
    try {
        const response = await api.post<ApiResponse<ContactRequest>>(
            '/contact/',
            data
        );
        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message ||
            'Xabar yuborishda xatolik yuz berdi';
        throw new Error(errorMessage);
    }
};
