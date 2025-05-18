import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import { updateUserSettings } from "../../Service/UserService.js";
import { assets } from "../../assets/assets.js";
import './Settings.css';

const Settings = () => {
    const { auth, setAuthData } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        username: auth?.username || "",
        email: auth?.email || "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("user", JSON.stringify(data));
        if (image) {
            formData.append("file", image);
        }
        try {
            const response = await updateUserSettings(formData);
            if (response.status === 200) {
                setAuthData({ ...auth, username: data.username, email: data.email });
                toast.success("Settings updated");
                setData((prev) => ({ ...prev, password: "" }));
                setImage(null);
            } else {
                toast.error("Failed to update settings");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-wrapper">
            <div className="settings-container">
                {loading ? (
                    <div className="settings-loading">
                        <div className="spinner"></div>
                        <span>Updating settings...</span>
                    </div>
                ) : (
                    <div className="settings-card">
                        <h2 className="section-title">Settings</h2>
                        <form onSubmit={onSubmitHandler}>
                            <div className="form-group">
                                <label className="form-label">Profile Image</label>
                                <div className="image-upload">
                                    <img
                                        src={image ? URL.createObjectURL(image) : assets.profile}
                                        alt="Profile Preview"
                                        className="image-preview"
                                    />
                                    <label htmlFor="image" className="image-upload-label">
                                        Change Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="form-input"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-input"
                                    placeholder="Enter username"
                                    onChange={onChangeHandler}
                                    value={data.username}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email (read-only)
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-input muted"
                                    placeholder="Enter email"
                                    onChange={onChangeHandler}
                                    value={data.email}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    New Password (optional)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-input"
                                    placeholder="Enter new password"
                                    onChange={onChangeHandler}
                                    value={data.password}
                                />
                            </div>
                            <button type="submit" className="form-button" disabled={loading}>
                                Save Changes
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;