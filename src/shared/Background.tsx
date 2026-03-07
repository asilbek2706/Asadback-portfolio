import React from 'react';
import { useBackground } from '../contexts/background.context';
import '../styles/Background/background.scss';

const Background: React.FC = () => {
    const { isAnimating } = useBackground();

    return (
        <div className="background-fixed">
            <div className={`spiro-geometry ${isAnimating ? 'animating' : ''}`}>
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="shape-node"
                        style={{
                            transform: `rotate(${i * 6}deg)`,
                            animationDelay: `${i * -2}s`,
                        }}
                    ></div>
                ))}
                <div className="core-node"></div>
            </div>

            <div className="bg-gradient-bottom"></div>
        </div>
    );
};

export default Background;
