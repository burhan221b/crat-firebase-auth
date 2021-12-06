import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        setError("");
        try {
            await logout();
            navigate("/login", { replace: true })
        } catch (error) {
            console.error(error)
            setError("Failed to Logout");
        }
    }
    return (
        <div>
            <h1>Dashboard</h1>
            {error && <div className="error-msg">{error}</div>}
            <strong>Current User Email: {currentUser.email}</strong>
            <div className="button-group">
                <Link to="/update-profile"><button type="button" className="btn btn-updateProfile">Update Profile</button></Link>
            </div>
            <div className="button-group">
                <button onClick={handleLogout} type="submit" className="btn btn-login-out">Login Out</button>
            </div>
        </div>
    )
}

export default Dashboard
