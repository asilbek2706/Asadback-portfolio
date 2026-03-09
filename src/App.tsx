import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './pages/About';
import ProjectList from './pages/ProjectList';
import Contact from './pages/Contact';
import Background from './shared/Background';
import SidebarImage from './components/SidebarImage';
import InitialLoader from './components/loader/InitialLoader';
import { useAboutStore } from './store/useAboutStore';
import Lenis from '@studio-freight/lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/App.scss';

const App: React.FC = () => {
    const { fetchAllData, isLoading, isInitialized, aboutInfo } =
        useAboutStore();
    const [showInitialOverlay, setShowInitialOverlay] = useState(true);

    useEffect(() => {
        fetchAllData();

        const lenis = new Lenis({
            duration: 2.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.7,
            touchMultiplier: 1.5,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, [fetchAllData]);

    useEffect(() => {
        if (!isLoading && isInitialized) {
            const timer = setTimeout(() => {
                setShowInitialOverlay(false);

                AOS.init({
                    duration: 1800,
                    easing: 'ease-out-quart',
                    once: true,
                    offset: 150,
                    delay: 0,
                });

                setTimeout(() => AOS.refresh(), 200);
            }, 400);

            return () => clearTimeout(timer);
        }
    }, [isLoading, isInitialized]);

    return (
        <>
            {showInitialOverlay && (
                <div
                    className={`initial-loader-wrapper ${!isLoading && isInitialized ? 'fade-out' : ''}`}
                >
                    <InitialLoader />
                </div>
            )}

            <div className="app-main-wrapper">
                <Background />
                <SidebarImage />
                <Navbar />

                <div className="layout-container">
                    <main className="scrollable-content">
                        {!isLoading && aboutInfo ? (
                            <>
                                <section
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                >
                                    <Hero />
                                </section>

                                <section
                                    data-aos="fade-up"
                                    data-aos-delay="600"
                                >
                                    <About />
                                </section>

                                <section
                                    data-aos="fade-up"
                                    data-aos-delay="900"
                                >
                                    <ProjectList />
                                </section>

                                <section
                                    data-aos="fade-up"
                                    data-aos-delay="1200"
                                >
                                    <Contact />
                                </section>

                                <footer
                                    className="site-footer"
                                    data-aos="fade-in"
                                    data-aos-delay="1400"
                                    data-aos-offset="0"
                                >
                                    <p className="m-0">
                                        &copy; 2026 ASADBEK. Barcha huquqlar
                                        himoyalangan.
                                    </p>
                                </footer>
                            </>
                        ) : (
                            <div style={{ height: '100vh' }} />
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default App;
