import { Navigate, useLocation } from "react-router"
import { useAuth } from "../context/AuthContext";

// Reference on how it was done in V5 React Router
// const PrivateRoute = (props: { [x: string]: any; component: any; }): any => {
//     const { component: Component, ...rest } = props;
//     const { currentUser } = useAuth();
//     return (
//         <Routes>
//             <Route {...rest} render={(props: any) => {
//                 currentUser ?
//                     <Component {...props} />
//                     :
//                     <Navigate to="/login" />
//             }
//             } />
//         </Routes>
//     )
// }

// Reference V6: https://ui.dev/react-router-protected-routes-authentication/ 
const PrivateRoute = ({ children }: any) => {
    const { currentUser } = useAuth();
    const location = useLocation();
    console.log("location", location);
    return (currentUser && currentUser.email) ? children
        : <Navigate
            to="/login"
            replace
            state={{ path: location.pathname }}
        />;

}
export default PrivateRoute
