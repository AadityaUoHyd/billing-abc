import { assets } from '../../assets/assets.js';
import { FaShoppingCart, FaCreditCard, FaChartLine, FaHeadset, FaUserCircle } from 'react-icons/fa';
import './About.css';

const About = () => {
    const teamMembers = [
        {
            name: 'Aaditya B Chatterjee',
            role: 'Lead Developer',
            image: 'https://avatars.githubusercontent.com/u/57300089?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        },
        {
            name: 'Shruti Kumari',
            role: 'UI/UX Designer',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        },
        {
            name: 'Arvind Singh',
            role: 'Financial Analyst',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        },
        {
            name: 'Shreya Kiki',
            role: 'Customer Success Manager',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        },
        {
            name: 'Sameer Bhardawaj',
            role: 'Marketing Head',
            image: 'https://images.unsplash.com/photo-1733860474140-1734a8361e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        }
    ];

    const services = [
        {
            title: 'Order Management',
            text: 'Effortlessly create, track, and manage orders with our intuitive interface, ensuring accuracy and efficiency in your billing process.',
            icon: <FaShoppingCart />
        },
        {
            title: 'Payment Tracking',
            text: 'Monitor payment statuses in real-time, with support for multiple payment methods, to keep your financial operations transparent and up-to-date.',
            icon: <FaCreditCard />
        },
        {
            title: 'Analytics Dashboard',
            text: 'Gain insights into your business performance with our comprehensive analytics dashboard, featuring sales trends, order statistics, and more.',
            icon: <FaChartLine />
        },
        {
            title: 'Customer Support',
            text: 'Our dedicated support team is available 24/7 to assist with any billing queries, ensuring a smooth experience for you and your clients.',
            icon: <FaHeadset />
        }
    ];

    return (
        <div className="about-wrapper">
            <div className="about-container">
                <div className="about-hero">
                    <img src={assets.logo} alt="Billing-ABC Logo" className="about-logo" />
                    <h1 className="about-title">About Billing-ABC</h1>
                </div>
                <div className="about-card">
                    <h2 className="section-title">Our Mission</h2>
                    <p className="about-text">
                        At Billing-ABC, our mission is to simplify and streamline billing processes for businesses of all sizes. We provide intuitive tools to manage orders, track payments, and ensure seamless financial operations.
                    </p>
                    <h2 className="section-title">Our Vision</h2>
                    <p className="about-text">
                        We envision a world where businesses can focus on growth without the burden of complex billing systems. Billing-ABC aims to be the leading platform for efficient, transparent, and user-friendly billing solutions.
                    </p>
                    <h2 className="section-title">Our Team</h2>
                    <p className="about-text">
                        Our dedicated team of developers, designers, and financial experts work together to deliver a robust and reliable platform. Meet some of our key members:
                    </p>
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-member">
                                <div className="team-image-wrapper">
                                    <img src={member.image} alt={member.name} className="team-image" />
                                    <FaUserCircle className="team-icon" />
                                </div>
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                            </div>
                        ))}
                    </div>
                    <h2 className="section-title">Our Services</h2>
                    <div className="services-list">
                        {services.map((service, index) => (
                            <div key={index} className="service-item">
                                <div className="service-header">
                                    {service.icon}
                                    <h3 className="service-title">{service.title}</h3>
                                </div>
                                <p className="service-text">{service.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
