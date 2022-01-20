import axios from "axios";
import { getToken } from "./token";

const AUTH_SERVICE = "http://192.168.0.104:8081/v1";

const http = axios.create({
    baseURL: AUTH_SERVICE,
});

export const signInService = async (id, password) => {
    const login = {
        id: id,
        password: password
    };

    return (
        http({
            method: "POST",
            url: "/login",
            data: login,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    );
};

export const createAccountService = async (id, name, lastname, password) => {
    const user = {
        id: id,
        name: name,
        lastname: lastname,
        password: password
    };

    return (
        http({
            method: "POST",
            url: "/user",
            data: user,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    );
};

export const updateUserService = async (id, name, lastname) => {
    const user = {
        id: id,
        name: name,
        lastname: lastname,
    };

    return (
        http({
            method: "PUT",
            url: "/user",
            data: user,
            headers: {
                "Content-Type": "application/json",
                Authorization: `${ getToken() }`
            }
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    );
};

export const getUserService = async () => {
    return (
        http({
            method: "GET",
            url: "/user",
            headers: {
                Authorization: `${ getToken() }`
            }
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    );
};
