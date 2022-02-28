import axios from "axios";
import * as config from "../config/config";
import { getToken } from "./token";

const http = axios.create({
    baseURL: config.USER_SERVICE,
});

export const getAllContacts = async () => {
    return (
        http({
            method: "GET",
            url: "/contact",
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

export const getAllGroups = async () => {
    return (
        http({
            method: "GET",
            url: "/group",
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

export const fetchContacts = async () => {
    let contacts = [];
    let groups = [];

    const respContact = await getAllContacts();
    if (respContact.status === 200) {
        contacts = respContact.data.map(contact => {
            return {
                "id": contact.id,
                "name": `${contact.name} ${contact.lastname}`,
                "lastMessage": contact.id,
                "updatedAt": Date.now(),
                "isGroup": false
            }
        });

        const respGroup = await getAllGroups();
        if (respGroup.status === 200) {
            groups = respGroup.data.map(group => {
                return {
                    "id": group.id,
                    "name": group.name,
                    "lastMessage": group.description,
                    "updatedAt": Date.now(),
                    "isGroup": true
                }
            });
        }
    }

    return contacts.
            concat(groups).
            sort((c1, c2) => {
                if (c1.name < c2.name) {
                    return -1;
                }
                if (c1.name > c2.name) {
                    return 1;
                }
                return 0;
            });
};