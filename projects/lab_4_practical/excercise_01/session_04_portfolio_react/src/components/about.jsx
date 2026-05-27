export default function About() {
    return (
        <section id="about">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <div className="about-grid">
                    <div className="about-img">
                        {/* Placeholder for your image */}
                    </div>
                    <div className="about-text glass-card">
                        <p>
                            Hello! I am a passionate developer focusing on building rich, interactive web applications. 
                            I love turning complex problems into simple, beautiful, and intuitive designs.
                        </p>
                        <p>
                            When I'm not coding, you can find me exploring new technologies, reading tech blogs, 
                            or contributing to open-source projects.
                        </p>
                        <a href="#contact" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                            Let's Talk
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
