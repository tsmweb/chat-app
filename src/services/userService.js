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

export const fetchContactsService = async () => {
    let contacts = [];
    let groups = [];

    const respContact = await getAllContactsService();
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

        const respGroup = await getAllGroupsService();
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