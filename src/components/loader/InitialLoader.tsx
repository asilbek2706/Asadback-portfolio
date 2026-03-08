import React from 'react';
import '../../styles/components/InitialLoader.scss';

const InitialLoader: React.FC = () => {
    return (
        <div className="initial-loader-overlay">
            <div className="loader-content">
                <div className="brand-name">ASADBEK</div>
                <div className="progress-container">
                    <div className="progress-bar"></div>
                </div>
                <div className="status-text">INITIALIZING_SYSTEM...</div>
            </div>
        </div>
    );
};

export default InitialLoader;
