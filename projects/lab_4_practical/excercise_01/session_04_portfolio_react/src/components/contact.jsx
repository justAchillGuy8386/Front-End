export default function Contact() {
    return (
        <section id="contact">
            <div className="container contact-container">
                <h2 className="section-title">Get In Touch</h2>
                <form className="contact-form glass-card" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" className="form-control" placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" className="form-control" placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" className="form-control" placeholder="Hello, I'd like to talk about..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
