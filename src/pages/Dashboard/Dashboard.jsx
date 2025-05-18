import './Dashboard.css';
import { useEffect, useState, useContext } from 'react'; // Add useContext
import { AppContext } from '../../context/AppContext.jsx'; // Import AppContext
import { fetchDashboardData } from '../../Service/Dashboard.js';
import toast from 'react-hot-toast';
import { FaMoneyBillWave, FaShoppingCart, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { auth } = useContext(AppContext); // Get auth from context
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadData = async () => {
        if (!auth.token) {
            toast.error('Please log in to access the dashboard');
            setTimeout(() => navigate('/login'), 1500);
            setLoading(false);
            return;
        }
        try {
            const response = await fetchDashboardData(auth.token);
            setData(response.data);
        } catch (error) {
            console.error('Failed to load dashboard:', error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                toast.error('Session expired or access denied. Redirecting to login...');
                setTimeout(() => navigate('/login'), 1500);
            } else {
                toast.error('Unable to view the data');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [auth.token]); // Depend on auth.token

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <span>Loading dashboard...</span>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="dashboard-error">
                <span>Failed to load dashboard data</span>
            </div>
        );
    }

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1 className="dashboard-title">{import.meta.env.VITE_SHOP_NAME} Dashboard</h1>
                </header>
                <div className="dashboard-content">
                    <div className="stats-sidebar">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FaMoneyBillWave />
                            </div>
                            <div className="stat-content">
                                <h3>Today's Sales</h3>
                                <p>₹{data.todaySales.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FaShoppingCart />
                            </div>
                            <div className="stat-content">
                                <h3>Today's Orders</h3>
                                <p>{data.todayOrderCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="main-content">
                        <div className="recent-orders-card">
                            <h3 className="recent-orders-title">
                                <FaHistory className="title-icon" />
                                Recent Orders
                            </h3>
                            <div className="orders-table-container">
                                <table className="orders-table">
                                    <thead>
                                        <tr>
                                            <th className="col-order-id">Order ID</th>
                                            <th className="col-customer">Customer</th>
                                            <th className="col-amount">Amount</th>
                                            <th className="col-payment">Payment</th>
                                            <th className="col-status">Status</th>
                                            <th className="col-time">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.recentOrders.map((order, index) => (
                                            <tr key={order.orderId} className={`table-row-${index}`}>
                                                <td className="col-order-id">{order.orderId}</td>
                                                <td className="col-customer">{order.customerName}</td>
                                                <td className="col-amount">₹{order.grandTotal.toFixed(2)}</td>
                                                <td className="col-payment">
                                                    <span className={`payment-method ${order.paymentMethod.toLowerCase()}`}>
                                                        {order.paymentMethod}
                                                    </span>
                                                </td>
                                                <td className="col-status">
                                                    <span className={`status-badge ${order.paymentDetails.status.toLowerCase()}`}>
                                                        {order.paymentDetails.status}
                                                    </span>
                                                </td>
                                                <td className="col-time">
                                                    {new Date(order.createdAt).toLocaleDateString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
