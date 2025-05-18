import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import { fetchActivityLogs } from "../../Service/ActivityService.js";
import './ActivityLog.css';

const ActivityLog = () => {
    const { auth } = useContext(AppContext);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLogs = async () => {
            setLoading(true);
            try {
                const response = await fetchActivityLogs();
                if (response.status === 200) {
                    setLogs(response.data);
                } else {
                    toast.error("Failed to load activity logs");
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load activity logs");
            } finally {
                setLoading(false);
            }
        };
        loadLogs();
    }, []);

    // Mock data as fallback
    const mockLogs = [
        { id: 1, timestamp: "2025-04-29 10:00", action: "Login", details: `User ${auth?.username} logged in` },
        { id: 2, timestamp: "2025-04-29 10:15", action: "Item Added", details: `User ${auth?.username} added item` },
        { id: 3, timestamp: "2025-04-29 11:00", action: "Logout", details: `User ${auth?.username} logged out` },
    ];

    return (
        <div className="activity-wrapper">
            <div className="activity-container">
                {loading ? (
                    <div className="activity-loading">
                        <div className="spinner"></div>
                        <span>Loading activity logs...</span>
                    </div>
                ) : (
                    <div className="activity-card">
                        <h2 className="section-title">Activity Log</h2>
                        <div className="activity-content">
                            <table className="activity-table">
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>Action</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(logs.length > 0 ? logs : mockLogs).map((log) => (
                                        <tr key={log.id}>
                                            <td>{log.timestamp}</td>
                                            <td>{log.action}</td>
                                            <td>{log.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityLog;