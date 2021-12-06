import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const emailRef = useRef<HTMLInputElement | null>(null);
    const { resetPassword, } = useAuth();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            setMessage(""); // Success message
            setError(""); // Reset error if any
            setLoading(true); // Prevent user from spamming submit button
            await resetPassword(emailRef.current?.value);
            setMessage("Check your inbox for further instructions")
        } catch (e) {
            setError("Failed to reset password");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div id="ForgotPassword">
            <div className="form-container">
                <h2>Password Reset</h2>
                {error && <div className="error-msg">{error}</div>}
                {message && <div className="resetPassword-msg">{message}</div>}
                <form onSubmit={handleSubmit} className="forgotPassword-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required ref={emailRef} />
                    </div>
                    <div className="form-group">
                        <button disabled={loading} type="submit" className="btn btn-form btn-forgotPassword">Password Reset</button>
                        <div className="div-already"><Link to="/login">Have Password?</Link></div>
                    </div>
                </form>
            </div>
            <div className="div-already">Need an account? <Link to="/signup">Sign Up</Link></div>
        </div>
    )
}

export default ForgotPassword;
