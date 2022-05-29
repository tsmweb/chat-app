import React, { useState } from "react";
import { SendFill } from "react-bootstrap-icons";

const ChatSendMessage = ({ className }) => {
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        const { value } = event.target;
        setMessage(value);
    };

    const handleSendClick = () => {
        alert(message);
        setMessage("");
    };

    const handleAttachmentClick = () => {

    };

    return (
        <div className={`container-fluid d-flex justify-content-between p-2 ${className}`}>
            <div className="d-flex w-100 border border-1 rounded-pill bg-white ps-3 pe-3 pt-2 pb-2 shadow-sm">
                <input className="chat-input"
                    type="text" 
                    placeholder="Digite uma mensagem" 
                    name="message"
                    aria-label="Digite uma mensagem"
                    value={ message }
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