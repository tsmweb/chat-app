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
            return err.response;
        })
    )
};

export const uploadUserPhotoService = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return (
        http({
            method: "POST",
            url: `/user`,
            data: formData,
            headers: {
                Authorization: `${ getToken() }`,
                "Content-Type": "multipart/form-data"
            },
        }).then(res => {
            return res;
        }).catch(err => {
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
            return err.response;
        })
    )
};
