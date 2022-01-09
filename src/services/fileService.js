import axios from "axios";
import { getToken } from "./token";

const FILE_SERVICE = "http://192.168.0.104:8083/v1";

const http = axios.create({
    baseURL: FILE_SERVICE,
});

export const getUserPhotoService = async (userID) => {
    return (
        http({
            method: "GET",
            url: `/user/${userID}`,
            headers: {
                Authorization: `${ getToken() }`
            },
            responseType: "blob"
        }).then(res => {
            return res;
        }).catch(err => {
            console.log("Error: " + err.response);
            return err.response;
        })
    )
};

export const getGroupPhotoService = async (groupID) => {
    return (
        http({
            method: "GET",
            url: `/group/${groupID}`,
            headers: {
                Authorization: `${ getToken() }`
            },
            responseType: "blob"
        }).then(res => {
            return res;
        }).catch(err => {
            console.log("Error: " + err.response);
            return err.response;
        })
    )
};