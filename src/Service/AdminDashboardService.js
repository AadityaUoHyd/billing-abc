import axios from "axios";
import { toast } from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1.0";

export const fetchAdminDashboardData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Please log in to access the admin dashboard");
        throw new Error("No authentication token found");
    }

    if (token.split('.').length !== 3) {
        console.error("Invalid JWT format:", token);
        toast.error("Invalid authentication token. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        throw new Error("Invalid JWT format");
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(`${URL}/admin/admin-dashboard`, { headers });
        
        return response;
    } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                toast.error("Session expired or access denied. Redirecting to login...");
                localStorage.removeItem("token");
                localStorage.removeItem("role");
            } else if (error.response.status === 500) {
                toast.error("Server error: " + (error.response.data || "Unable to fetch dashboard data"));
            } else {
                toast.error("Failed to load dashboard data");
            }
        } else {
            toast.error("Network error. Please try again.");
        }
        throw error;
    }
};
