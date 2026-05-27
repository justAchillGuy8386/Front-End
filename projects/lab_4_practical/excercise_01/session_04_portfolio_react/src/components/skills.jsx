export const skills = [
    { name: 'HTML5 / CSS3', level: 95, category: 'frontend' },
    { name: 'JavaScript (ES6+)', level: 90, category: 'frontend' },
    { name: 'React.js', level: 85, category: 'frontend' },
    { name: 'Node.js & Express', level: 75, category: 'backend' },
    { name: 'MongoDB / SQL', level: 80, category: 'database' },
    { name: 'UI/UX Design', level: 85, category: 'design' },
];

export const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80',
        description: 'React + Node.js full-stack application with real-time checkout.'
    },
    {
        id: 2,
        title: 'Fitness Tracker App',
        category: 'mobile',
        image: 'https://images.unsplash.com/photo-1526506114642-9037f0c2d8f7?w=600&q=80',
        description: 'React Native fitness tracking app with data visualization.'
    },
    {
        id: 3,
        title: 'Task Management Dashboard',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
        description: 'Vue.js dashboard for enterprise resource planning.'
    }
];

export default function Skills() {
    return (
        <section id="skills">
            <div className="container">
                <h2 className="section-title">My Skills</h2>
                <div className="skills-grid glass-card">
                    {skills.map((s, i) => (
                        <div key={i} className="skill-item">
                            <div className="skill-info">
                                <span>{s.name}</span>
                                <span>{s.level}%</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-progress" style={{ width: `${s.level}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}