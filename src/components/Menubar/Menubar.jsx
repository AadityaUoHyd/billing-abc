import './Menubar.css';
import { assets } from "../../assets/assets.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const Menubar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthData, auth } = useContext(AppContext);
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuthData(null, null);
        navigate("/login");
    }

    const isActive = (path) => {
        return location.pathname === path;
    }

    const isAdmin = auth.role === "ROLE_ADMIN";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <a className="navbar-brand" href="#">
                <img src={assets.logo} alt="Logo" className="navbar-logo" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse p-1" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4">
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/order') ? 'active' : ''}`} to="/order">Order</Link>
                    </li>
                    {
                        isAdmin && (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/items') ? 'active' : ''}`} to="/items">Manage-Items</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/category') ? 'active' : ''}`} to="/category">Manage-Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/users') ? 'active' : ''}`} to="/users">Manage-Users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/admin-dashboard') ? 'active' : ''}`} to="/admin-dashboard">Admin-Dashboard</Link>
                                </li>
                            </>
                        )
                    }
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/orders') ? 'active' : ''}`} to="/orders">Order-History</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown profile-dropdown">
                        <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={assets.profile} alt="Profile" className="profile-img" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li>
                                <a href="/settings" className="dropdown-item">Settings</a>
                            </li>
                            <li>
                                <a href="/activity" className="dropdown-item">Activity Log</a>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <a href="#!" className="dropdown-item logout-item" onClick={logout}>Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Menubar;