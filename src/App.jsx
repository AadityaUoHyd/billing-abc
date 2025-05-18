import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext.jsx";
import  {Toaster}  from "react-hot-toast";
import Menubar from "./components/Menubar/Menubar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import Order from "./pages/Order/Order.jsx";
import Login from "./pages/Login/Login.jsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import ActivityLog from "./pages/ActivityLog/ActivityLog.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import Privacy from "./pages/Privacy/Privacy.jsx";
import './App.css';

const App = () => {
    const location = useLocation();
    const { auth } = useContext(AppContext);

    const LoginRoute = ({ element }) => {
        if (auth.token) {
            return <Navigate to="/dashboard" replace />;
        }
        return element;
    };

    const ProtectedRoute = ({ element, allowedRoles }) => {
        if (!auth.token) {
            return <Navigate to="/login" replace />;
        }

        if (allowedRoles && !allowedRoles.includes(auth.role)) {
            return <Navigate to="/dashboard" replace />;
        }

        return element;
    };

    return (
        <div className="app-wrapper min-h-screen flex flex-col">
            {location.pathname !== "/login" && location.pathname !== "/" 
            && location.pathname !== "/holidays" && location.pathname !== "/about" && location.pathname !== "/contact"
             && <Menubar />}
            <main className="app-content flex-1 ">
                <Toaster />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/order" element={<Order />} />

                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/activity" element={<ActivityLog />} />

                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Admin only routes */}
                    <Route
                        path="/category"
                        element={<ProtectedRoute element={<ManageCategory />} allowedRoles={["ROLE_ADMIN"]} />}
                    />
                    <Route
                        path="/users"
                        element={<ProtectedRoute element={<ManageUsers />} allowedRoles={["ROLE_ADMIN"]} />}
                    />
                    <Route
                        path="/items"
                        element={<ProtectedRoute element={<ManageItems />} allowedRoles={["ROLE_ADMIN"]} />}
                    />
                    <Route
                        path="/admin-dashboard"
                        element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["ROLE_ADMIN"]} />}
                    />
                    <Route path="/login" element={<LoginRoute element={<Login />} />} />
                    
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;