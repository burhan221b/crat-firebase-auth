import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const SignUp = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) return setError("Passwords do not match");
        try {
            setError(""); // Reset error if any
            setLoading(true); // Prevent user from spamming submit button
            await signup(emailRef.current?.value, passwordRef.current?.value);
            navigate("/dashboard", { replace: true });
        } catch (e) {
            setError("Failed to create an account");
        } finally {
            setLoading(false);
        }

    }
    return (
        <div id="SignUp">
            <div className="form-container">
                <h2>Sign Up</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={(e) => handleSubmit(e)} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required ref={emailRef} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" required ref={passwordRef} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" required ref={passwordConfirmRef} />
                    </div>
                    <div className="form-group">
                        <button disabled={loading} type="submit" className="btn btn-form btn-signup">Sign Up</button>
                    </div>


                </form>

            </div>
            <div className="div-already">Already have an account? <Link to="/login">Log in</Link></div>
        </div>
    )
}

export default SignUp
