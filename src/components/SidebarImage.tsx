import React from 'react';
import { useAboutStore } from '../store/useAboutStore';
import '../styles/SidebarImage/SidebarImage.scss';

const SidebarImage: React.FC = () => {
    const { aboutInfo, isLoading } = useAboutStore();

    if (isLoading || !aboutInfo) return null;

    return (
        <aside className="fixed-sidebar-container">
            <div
                className="image-perspective-container"
                data-aos="fade-right"
                data-aos-duration="1200"
            >
                <div className="image-stack">
                    <div className="layer layer-3"></div>
                    <div className="layer layer-2"></div>
                    <div className="main-image-box">
                        <img
                            src={aboutInfo.image}
                            alt={`${aboutInfo.firstname}`}
                            className="img-fluid"
                        />
                    </div>
                    <span className="image-badge">Backend dasturchi</span>
                </div>
            </div>
        </aside>
    );
};

export default SidebarImage;
