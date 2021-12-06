import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
    const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) return setError("Passwords do not match");
        setError(""); // Reset error if any
        setLoading(true); // Prevent user from spamming submit button
        // await updateProfile(emailRef.current?.value, passwordRef.current?.value);
        const PROMISES = [];
        if (emailRef.current?.value !== currentUser.email) {
            PROMISES.push(updateUserEmail(emailRef.current?.value))
        }
        if (passwordRef.current?.value) {
            PROMISES.push(updateUserPassword(passwordRef.current?.value))
        }
        await Promise.all(PROMISES).then(() => {
            alert("Success, will redirect back to dashboard");
            navigate("/dashboard", { replace: true });
        }).catch(e => {
            console.error(e)
            setError("Failed to create an account");
        }).finally(() => {
            setLoading(false);
        });

    }
    return (
        <div id="UpdateProfile">
            <div className="form-container">
                <h2>Update Profile</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit} className="updateProfile-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required ref={emailRef} defaultValue={currentUser.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" ref={passwordRef} placeholder="Leave blank if you want to keep the same" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" ref={passwordConfirmRef} placeholder="Leave blank if you want to keep the same" />
                    </div>
                    <div className="form-group">
                        <button disabled={loading} type="submit" className="btn btn-form btn-updateProfile">Update</button>
                    </div>
                </form>
            </div>
            <div className="div-already"><Link to="/dashboard">Cancel</Link></div>
        </div>
    )
}

export default UpdateProfile
