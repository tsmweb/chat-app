import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import * as authService from "../services/auth";
import { setToken, clearSessionStorage } from "../services/token";

const AuthContext = createContext({
    signed: false,
    user: null,
    Login: null,
    Logout: null,
    Refresh: null
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
        const resp = await authService.signIn(id, password);
        if (resp.status === 200) {
            setToken(resp.data.token);

            const status = await Refresh();
            if (status !== 200) {
                return status;
            }
        }

        return resp.status
    };

    const Refresh = async () => {
        const resp = await authService.getUser();
        if (resp.status === 200) {
            const profile = {
                "id": resp.data.id,
                "name": `${resp.data.name} ${resp.data.lastname}`,
                "description": resp.data.id
            };
            
            setUser(profile);
            sessionStorage.setItem("user", JSON.stringify(profile));
        }

        return resp.status;
    };

    const Logout = () => {
        setUser(null);
        clearSessionStorage();
    };

    return (
        <AuthContext.Provider 
            value={{ signed: user != null, user, Login, Logout, Refresh }}
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
    let location = useLocation();

    if (!auth.signed) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
};