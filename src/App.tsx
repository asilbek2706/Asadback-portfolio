import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Background from './shared/Background';
import { useAboutStore } from './store/useAboutStore';
import { getAboutInfo } from './services/aboutService';
import { useEffect } from 'react';
import Loader from './components/loader/Loader.tsx';

function App() {
    const { isLoading, setLoading, setAboutInfo, aboutInfo } = useAboutStore();

    useEffect(() => {
        const initApp = async () => {
            setLoading(true);
            try {
                const data = await getAboutInfo();
                if (data) {
                    setAboutInfo(data);
                }
            } catch (error) {
                console.error("Ma'lumotni yuklashda xato:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false); //
                }, 1500);
            }
        };

        initApp();
    }, [setAboutInfo, setLoading]);

    return (
        <div className="app-main-wrapper">
            {isLoading && <Loader />}

            <Background />
            <Navbar />

            <main className="content-wrapper">
                {!isLoading && aboutInfo && (
                    <>
                        <Hero />
                    </>
                )}
            </main>

            <footer className="py-5 text-center border-top border-secondary opacity-25">
                <p className="small m-0 text-white">
                    &copy; 2026 ASADBEK. Barcha huquqlar himoyalangan.
                </p>
            </footer>
        </div>
    );
}

export default App;
