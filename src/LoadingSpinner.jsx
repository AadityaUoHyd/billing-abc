import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <div className="loading-spinner-container">
            <div className="spinner"></div>
            <span className="loading-message">{message}</span>
        </div>
    );
};

export default LoadingSpinner;