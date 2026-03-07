import React from 'react';
import { useAboutStore } from '../store/useAboutStore';
import '../styles/Hero/Hero.scss';

const Hero: React.FC = () => {
    const { aboutInfo } = useAboutStore();

    if (!aboutInfo) return null;

    return (
        <section id="about" className="hero-section d-flex align-items-center">
            <div className="hero-content">
                <header
                    className="hero-header mb-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <span className="text-uppercase small tracking-widest text-secondary fw-bold">
                        O‘zimni tanishtirsam
                    </span>
                    <div className="divider-short my-3"></div>
                </header>

                <h1
                    className="display-2 fw-light lh-1 mb-4 text-white"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    Django bilan ishlashdan <br />
                    <span className="text-opacity-75">zavqlanuvchi</span> <br />
                    <span className="fw-normal">dasturchi</span>
                </h1>

                <p
                    className="hero-description text-white-50 lead mb-5"
                    data-aos="fade-up"
                    data-aos-delay="600"
                >
                    {aboutInfo.about_text}
                </p>

                <div
                    className="scroll-indicator-line"
                    data-aos="fade-in"
                    data-aos-delay="1000"
                >
                    <div className="line"></div>
                    <span className="scroll-text">PASTGA</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
