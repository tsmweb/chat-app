import axios from "axios";

const AUTH_SERVICE = "http://localhost:8081/v1";

const http = axios.create({
    baseURL: AUTH_SERVICE,
});

export const SignInService = async (id, password) => {
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
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    );
}

export const CreateAccountService = async (id, name, lastname, password) => {
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
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    );
}
