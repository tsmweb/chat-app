import React, { useState } from "react";
import { SendFill } from "react-bootstrap-icons";
import { useAuth } from "../contexts/auth";
import { useContacts } from "../contexts/contact";
import { useMessages } from "../contexts/message";
import moment from "moment";
import sha1 from "sha1";

const ChatSendMessage = ({ className }) => {
    const { user } = useAuth();
    const { selectedContact } = useContacts();
    const { AddMessage, SendMessage } = useMessages();

    const [entry, setEntry] = useState("");

    const handleChange = (event) => {
        const { value } = event.target;
        setEntry(value);
    };

    const handleSendClick = async () => {
        const tag = user.id + selectedContact.id;
        const from = user.id;
        const to = !selectedContact.isGroup ? selectedContact.id : "";
        const group = selectedContact.isGroup ? selectedContact.id : "";
        const content_type = "text";
        const content = entry;
        const hour = moment(Date.now()).format("HH:mm");
        const date = moment(Date.now()).format("YYYY-MM-DD");
        const timestamp = Date.now();
        const ack = "sent";
        const date_ack = timestamp;
        const id = sha1(from + to + group + Date.now());

        try {
            // send message to server 
            SendMessage(id, from, to, group, content_type, content, timestamp);

            // the message persists in the local database
            await AddMessage(
                id,
                tag,
                from,
                to,
                group,
                content_type,
                content,
                hour,
                date,
                timestamp,
                ack, 
                date_ack
            );
        } catch(err) {
            console.log("[!] ChatSendMessage: ", err);
        }

        setEntry("");
    };

    const handleAttachmentClick = () => {
        alert("Anexo!");
    };

    return (
        <div className={`container-fluid d-flex justify-content-between p-2 ${className}`}>
            <div className="d-flex w-100 border border-1 rounded-pill bg-white ps-3 pe-3 pt-2 pb-2 shadow-sm">
                <input className="chat-input"
                    type="text" 
                    placeholder="Digite uma mensagem" 
                    name="entry"
                    aria-label="Digite uma mensagem"
                    value={ entry }
                    onChange={ handleChange } />

                <i className="fa fa-paperclip"
                    style={{ fontSize: "1.5em" }} 
                    aria-hidden="true"
                    role="button"
                    onClick={ handleAttachmentClick }></i>
            </div>


            <button type="button" 
                className="btn btn-success rounded-circle shadow-sm ms-2"
                onClick={ handleSendClick }
            >
                <SendFill size={22} />
            </button>
        </div>
    );
};

export default ChatSendMessage;