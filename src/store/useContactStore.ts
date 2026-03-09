import { create } from 'zustand';
import {
    sendContactMessage,
    type ContactRequest,
} from '../services/contactService';
import type { ApiResponse } from '../types';

interface ContactState {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
}

interface ContactActions {
    submitContact: (data: ContactRequest) => Promise<boolean>;
    resetStatus: () => void;
}

export const useContactStore = create<ContactState & ContactActions>((set) => ({
    isSubmitting: false,
    isSuccess: false,
    error: null,

    submitContact: async (data: ContactRequest): Promise<boolean> => {
        set({ isSubmitting: true, error: null, isSuccess: false });

        try {
            // response tipini ApiResponse<ContactRequest> deb belgilaymiz
            const response: ApiResponse<ContactRequest> =
                await sendContactMessage(data);

            if (response.status) {
                set({ isSuccess: true, isSubmitting: false });
                return true;
            }

            throw new Error(response.message || 'Xatolik yuz berdi');
        } catch (err: unknown) {
            let errorMessage = 'Xabar yuborishda xatolik yuz berdi';

            if (err instanceof Error) {
                errorMessage = err.message;
            }

            set({
                error: errorMessage,
                isSubmitting: false,
            });
            return false;
        }
    },

    resetStatus: () =>
        set({ isSuccess: false, error: null, isSubmitting: false }),
}));
