import React, { useEffect, useState } from 'react';
import { useAboutStore } from '../store/useAboutStore';
import '../styles/Navbar.scss';
import { Github, Instagram, Send } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { aboutInfo } = useAboutStore();

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    const handleScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        targetId: string
    ) => {
        e.preventDefault();

        const element = document.getElementById(targetId);
        if (element) {
            setIsOpen(false);
            const offset = 80;
            const elementPosition =
                element.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
        }
    };

    return (
        <nav className="custom-navbar">
            <div className="nav-logo">
                <a href="#about" onClick={(e) => handleScroll(e, 'about')}>
                    ASADBEK
                </a>
            </div>

            <div className="nav-actions">
                <div
                    className={`menu-toggle ${isOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                >
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
            </div>

            <div className={`nav-sidebar ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-content">
                    <ul className="nav-links">
                        <li>
                            <a
                                href="#about"
                                onClick={(e) => handleScroll(e, 'about')}
                            >
                                O'zim haqimda
                            </a>
                        </li>
                        <li>
                            <a
                                href="#projects"
                                onClick={(e) => handleScroll(e, 'projects')}
                            >
                                Loyihalar
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                onClick={(e) => handleScroll(e, 'contact')}
                            >
                                Aloqa
                            </a>
                        </li>

                        <div className="sidebar-social-row">
                            <a
                                href={aboutInfo?.instagram_link || '#'}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href={aboutInfo?.telegram_link || '#'}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Send size={20} />
                            </a>
                            <a
                                href={aboutInfo?.github_link || '#'}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Github size={20} />
                            </a>
                        </div>
                    </ul>

                    <div className="sidebar-footer">
                        <p className="footer-title">
                            2026 ASADBEK. Barcha huquqlar himoyalangan.
                        </p>
                    </div>
                </div>
            </div>

            <div
                className={`menu-overlay ${isOpen ? 'active' : ''}`}
                onClick={toggleMenu}
            ></div>
        </nav>
    );
};

export default Navbar;
