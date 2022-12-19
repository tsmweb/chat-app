import React, { createContext, useContext, useState } from "react";
import moment from "moment";
import useWebSocket from "react-use-websocket";
import * as cacheDB from "../services/cacheDB";
import * as config from "../config/config";
import { getToken } from "../services/token";
import { useAuth } from "./auth";
import { useContacts } from "./contact";

export const ContenType = {
    ACK: "ack",
    TEXT: "text",
    IMAGE: "image",
    VIDEO: "video",
    PDF: "pdf",
    STATUS: "status",
    INFO: "info",
    ERROR: "error"
};

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const { user } = useAuth();
    const { selectedContact, SetStatusContact, SetLastMessageContact } = useContacts();

    const { sendJsonMessage } = useWebSocket(config.CHAT_SERVICE, {
        share: true,
        queryParams: { "authorization": getToken() },
        shouldReconnect: (CloseEvent) => true,
        reconnectInterval: 3000,
        onOpen: () => console.log("Connected to WebSocket"),
        onError: (event) => console.error(event),
        onMessage: (event) => {
            if (event.data) {
                const message = JSON.parse(event.data);
                OnMessage(message);
            }
        }
    });

    const OnMessage = (message) => {
        (async () => {
            console.log(message);

            const objDate = new Date(message.date);

            if (message.content_type === ContenType.TEXT || 
                message.content_type === ContenType.IMAGE ||
                message.content_type === ContenType.VIDEO ||
                message.content_type === ContenType.PDF
            ) {
                let tag = message.to + message.from;
                if (message.group && message.group.trim() !== "") {
                    tag = message.group;
                }
                const hour = moment(new Date(message.date)).format("HH:mm");
                const date = moment(new Date(message.date)).format("YYYY-MM-DD");
                const timestamp = objDate.getTime();
                const ack = "sent";
                const date_ack = objDate.getTime();

                await AddMessage(
                    message.id, 
                    tag, 
                    message.from, 
                    message.to, 
                    message.group, 
                    message.content_type, 
                    message.content, 
                    hour, 
                    date, 
                    timestamp, 
                    ack, 
                    date_ack);
            } else if (message.content_type === ContenType.ACK) {
                let msg = await cacheDB.getMessage(message.id);
                if (msg) {
                    msg.ack = message.content;
                    msg.date_ack = message.date;
                } 
                await cacheDB.addMessage(msg);
            } else if (message.content_type === ContenType.STATUS) {
                await SetStatusContact(message.from, message.content);
            } else if (message.content_type === ContenType.ERROR ||
                       message.content_type === ContenType.INFO) {
                console.log(message);
            }
        })();
    };

    const LoadContactMessages = async (userID, contactID) => {
        const tag = userID+contactID;

        try {
            const messageList = await cacheDB.getAllContactMessages(tag); 
            setMessages(messageList);
        } catch(err) {
            console.log("[!] MessagesProvider.LoadContactMessages: ", err);
        }
    };

    const LoadGroupMessages = async (groupID) => {
        try {
            const messageList = await cacheDB.getAllGroupMessages(groupID); 
            setMessages(messageList);
        } catch(err) {
            console.log("[!] MessagesProvider.LoadGroupMessages: ", err);
        }
    };

    const AddMessage = async (
        id, tag, from, to, group, content_type, content, hour, date, timestamp, ack, date_ack
    ) => {
        const message = {
            id: id,
            tag: tag,
            from: from,
            to: to,
            group: group,
            content_type: content_type,
            content: content,
            hour: hour,
            date: date,
            timestamp: timestamp,
            ack: ack,
            date_ack: date_ack,
        };

        try {
            await cacheDB.addMessage(message);

            if (message.group && message.group.trim() !== "") {
                await updateGroupMessage(message);
            } else {
                await updateContactMessage(message);
            }
        } catch(err) {
            console.log("[!] MessagesProvider.AddMessage: ", err);
            throw "Não foi possível adicionar a mensagem!";
        }
    };

    const updateGroupMessage = async (message) => {
        if (selectedContact.id === message.group) {
            // refresh messages
            setMessages(prevMessages => {
                let newMessages = [...prevMessages];
                newMessages.push(message);
                return newMessages;
            });
        }

        await SetLastMessageContact(message.group, message.content, message.timestamp);
    };

    const updateContactMessage = async (message) => {
        if (selectedContact.id === message.from || selectedContact.id === message.to) {
            // refresh messages
            setMessages(prevMessages => {
                let newMessages = [...prevMessages];
                newMessages.push(message);
                return newMessages;
            });
        }

        const contactID = user.id === message.from ? message.to : message.from;
        await SetLastMessageContact(contactID, message.content, message.timestamp);
    };

    const SendMessage = (id, from, to, group, content_type, content, timestamp) => {
        const msg = {
            id: id,
            from: from,
            to: to,
            group: group,
            content_type: content_type,
            content: content,
            date: moment(new Date(timestamp)).format("YYYY-MM-DDTHH:mm:ssZ")
        };
        sendJsonMessage(msg, true);
    };

    const DeleteContactMessages = async (userID, contactID) => {
        const tag = userID+contactID;

        try {
            await cacheDB.deleteContactMessages(tag);
            setMessages([]);
        } catch(err) {
            console.log("[!] MessagesProvider.DeleteContactMessages: ", err);
            throw "Não foi possível limpar as mensagens!";
        }
    };

    const DeleteGroupMessages = async (groupID) => {
        try {
            await cacheDB.deleteGroupMessages(groupID);
            setMessages([]);
        } catch(err) {
            console.log("[!] MessagesProvider.DeleteGroupMessages: ", err);
            throw "Não foi possível limpar as mensagens!";
        }
    };

    return (
        <MessagesContext.Provider value={{
            messages,
            LoadContactMessages,
            LoadGroupMessages,
            AddMessage,
            SendMessage,
            DeleteContactMessages,
            DeleteGroupMessages,
        }}>
            { children }
        </MessagesContext.Provider>
    );
};

export function useMessages() {
    return useContext(MessagesContext);
};
