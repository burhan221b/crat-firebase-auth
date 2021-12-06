import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            setError(""); // Reset error if any
            setLoading(true); // Prevent user from spamming submit button
            await login(emailRef.current?.value, passwordRef.current?.value);
            navigate((state ? state.path : null) || "/dashboard", { replace: true });
        } catch (e) {
            console.error(e)
            setError("Failed to sign in");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div id="Login">
            <div className="form-container">
                <h2>Login</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required ref={emailRef} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" required ref={passwordRef} />
                    </div>
                    <div className="form-group">
                        <button disabled={loading} type="submit" className="btn btn-form btn-login">Login</button>
                        <div className="div-already"><Link to="/forgot-password">Forgot Password?</Link></div>
                    </div>

                </form>

            </div>
            <div className="div-already">Need an account? <Link to="/signup">Sign Up</Link></div>
        </div>
    )
}

export default Login;
