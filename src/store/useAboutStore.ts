import { create } from 'zustand';
import type { AboutData, Project } from '../types';
import { getAboutInfo } from '../services/aboutService';
import { getProjects } from '../services/projectService';

interface AboutState {
    aboutInfo: AboutData | null;
    projects: Project[];
    isLoading: boolean;
    error: string | null;
    isInitialized: boolean;
}

interface AboutActions {
    fetchAllData: (forceRefresh?: boolean) => Promise<void>;
    resetStore: () => void;
}

export const useAboutStore = create<AboutState & AboutActions>((set, get) => ({
    aboutInfo: null,
    projects: [],
    isLoading: false,
    error: null,
    isInitialized: false,

    fetchAllData: async (forceRefresh = false) => {
        // Agar ma'lumotlar yuklangan bo'lsa va majburiy yangilash bo'lmasa, so'rov yubormaymiz
        if (get().isInitialized && !forceRefresh) return;

        set({ isLoading: true, error: null });

        try {
            // 1. Ma'lumotlarni parallel ravishda olishni boshlaymiz
            const [aboutRes, projectsRes] = await Promise.allSettled([
                getAboutInfo(),
                getProjects(),
            ]);

            // 2. SUN'IY DELAY (1000ms)
            // Bu InitialLoader o'zining premium effektini ko'rsatib ulgurishi uchun kerak
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const newState: Partial<AboutState> = { isInitialized: true };

            // About ma'lumotlarini tekshirish
            if (aboutRes.status === 'fulfilled' && aboutRes.value) {
                newState.aboutInfo = aboutRes.value;
            } else if (aboutRes.status === 'rejected') {
                console.error('About Info Fetch Error:', aboutRes.reason);
            }

            // Loyihalarni tekshirish
            if (projectsRes.status === 'fulfilled' && projectsRes.value) {
                newState.projects = projectsRes.value;
            } else if (projectsRes.status === 'rejected') {
                console.error('Projects Fetch Error:', projectsRes.reason);
            }

            // Yangi holatni saqlaymiz
            set(newState);
        } catch (error) {
            set({ error: 'Tizimda kutilmagan xatolik yuz berdi' });
            console.error('Store Fetch All Error:', error);
        } finally {
            // 3. Loaderning silliq g'oyib bo'lishi uchun oxirgi kichik delay
            setTimeout(() => set({ isLoading: false }), 500);
        }
    },

    resetStore: () =>
        set({
            aboutInfo: null,
            projects: [],
            isInitialized: false,
            error: null,
        }),
}));
