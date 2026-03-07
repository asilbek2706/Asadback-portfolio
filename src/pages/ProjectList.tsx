import React from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { useAboutStore } from '../store/useAboutStore';
import '../styles/projects/ProjectList.scss';

const ProjectList: React.FC = () => {
    const { projects } = useAboutStore();

    if (projects.length === 0) return null;

    return (
        <section id="projects" className="projects-section py-5">
            <div className="container">
                <header className="section-header mb-5" data-aos="fade-up">
                    <h2 className="display-4 fw-light text-white">
                        Tanlangan loyihalar
                    </h2>
                    <div className="divider-short"></div>
                </header>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 200}
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
                                                >
                                                    <Github size={22} />
                                                </a>
                                            )}
                                            {project.project_link && (
                                                <a
                                                    href={project.project_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="Demo"
                                                >
                                                    <ExternalLink size={22} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="project-arrow">
                                        <ArrowRight size={30} strokeWidth={1} />
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