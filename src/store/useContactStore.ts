import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
    type ContactRequest,
    sendContactMessage,
} from '../services/contactService';
import type { ApiResponse } from '../types';

export interface ChatMessage {
    name: string;
    email: string;
    message: string;
    timestamp: string;
    adminReply?: string;
}

interface ContactState {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
    messages: ChatMessage[];
}

interface ContactActions {
    submitContact: (data: ContactRequest) => Promise<boolean>;
    resetStatus: () => void;
    clearHistory: () => void;
}

export const useContactStore = create<ContactState & ContactActions>()(
    persist(
        (set) => ({
            isSubmitting: false,
            isSuccess: false,
            error: null,
            messages: [],

            submitContact: async (data: ContactRequest): Promise<boolean> => {
                set({ isSubmitting: true, error: null, isSuccess: false });

                try {
                    const response: ApiResponse<ContactRequest> =
                        await sendContactMessage(data);

                    if (response.status) {
                        const newMessage: ChatMessage = {
                            name: data.name,
                            email: data.email,
                            message: data.message,
                            timestamp: new Date().toISOString(),
                        };

                        set((state) => ({
                            isSuccess: true,
                            isSubmitting: false,
                            messages: [newMessage, ...state.messages],
                        }));
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

            clearHistory: () => set({ messages: [] }),
        }),
        {
            name: 'contact-history-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ messages: state.messages }),
        }
    )
);
