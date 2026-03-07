import React, { useState } from 'react';
import { useAboutStore } from '../store/useAboutStore';
import '../styles/Navbar.scss';
import { Github, Instagram, Send } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { aboutInfo } = useAboutStore(); //

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="custom-navbar">
            <div className="nav-logo">
                <a
                    href="#about"
                    className="text-decoration-none text-white fw-bold"
                >
                    Asadbek
                </a>
            </div>

            <div className="nav-actions">
                <div className="social-icons-top d-none d-md-flex">
                    <a
                        href={aboutInfo?.instagram_link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Instagram size={18} />
                    </a>
                    <a
                        href={aboutInfo?.telegram_link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Send size={18} />
                    </a>
                    <a
                        href={aboutInfo?.github_link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Github size={18} />
                    </a>
                </div>

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
                            <a href="#about" onClick={toggleMenu}>
                                O'zim haqimda
                            </a>
                        </li>
                        <li>
                            <a href="#projects" onClick={toggleMenu}>
                                Loyihalar
                            </a>
                        </li>
                        <li>
                            <a href="#questions" onClick={toggleMenu}>
                                FAQ
                            </a>
                        </li>
                        <li>
                            <a href="#contact" onClick={toggleMenu}>
                                Aloqa
                            </a>
                        </li>
                    </ul>

                    <div className="sidebar-footer">
                        <p className="footer-title">Ijtimoiy tarmoqlarim:</p>
                        <div className="social-icons-bottom">
                            <a
                                href={aboutInfo?.instagram_link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Instagram size={22} />
                            </a>
                            <a
                                href={aboutInfo?.telegram_link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Send size={22} />
                            </a>
                            <a
                                href={aboutInfo?.github_link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Github size={22} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="menu-overlay" onClick={toggleMenu}></div>
            )}
        </nav>
    );
};

export default Navbar;
