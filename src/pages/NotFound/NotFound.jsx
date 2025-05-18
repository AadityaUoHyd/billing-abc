import './NotFound.css';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found-container">
            <div className="not-found-card">
                <div className="not-found-content">
                    <div className="not-found-icon">
                        <svg
                            width="80"
                            height="80"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#dc3545"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v.01" />
                            <path d="M12 8v4" />
                        </svg>
                    </div>
                    <h1 className="not-found-title">404</h1>
                    <h2 className="not-found-subtitle">Page Not Found</h2>
                    <p className="not-found-message">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <button
                        className="not-found-button"
                        onClick={() => navigate('/')}
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;