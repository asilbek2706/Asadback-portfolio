import React from 'react';
import { useAboutStore } from '../store/useAboutStore';
import { Code2, Database, Layers, Layout, Cpu, Globe } from 'lucide-react';
import '../styles/about/About.scss';

const About: React.FC = () => {
    const { aboutInfo } = useAboutStore();

    if (!aboutInfo) return null;

    const skills = [
        { name: 'Python / Django', icon: <Code2 size={16} /> },
        { name: 'PostgreSQL', icon: <Database size={16} /> },
        { name: 'Rest API', icon: <Globe size={16} /> },
        { name: 'Docker', icon: <Layers size={16} /> },
        { name: 'Redis', icon: <Cpu size={16} /> },
        { name: 'Celery', icon: <Layout size={16} /> },
    ];

    return (
        <section id="about-detail" className="about-section">
            <div className="about-container">
                <div className="about-grid">
                    {/* Chap taraf: Matnli ma'lumot */}
                    <div className="about-main-info" data-aos="fade-right">
                        <div className="label-tag">INFO</div>
                        <h2 className="section-title">
                            Backend <br /> Developer
                        </h2>
                        <p className="about-description">
                            {aboutInfo.about_text}
                        </p>

                        <div className="education-box">
                            <span className="edu-label">Education</span>
                            <span className="edu-value">
                                Acharya University (2024-2028)
                            </span>
                        </div>
                    </div>

                    <div className="about-skills-info" data-aos="fade-left">
                        <div className="skills-wrap">
                            {skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="skill-pill"
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 100}
                                >
                                    <span className="skill-pill-icon">
                                        {skill.icon}
                                    </span>
                                    <span className="skill-pill-name">
                                        {skill.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
