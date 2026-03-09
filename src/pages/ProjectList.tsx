import React from 'react';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { useAboutStore } from '../store/useAboutStore';
import '../styles/projects/ProjectList.scss';

const ProjectList: React.FC = () => {
    const { projects } = useAboutStore();

    if (projects.length === 0) return null;

    return (
        <section id="projects" className="projects-section py-5">
            <div className="container">
                <header className="section-header mb-5" data-aos="fade-up">
                    <span className="text-uppercase small tracking-widest text-secondary fw-bold">
                        Portfolio
                    </span>
                    <h2 className="display-5 fw-light text-white mt-2">
                        Tanlangan loyihalar
                    </h2>
                    <div className="divider-short mt-3"></div>
                </header>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            // Unique key xatosini oldini olish uchun id va index birlashtirildi
                            key={`${project.id || 'project'}-${index}`}
                            className="project-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                        >
                            <div className="project-image-wrapper">
                                <img
                                    src={project.project_image}
                                    alt={project.project_name}
                                    className="project-img"
                                />

                                <div className="project-overlay">
                                    <div className="project-info">
                                        <h3 className="project-title">
                                            {project.project_name}
                                        </h3>
                                        <div className="project-links">
                                            {project.project_github_link && (
                                                <a
                                                    href={
                                                        project.project_github_link
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="GitHub"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <Github size={20} />
                                                </a>
                                            )}
                                            {project.project_link && (
                                                <a
                                                    href={project.project_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="Demo"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="project-arrow">
                                        <ArrowRight size={32} strokeWidth={1} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
