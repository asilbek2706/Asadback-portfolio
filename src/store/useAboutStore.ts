import { create } from 'zustand';
import type { AboutData } from '../types';

interface AboutStore {
    aboutInfo: AboutData | null;
    isLoading: boolean;
    setAboutInfo: (info: AboutData) => void;
    setLoading: (status: boolean) => void;
}

export const useAboutStore = create<AboutStore>((set) => ({
    aboutInfo: null,
    isLoading: false,
    setAboutInfo: (info) => set({ aboutInfo: info }),
    setLoading: (status) => set({ isLoading: status }),
}));
