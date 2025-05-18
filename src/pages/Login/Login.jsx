import './Login.css';
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { login } from "../../Service/AuthService.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import logo from '../../assets/logo.png';

const Login = () => {
    const { setAuthData } = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(data);
            if (response.status === 200) {
                toast.success("Login successful");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                setAuthData(response.data.token, response.data.role);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
            toast.error("Email/Password Invalid");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-background">
            <div className="login-card">
                <div className="login-card-body">
                    <div className="text-center mb-4">
                        <img src={logo} alt="Company Logo" className="login-logo" />
                        <h1 className="login-title">Log In</h1>
                        <p className="login-subtitle">
                            Access your account to manage your services
                        </p>
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label general-text">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="aadi@gmail.com"
                                className="form-control"
                                onChange={onChangeHandler}
                                value={data.email}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label general-text">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="form-control"
                                onChange={onChangeHandler}
                                value={data.password}
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mt-3"
                            disabled={loading}
                        >
                            {loading && (
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                            {loading ? "Logging In..." : "Log In"}
                        </button>
                        <div className="text-end mt-3">
                            <a href="#" className="forgot-password-link">
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;