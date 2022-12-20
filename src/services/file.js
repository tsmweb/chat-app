import axios from "axios";
import * as config from "../config/config";
import * as helper from "../helpers/helper";
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
            if (res.status === 200) {
                return helper.readAsDataURL(res.data);
            }

            return null;
        }).catch(err => {
            // return err.response;
            return null;
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
            if (res.status === 200) {
                return helper.readAsDataURL(res.data);
            }

            return null;
        }).catch(err => {
            // return err.response;
            return null;
        })
    )
};

export const getMedia = async (uri) => {
    return (
        http({
            method: "GET",
            url: `/media/${uri}`,
            headers: {
                Authorization: `Bearer ${ getToken() }`
            },
            responseType: "blob"
        }).then(res => {
            if (res.status === 200) {
                return helper.readAsDataURL(res.data);
            }

            return null;
        }).catch(err => {
            // return err.response;
            return null;
        })
    )
};

export const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return (
        http({
            method: "POST",
            url: `/media`,
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