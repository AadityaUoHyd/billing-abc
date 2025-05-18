import './ManageUsers.css';
import UserForm from "../../components/UserForm/UserForm.jsx";
import UsersList from "../../components/UsersList/UsersList.jsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchUsers } from "../../Service/UserService.js";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true);
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Unable to fetch users");
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    if (loading) {
        return (
            <div className="users-loading">
                <div className="spinner"></div>
                <span>Loading users...</span>
            </div>
        );
    }

    return (
        <div className="users-wrapper">
            <div className="users-container">
                <div className="left-column">
                    <div className="form-card">
                        <h2 className="section-title">Add/Edit User</h2>
                        <div className="form-content">
                            <UserForm setUsers={setUsers} />
                        </div>
                    </div>
                </div>
                <div className="right-column">
                    <div className="list-card">
                        <h2 className="section-title">Users List</h2>
                        <div className="list-content">
                            <UsersList users={users} setUsers={setUsers} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;