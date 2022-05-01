import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import * as authService from "../services/auth";
import * as fileService from "../services/file";
import { setToken, clearSessionStorage } from "../services/token";

const AuthContext = createContext();

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
                "name": resp.data.name,
                "lastname": resp.data.lastname,
                "description": resp.data.id,
                "updateAt": Date.now()
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

    const UpdateUser = async (id, name, lastname) => {
        const resp = await authService.updateUser(id, name, lastname);
        if (resp.status === 200) {
            try {
                await Refresh();
            } catch(err) {
                console.log("[!] AuthProvider.UpdateUser: ", err);
            }
        } else {
            console.log("[!] AuthProvider.UpdateUser: ", resp.data.error_message);
            throw "Não foi possível atualizar o usuário!";
        }
    };

    const ChangeImage = async (file) => {
        const resp = await fileService.uploadUserPhoto(file);
        if (resp.status === 201) {
            try {
                await Refresh();
            } catch(err) {
                console.log("[!] AuthProvider.ChangeImage: ", err);
            }
        } else {
            console.log("[!] AuthProvider.ChangeImage: ", resp.data.error_message);
            throw "Não foi possível alterar a imagem do usuário!";
        }
    };

    return (
        <AuthContext.Provider value={{ 
            signed: user != null, 
            user, 
            Login, 
            Logout, 
            Refresh,
            UpdateUser,
            ChangeImage 
        }}>
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