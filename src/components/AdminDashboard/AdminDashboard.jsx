import './AdminDashboard.css';
import { useEffect, useState, useRef } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchAdminDashboardData } from '../../Service/AdminDashboardService.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timePeriod, setTimePeriod] = useState('monthly');
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please log in to access the admin dashboard");
                navigate('/login');
                return;
            }

            try {
                const response = await fetchAdminDashboardData();
                setData(response.data);
            } catch (error) {
                console.error("AdminDashboard: Error:", error);
                // Error handling moved to AdminDashboardService.js
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [navigate]);

    const getChartData = () => {
        if (!data) return { categoryData: {}, salesData: {} };

        const categoryData = {
            labels: data.categoryStats.map(stat => stat.name),
            datasets: [
                {
                    label: 'Orders by Category',
                    data: data.categoryStats.map(stat => stat.orders),
                    backgroundColor: ['#2dd4bf', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'],
                    hoverOffset: 20,
                },
                {
                    label: 'Sales by Category (₹)',
                    data: data.categoryStats.map(stat => stat.sales),
                    backgroundColor: ['#2dd4bf', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'],
                    hoverOffset: 20,
                    hidden: true,
                },
            ],
        };

        const salesData = {
            labels: data.salesByPeriod[timePeriod].labels,
            datasets: [
                {
                    label: 'Items Sold',
                    data: data.salesByPeriod[timePeriod].itemsSold,
                    backgroundColor: '#2dd4bf',
                    yAxisID: 'y',
                },
                {
                    label: 'Revenue (₹)',
                    data: data.salesByPeriod[timePeriod].revenue,
                    backgroundColor: '#10b981',
                    yAxisID: 'y1',
                },
            ],
        };

        return { categoryData, salesData };
    };

    const { categoryData, salesData } = getChartData();

    const pieOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#e5e7eb',
                    font: { family: 'Inter', size: 12 },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(45, 59, 85, 0.9)',
                titleFont: { family: 'Inter' },
                bodyFont: { family: 'Inter' },
            },
        },
        maintainAspectRatio: false,
    };

    const barOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#e5e7eb',
                    font: { family: 'Inter', size: 12 },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(45, 59, 85, 0.9)',
                titleFont: { family: 'Inter' },
                bodyFont: { family: 'Inter' },
            },
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                title: { display: true, text: 'Items Sold', color: '#e5e7eb', font: { family: 'Inter' } },
                grid: { borderColor: '#2dd4bf' },
                ticks: { color: '#e5e7eb', font: { family: 'Inter' } },
            },
            y1: {
                type: 'linear',
                position: 'right',
                title: { display: true, text: 'Revenue (₹)', color: '#e5e7eb', font: { family: 'Inter' } },
                grid: { drawOnChartArea: false },
                ticks: { color: '#e5e7eb', font: { family: 'Inter' } },
            },
            x: {
                title: { display: true, text: timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1), color: '#e5e7eb', font: { family: 'Inter' } },
                grid: { borderColor: '#2dd4bf' },
                ticks: { color: '#e5e7eb', font: { family: 'Inter' } },
            },
        },
        maintainAspectRatio: false,
    };

    const handleTimePeriodChange = (event) => {
        setTimePeriod(event.target.value);
    };

    const exportChart = (chartRef, filename) => {
        if (chartRef.current) {
            const link = document.createElement('a');
            link.href = chartRef.current.toBase64Image();
            link.download = filename;
            link.click();
            toast.success(`Exported ${filename}`);
        }
    };

    if (loading) {
        return (
            <div className="admin-dashboard-loading">
                <div className="spinner"></div>
                <span>Loading dashboard...</span>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="admin-dashboard-error">
                <span>Failed to load dashboard data</span>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-wrapper">
            <div className="admin-dashboard-container">
                <header className="admin-dashboard-header">
                    <h1 className="admin-dashboard-title">Admin Analytics Dashboard</h1>
                    <div className="time-period-selector">
                        <label htmlFor="timePeriod">Time Period: </label>
                        <select
                            id="timePeriod"
                            value={timePeriod}
                            onChange={handleTimePeriodChange}
                            className="time-period-select"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </header>
                <div className="admin-dashboard-content">
                    <div className="chart-card">
                        <h3 className="chart-title">Orders & Sales by Category</h3>
                        <div className="chart-wrapper">
                            <Pie ref={pieChartRef} data={categoryData} options={pieOptions} />
                        </div>
                        <button
                            className="export-btn"
                            onClick={() => exportChart(pieChartRef, 'category-pie-chart.png')}
                        >
                            <FaDownload className="export-icon" />
                            Export Chart
                        </button>
                    </div>
                    <div className="chart-card">
                        <h3 className="chart-title">Sales Analysis</h3>
                        <div className="chart-wrapper">
                            <Bar ref={barChartRef} data={salesData} options={barOptions} />
                        </div>
                        <button
                            className="export-btn"
                            onClick={() => exportChart(barChartRef, 'sales-bar-chart.png')}
                        >
                            <FaDownload className="export-icon" />
                            Export Chart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;