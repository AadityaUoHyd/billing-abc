import { useState } from 'react';
import toast from 'react-hot-toast';
import './Contact.css';
import { assets } from '../../assets/assets.js';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (!formData.name.trim()) {
            toast.error('Name is required');
            setLoading(false);
            return;
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error('Valid email is required');
            setLoading(false);
            return;
        }
        if (!formData.message.trim()) {
            toast.error('Message is required');
            setLoading(false);
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="contact-wrapper">
            <div className="contact-container">
                
                {loading ? (
                    <div className="contact-loading">
                        <div className="spinner"></div>
                        <span>Sending message...</span>
                    </div>
                ) : (
                    <div className="contact-card">
                        <div className="about-hero">
                                    <img src={assets.logo} alt="Billing-ABC Logo" className="about-logo" />
                                    <h1 className="about-title">Connect to Billing-ABC</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-input"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-input"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    className="form-input"
                                    placeholder="Enter your message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="form-button" disabled={loading}>
                                Send Message
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contact;