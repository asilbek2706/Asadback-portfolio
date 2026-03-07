import React from 'react';
import '../../styles/loader/Loader.scss'

const Loader: React.FC = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-content">
                <div className="loader-circle"></div>
                <div className="loader-text">ASADBEK</div>
            </div>
        </div>
    );
};

export default Loader;
