import axios from "axios";
import * as config from "../config/config";
import { getToken } from "./token";

const http = axios.create({
    baseURL: config.AUTH_SERVICE,
});

export const signIn = async (id, password) => {
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

export const createAccount = async (id, name, lastname, password) => {
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

export const updateUser = async (id, name, lastname) => {
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
                Authorization: `Bearer ${ getToken() }`
            }
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    );
};

export const getUser = async () => {
    return (
        http({
            method: "GET",
            url: "/user",
            headers: {
                Authorization: `Bearer ${ getToken() }`
            }
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    );
};
