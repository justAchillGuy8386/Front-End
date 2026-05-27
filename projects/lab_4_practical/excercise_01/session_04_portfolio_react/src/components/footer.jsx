export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} YourName. All rights reserved.</p>
                <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                    Designed with ❤️ & React
                </p>
            </div>
        </footer>
    );
}
