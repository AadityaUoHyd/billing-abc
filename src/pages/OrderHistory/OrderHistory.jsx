import './OrderHistory.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { latestOrders } from '../../Service/OrderService.js';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(20); // Default to 20
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await latestOrders();
                setOrders(response.data);
            } catch (error) {
                console.error(error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [navigate]);

    // Reset to page 1 when ordersPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [ordersPerPage]);

    // Calculate total pages and current page orders
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Handle page navigation
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Handle records per page change
    const handleOrdersPerPageChange = (event) => {
        setOrdersPerPage(Number(event.target.value));
    };

    const formatItems = (items) => {
        return items.map((item) => `${item.name} x ${item.quantity}`).join(', ');
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) {
        return (
            <div className="history-loading">
                <div className="spinner"></div>
                <span>Loading orders...</span>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="history-empty">
                <span>No orders found</span>
            </div>
        );
    }

    return (
        <div className="history-wrapper">
            <div className="history-container">
                <div className="history-card">
                    <div className="history-header">
                        <h2 className="section-title">All Orders</h2>
                        <div className="records-per-page">
                            <label htmlFor="ordersPerPage">Records per page: </label>
                            <select
                                id="ordersPerPage"
                                value={ordersPerPage}
                                onChange={handleOrdersPerPageChange}
                                className="records-select"
                            >
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="history-table table table-striped table-hover">
                            <thead className="table-header bg-head">
                                <tr className="bg-head">
                                    <th className="col-serial text-primary">S.No</th>
                                    <th className="col-order-id text-primary">Order Id</th>
                                    <th className="col-customer text-primary">Customer</th>
                                    <th className="col-items text-primary">Items</th>
                                    <th className="col-total text-primary">Total</th>
                                    <th className="col-payment text-primary">Payment</th>
                                    <th className="col-status text-primary">Status</th>
                                    <th className="col-date text-primary">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order, index) => (
                                    <tr key={order.orderId} className={`table-row-${index}`}>
                                        <td className="col-serial">
                                            {(currentPage - 1) * ordersPerPage + index + 1}
                                        </td>
                                        <td className="col-order-id">{order.orderId}</td>
                                        <td className="col-customer">
                                            {order.customerName} <br />
                                            <small className="text-muted">{order.phoneNumber}</small>
                                        </td>
                                        <td className="col-items">{formatItems(order.items)}</td>
                                        <td className="col-total">₹{order.grandTotal}</td>
                                        <td className="col-payment">{order.paymentMethod}</td>
                                        <td className="col-status">
                                            <span
                                                className={`badge ${
                                                    order.paymentDetails?.status === 'COMPLETED'
                                                        ? 'status-completed'
                                                        : 'status-pending'
                                                }`}
                                            >
                                                {order.paymentDetails?.status || 'PENDING'}
                                            </span>
                                        </td>
                                        <td className="col-date">{formatDate(order.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 1 && (
                        <div className="pagination-container">
                            <button
                                className="pagination-btn"
                                onClick={() => goToPage(1)}
                                disabled={currentPage === 1}
                                aria-label="First page"
                            >
                                First
                            </button>
                            <button
                                className="pagination-btn"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                aria-label="Previous page"
                            >
                                Previous
                            </button>
                            <span className="pagination-info">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="pagination-btn"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                aria-label="Next page"
                            >
                                Next
                            </button>
                            <button
                                className="pagination-btn"
                                onClick={() => goToPage(totalPages)}
                                disabled={currentPage === totalPages}
                                aria-label="Last page"
                            >
                                Last
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;