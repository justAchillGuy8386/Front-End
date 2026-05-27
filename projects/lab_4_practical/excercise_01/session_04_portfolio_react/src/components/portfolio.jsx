import { projects } from './skills.jsx';

export default function Portfolio() {
    return (
        <section id="portfolio">
            <div className="container">
                <h2 className="section-title">Portfolio</h2>
                <div className="portfolio-grid">
                    {projects.map(project => (
                        <div key={project.id} className="project-card glass-card" style={{ padding: 0 }}>
                            <img src={project.image} alt={project.title} className="project-img" />
                            <div className="project-overlay">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
