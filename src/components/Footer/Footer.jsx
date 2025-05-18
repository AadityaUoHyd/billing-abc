import { Link } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo-link">
                        <img src={assets.logo} alt="Billing-ABC Logo" className="footer-logo" />
                        <span>Billing-ABC</span>
                    </Link>
                    <p className="footer-slogan">Streamlining Your Billing Experience.</p>
                    <p className="footer-developed">
                        Developed By: <a href="https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/" className="footer-link">Aaditya B Chatterjee</a>
                    </p>
                </div>
                <div className="footer-links">
                    <h3 className="footer-heading">Quick Links</h3>
                    <ul>
                        <li><Link to="/about" className="footer-link">About</Link></li>
                        <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                        <li><Link to="/contact" className="footer-link">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h3 className="footer-heading">Contact Us</h3>
                    <div>Email: <a href="mailto:support@billing-abc.com" className="footer-link">support@billing-abc.com</a></div>
                    <div>Phone: <a href="tel:+919999999999" className="footer-link">+91-9999999999</a></div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {currentYear} Billing-ABC. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;