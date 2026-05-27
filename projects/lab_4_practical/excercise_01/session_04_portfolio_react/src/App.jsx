import Header from './components/header.jsx';
import Hero from './components/hero.jsx';
import About from './components/about.jsx';
import Skills from './components/skills.jsx';
import Portfolio from './components/portfolio.jsx';
import Contact from './components/contact.jsx';
import Footer from './components/footer.jsx';

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Hero />
                <About />
                <Skills />
                <Portfolio />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;