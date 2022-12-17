import React, { createContext, useContext, useState } from "react";
import * as cacheDB from "../services/cacheDB";

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

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
        id, tag, from, to, group, content_type, content, hour, date, timestamp, ack, date_ack,
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
            // refresh messages
            setMessages(prevMessages => {
                let newMessages = [...prevMessages];
                newMessages.push(message);
                return newMessages;
            });
        } catch(err) {
            console.log("[!] MessagesProvider.AddMessage: ", err);
            throw "Não foi possível adicionar a mensagem!";
        }
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
