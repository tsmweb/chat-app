import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { signInService, getUserService } from "../services/authService";
import { setToken, clearSessionStorage } from "../services/token";

const AuthContext = createContext({
    signed: false,
    user: null,
    Login: null,
    Logout: null
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storageUser = sessionStorage.getItem("user");
        const storageToken = sessionStorage.getItem("token");

        if (storageToken && storageUser) {
            setUser(JSON.parse(storageUser));
        }
    }, []);

    const Login = async (id, password) => {
        const respSignIn = await signInService(id, password);
        if (respSignIn.status === 200) {
            setToken(respSignIn.data.token);

            const respUser = await getUserService();
            if (respUser.status === 200) {
                const profile = {
                    "id": respUser.data.id,
                    "name": `${respUser.data.name} ${respUser.data.lastname}`,
                    "description": respUser.data.id
                };
                
                setUser(profile);
                sessionStorage.setItem("user", JSON.stringify(profile));
            } else {
                return respUser.status;
            }
        }

        return respSignIn.status
    };

    const Logout = () => {
        setUser(null);
        clearSessionStorage();
    };

    return (
        <AuthContext.Provider 
            value={{ signed: user != null, user, Login, Logout }}
        >
            { children }
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
    let auth = useAuth();

    if (!auth.signed) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};