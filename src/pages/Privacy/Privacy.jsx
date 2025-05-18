import './Privacy.css';

const Privacy = () => {
    return (
        <div className="privacy-wrapper">
            <div className="privacy-container">
                <div className="privacy-hero">
                    <h1 className="privacy-title">Privacy Policy</h1>
                </div>
                <div className="privacy-card">
                    <h2 className="section-title">Introduction</h2>
                    <p className="privacy-text">
                        At Billing-ABC, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our billing and financial management platform. By using our services, you agree to the terms outlined in this policy.
                    </p>

                    <h2 className="section-title">Information We Collect</h2>
                    <p className="privacy-text">
                        We collect the following types of information:
                    </p>
                    <ul className="privacy-list">
                        <li><strong>Personal Information</strong>: Name, email address, phone number, and billing address provided during account creation or order processing.</li>
                        <li><strong>Payment Information</strong>: Payment method details (e.g., credit card numbers, bank account information) processed through secure third-party payment gateways.</li>
                        <li><strong>Usage Data</strong>: Information about how you interact with our platform, such as IP address, browser type, and pages visited.</li>
                        <li><strong>Cookies and Tracking Data</strong>: Data collected via cookies to enhance user experience and analyze platform performance.</li>
                    </ul>

                    <h2 className="section-title">How We Use Your Information</h2>
                    <p className="privacy-text">
                        We use your information to:
                    </p>
                    <ul className="privacy-list">
                        <li>Process and manage orders and payments.</li>
                        <li>Provide customer support and respond to inquiries.</li>
                        <li>Improve our platform’s functionality and user experience.</li>
                        <li>Send transactional emails, such as order confirmations and payment receipts.</li>
                        <li>Analyze usage trends to enhance our services.</li>
                    </ul>

                    <h2 className="section-title">Data Sharing</h2>
                    <p className="privacy-text">
                        We may share your information with:
                    </p>
                    <ul className="privacy-list">
                        <li><strong>Third-Party Service Providers</strong>: Payment processors (e.g., Razorpay), hosting providers, and analytics tools that help us operate our platform.</li>
                        <li><strong>Legal Authorities</strong>: When required by law or to protect our rights and safety.</li>
                        <li><strong>Business Transfers</strong>: In the event of a merger, acquisition, or sale of assets, your data may be transferred to the new entity.</li>
                    </ul>
                    <p className="privacy-text">
                        We do not sell or rent your personal information to third parties for marketing purposes.
                    </p>

                    <h2 className="section-title">Data Security</h2>
                    <p className="privacy-text">
                        We implement industry-standard security measures, including encryption and secure servers, to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                    </p>

                    <h2 className="section-title">Cookies and Tracking</h2>
                    <p className="privacy-text">
                        We use cookies to:
                    </p>
                    <ul className="privacy-list">
                        <li>Remember your preferences and login information.</li>
                        <li>Track platform usage for analytics purposes.</li>
                        <li>Enhance your browsing experience.</li>
                    </ul>
                    <p className="privacy-text">
                        You can manage cookie preferences through your browser settings.
                    </p>

                    <h2 className="section-title">Your Rights</h2>
                    <p className="privacy-text">
                        You have the right to:
                    </p>
                    <ul className="privacy-list">
                        <li>Access the personal information we hold about you.</li>
                        <li>Request corrections to inaccurate or incomplete data.</li>
                        <li>Request deletion of your data, subject to legal obligations.</li>
                        <li>Opt out of non-essential communications, such as promotional emails.</li>
                    </ul>
                    <p className="privacy-text">
                        To exercise these rights, contact us at the details below.
                    </p>

                    <h2 className="section-title">Changes to This Policy</h2>
                    <p className="privacy-text">
                        We may update this Privacy Policy to reflect changes in our practices or legal requirements. Updates will be posted on this page, and we will notify you via email or platform announcements for significant changes.
                    </p>

                    <h2 className="section-title">Contact Us</h2>
                    <p className="privacy-text">
                        If you have questions or concerns about this Privacy Policy, please contact us at:
                    </p>
                    <p className="privacy-text">
                        <strong>Email</strong>: privacy@billing-abc.com<br />
                        <strong>Address</strong>: Billing-ABC, 123 Business Avenue, Suite 100, City, Country
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
