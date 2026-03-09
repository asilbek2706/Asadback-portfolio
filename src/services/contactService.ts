import api from '../api/axios';
import type { ApiResponse, Question } from '../types';

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ContactRequest extends ContactFormData {
    readonly recaptcha_token: string;
}

export const getQuestions = async (): Promise<Question[]> => {
    try {
        const response =
            await api.get<ApiResponse<Question[]>>('/questions-list/');
        const { status, data } = response.data;

        return status && Array.isArray(data) ? data : [];
    } catch (error: unknown) {
        console.error('[QuestionService] Fetch Error:', error);
        return [];
    }
};

export const sendContactMessage = async (
    data: ContactRequest
): Promise<ApiResponse<ContactRequest>> => {
    try {
        const response = await api.post<ApiResponse<ContactRequest>>(
            '/contact/',
            data
        );
        return response.data;
    } catch (error: unknown) {
        let errorMessage = 'Xabar yuborishda xatolik yuz berdi';

        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error
        ) {
            const axiosError = error as {
                response: { data: { message?: string } };
            };
            errorMessage = axiosError.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};
