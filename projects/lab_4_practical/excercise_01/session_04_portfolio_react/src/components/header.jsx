export default function Header() {
    return (
        <header className="header glass-card" style={{ padding: '20px 0', border: 'none', borderRadius: '0', borderBottom: '1px solid var(--glass-border)' }}>
            <div className="container">
                <nav className="nav">
                    <a href="#home" className="logo">Nguyen Sy Kien</a>
                    <div className="nav-links">
                        <a href="#about">About</a>
                        <a href="#skills">Skills</a>
                        <a href="#portfolio">Portfolio</a>
                        <a href="#contact">Contact</a>
                    </div>
                </nav>
            </div>
        </header>
    );
}