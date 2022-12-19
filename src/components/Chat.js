import React, { useEffect } from "react";
import Balloon from "./Balloon";
import { useAuth } from "../contexts/auth";
import { useContacts } from "../contexts/contact";
import { useMessages } from "../contexts/message";

const Chat = ({ className }) => {
    const { user } = useAuth();
    const { selectedContact } = useContacts();
    const { messages, LoadContactMessages, LoadGroupMessages, } = useMessages();

    useEffect(() => {
        if (selectedContact === null) {
            return
        }

        (async () => {
            if (selectedContact.isGroup) {
                await LoadGroupMessages(selectedContact.id);
            } else {
                await LoadContactMessages(user.id, selectedContact.id);
            }
        })();
        // eslint-disable-next-line
    }, [selectedContact]);

    const onSortMessages = (msg1, msg2) => {
        if (msg1.timestamp > msg2.timestamp) {
            return 1;
        }
        if (msg1.timestamp < msg2.timestamp) {
            return -1;
        }
        return 0;
    };

    return (
        <div className={ `container-fluid d-flex flex-column-reverse overflow-auto flex-grow-1 flex-b p-3 ${className}` }>
            <div className="container-fluid d-flex flex-column p-0">
                {messages.sort(onSortMessages).map(msg => 
                  <Balloon 
                        key={ msg.id }
                        className={ user.id === msg.from ? "chat-balloon-right" : "chat-balloon-left" }
                        isContact={ user.id !== msg.from } 
                        message={ msg } />
                )}
            </div>
        </div>
    );
};

export default Chat;