import axios from "axios";
import * as config from "../config/config";
import { getToken } from "./token";

const http = axios.create({
    baseURL: config.FILE_SERVICE,
});

export const getUserPhoto = async (userID) => {
    return (
        http({
            method: "GET",
            url: `/user/${userID}`,
            headers: {
                Authorization: `Bearer ${ getToken() }`
            },
            responseType: "blob"
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    )
};

export const uploadUserPhoto = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return (
        http({
            method: "POST",
            url: `/user`,
            data: formData,
            headers: {
                Authorization: `Bearer ${ getToken() }`,
                "Content-Type": "multipart/form-data"
            },
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    )
};

export const getGroupPhoto = async (groupID) => {
    return (
        http({
            method: "GET",
            url: `/group/${groupID}`,
            headers: {
                Authorization: `Bearer ${ getToken() }`
            },
            responseType: "blob"
        }).then(res => {
            return res;
        }).catch(err => {
            return err.response;
        })
    )
};
