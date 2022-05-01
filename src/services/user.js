import axios from "axios";
import * as config from "../config/config";
import { getToken } from "./token";

const http = axios.create({
    baseURL: config.USER_SERVICE,
});

export const addContact = async (id, name, lastname) => {
    const contact = {
        id: id,
        name: name,
        lastname: lastname,
    };

    return (
        http({
            method: "POST",
            url: "/contact",
            data: contact,
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

export const updateContact = async (id, name, lastname) => {
    const contact = {
        id: id,
        name: name,
        lastname: lastname,
    };

    return (
        http({
            method: "PUT",
            url: "/contact",
            data: contact,
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

export const deleteContact = async (id) => {
    return (
        http({
            method: "DELETE",
            url: `/contact/${id}`,
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

export const createGroup = async (name, description) => {
    const group = {
        name: name,
        description: description,
    };

    return (
        http({
            method: "POST",
            url: "/group",
            data: group,
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

export const updateGroup = async (id, name, description) => {
    const group = {
        id: id,
        name: name,
        description: description,
    };

    return (
        http({
            method: "PUT",
            url: "/group",
            data: group,
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

export const deleteGroup = async (id) => {
    return (
        http({
            method: "DELETE",
            url: `/group/${id}`,
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

export const addMemberToGroup = async (groupID, userID, admin) => {
    const member = {
        groupID: groupID,
        userID: userID,
        admin: admin
    };

    return (
        http({
            method: "POST",
            url: "/group/member",
            data: member,
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

export const updateGroupMember = async (groupID, userID, admin) => {
    const member = {
        groupID: groupID,
        userID: userID,
        admin: admin
    };

    return (
        http({
            method: "PUT",
            url: "/group/member",
            data: member,
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

export const removeGroupMember = async (groupID, userID) => {
    return (
        http({
            method: "DELETE",
            url: `/group/member/${groupID}/${userID}`,
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

export const getGroup = async (groupID) => {
    return (
        http({
            method: "GET",
            url: `/group/${groupID}`,
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
                "name": contact.name,
                "lastname": contact.lastname,
                "lastMessage": contact.id,
                "unreadMessages": 0,
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
                    "lastname": "",
                    "lastMessage": group.description,
                    "unreadMessages": 0,
                    "updatedAt": Date.now(),
                    "isGroup": true
                }
            });
        }
    }

    if (contacts.length > 0 || groups.length > 0) {
        return contacts.concat(groups).sort((c1, c2) => {
            if (c1.name < c2.name) {
                return -1;
            }
            if (c1.name > c2.name) {
                return 1;
            }
            return 0;
        });
    }

    return [];
};
