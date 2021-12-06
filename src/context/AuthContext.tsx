import { useState, useEffect, createContext, useContext } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword, User } from "firebase/auth";
// const auth = getAuth();
import { auth } from "../firebase";

interface AuthContextProps {
    [key: string]: any
}

// Create the context - The container which information and data will be passed between
const AuthContext = createContext({} as AuthContextProps);

// useAuth is a hook function will provide access to the AuthContext data. --> function to access the values in the Provider to Get/Manipulate data 
export const useAuth = () => useContext(AuthContext);

// The JSX Component which will wrap around other components to pass information and data. --> Provides wrapper around nested component tree to provide data.
export const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState({} as User);
    const [loading, setLoading] = useState(true); // By Default should be true b/c useEffect will check if current user is logged in or not
    const signup = async (email: string, password: string) => {
        // If you don't want to use firebase, then change method below with other signup method.
        // auth.createUserWithEmailAndPassword(email, password); // Older Firebase
        return await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log("Sign Up success", user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.error("Sign Up ERROR", error)
                throw error;
            });

    }

    const login = async (email: string, password: string) => {
        return await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log("Login success", user)
                setCurrentUser(user);
                return;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Login ERROR", error)
                throw error;
            });
    }

    const logout = async () => {
        return await signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Sign Out success")
            setCurrentUser({} as User)
        }).catch((error) => {
            // An error happened.
            console.error("Sign Out ERROR", error)
            throw error;
        });
    }

    const resetPassword = async (email: string) => {
        return await sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
                console.log("resetPassword success")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.error("resetPassword Failed");
                throw error;
            });
    }

    const updateUserEmail = async (email: string) => {
        return auth.currentUser ? await updateEmail(auth.currentUser, email).then(() => {
            // Email updated!
            // ...
            console.log("updateUserEmail success")
        }).catch((error) => {
            // An error occurred
            // ...
            console.error("updateUserEmail Failed")
            throw error;
        }) : null;
    }

    const updateUserPassword = async (newPassword: string) => {
        return auth.currentUser ? await updatePassword(auth.currentUser, newPassword).then(() => {
            // Update successful.
            console.log("updateUserPassword success")
        }).catch((error) => {
            // An error ocurred
            // ...
            console.error("updateUserPassword Failed")
            throw error;
        }) : null;
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                setCurrentUser(user); // Or you can use getAuth() and it will have auth.currentUser
            } else {
                // User is signed out
                // ...
            }
            setLoading(false);
        });
        return () => {

        }
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


