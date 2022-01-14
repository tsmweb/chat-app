import axios from "axios";
import { getToken } from "./token";

const USER_SERVICE = "http://192.168.0.104:8082/v1";

const http = axios.create({
    baseURL: USER_SERVICE,
});

export const getAllContactsService = async () => {
    return (
        http({
            method: "GET",
            url: "/contact",
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

export const getAllGroupsService = async () => {
    return (
        http({
            method: "GET",
            url: "/group",
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