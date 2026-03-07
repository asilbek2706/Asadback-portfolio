import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectList from './pages/ProjectList';
import Background from './shared/Background';
import SidebarImage from './components/SidebarImage'; // Yangi komponent
import Loader from './components/loader/Loader';
import { useAboutStore } from './store/useAboutStore';
import Lenis from '@studio-freight/lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/App.scss';

const App: React.FC = () => {
    const { fetchAllData, isLoading, aboutInfo } = useAboutStore();

    useEffect(() => {
        fetchAllData();

        const lenis = new Lenis({
            duration: 2.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, [fetchAllData]);

    useEffect(() => {
        if (!isLoading) {
            AOS.init({
                duration: 1000,
                easing: 'ease-out-quad',
                once: true,
                offset: 0,
            });
            setTimeout(() => AOS.refresh(), 100);
        }
    }, [isLoading]);

    return (
        <div className="app-main-wrapper">
            {isLoading && <Loader />}

            <Background />

            <SidebarImage />

            <Navbar />

            {!isLoading && aboutInfo && (
                <div className="layout-container">
                    <main className="scrollable-content">
                        <div data-aos="fade-up" data-aos-delay="200">
                            <Hero />
                        </div>

                        <div data-aos="fade-up" data-aos-delay="400">
                            <ProjectList />
                        </div>

                        <footer className="site-footer">
                            <p className="m-0">
                                &copy; 2026 ASADBEK. Barcha huquqlar
                                himoyalangan.
                            </p>
                        </footer>
                    </main>
                </div>
            )}
        </div>
    );
};

export default App;
