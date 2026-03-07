import { create } from 'zustand';
import type { AboutData, Project } from '../types';
import { getAboutInfo } from '../services/aboutService';
import { getProjects } from '../services/projectService';

interface AboutStore {
    aboutInfo: AboutData | null;
    projects: Project[];
    isLoading: boolean;
    error: string | null;
    setAboutInfo: (info: AboutData) => void;
    setProjects: (projects: Project[]) => void;
    setLoading: (status: boolean) => void;
    fetchAllData: () => Promise<void>;
}

export const useAboutStore = create<AboutStore>((set) => ({
    aboutInfo: null,
    projects: [],
    isLoading: true,
    error: null,

    setAboutInfo: (info) => set({ aboutInfo: info }),
    setProjects: (projects) => set({ projects: projects }),
    setLoading: (status) => set({ isLoading: status }),

    fetchAllData: async () => {
        set({ isLoading: true, error: null });
        try {
            // Parallel yuklash orqali vaqtdan yutamiz
            const [aboutRes, projectsRes] = await Promise.all([
                getAboutInfo(),
                getProjects(),
            ]);

            if (aboutRes) set({ aboutInfo: aboutRes });
            if (projectsRes) set({ projects: projectsRes });
        } catch (err) {
            set({ error: "Ma'lumotlarni yuklashda xatolik" });
            console.error('Fetch error:', err);
        } finally {
            setTimeout(() => set({ isLoading: false }), 1200);
        }
    },
}));
