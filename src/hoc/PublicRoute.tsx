import { Navigate } from "react-router"
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }: any) => {
    const { currentUser } = useAuth();
    return (currentUser && currentUser.email) ?
        <Navigate
            to="/dashboard"
            replace
        /> : children;

}
export default PublicRoute
