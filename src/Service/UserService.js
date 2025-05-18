import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1.0";

export const addUser = async (user) => {
   return await axios.post(`${URL}/admin/register`, user, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const deleteUser = async (id) => {
    return await axios.delete(`${URL}/admin/users/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const fetchUsers = async () => {
    return await axios.get(`${URL}/admin/users`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const updateUserSettings = async (data) => {
    const token = localStorage.getItem("token");
    return await axios.put(`${URL}/users/settings`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
