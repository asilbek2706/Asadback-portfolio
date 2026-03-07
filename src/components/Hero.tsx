import React from 'react';
import { useAboutStore } from '../store/useAboutStore';
import '../styles/Hero/Hero.scss';

const Hero: React.FC = () => {
    const { aboutInfo } = useAboutStore();

    if (!aboutInfo) return null;

    return (
        <section
            id="about"
            className="min-vh-100 d-flex align-items-center text-white"
        >
            <div className="container">
                <div className="row align-items-center gy-5">
                    <div className="col-lg-5 position-relative">
                        <div className="image-stack-container">
                            <div className="image-layer layer-3"></div>
                            <div className="image-layer layer-2"></div>
                            <div className="main-image-wrapper">
                                <img
                                    src={aboutInfo.image}
                                    alt="Asadbek"
                                    className="hero-main-img"
                                />
                            </div>
                            <span className="image-tag">Backend dasturchi</span>
                        </div>
                    </div>

                    <div className="col-lg-7 ps-lg-5">
                        <header className="mb-4">
                            <span className="text-uppercase small tracking-widest text-secondary fw-bold">
                                O‘zimni tanishtirsam
                            </span>
                            <div className="divider-short my-3"></div>
                        </header>
                        <h1 className="display-2 fw-light lh-1 mb-4">
                            Django bilan ishlashdan <br />
                            zavqlanuvchi <br />
                            <span className="fw-normal">dasturchi</span>
                        </h1>
                        <p className="text-white-20 lead mb-5 w-75">
                            {aboutInfo.about_text}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
