import React from "react";
import Balloon from "./Balloon";
import { useAuth } from "../contexts/auth";

const Chat = ({ className }) => {
    const { user } = useAuth();

    const messages = [
        {
            id: "da4b9237bacccdf19c0760cab7aec4a8359010b1",
            from: "+5511986481154",
            to: "+5518991427024",
            content_type: "text",
            content: "Hello my friend!",
            hour: "22:55",
            date: "2022-05-10",
            ack: "read",
            date_ack: "2022-05-10 22:56:00"
        },
        {
            id: "da4b9237bacccdf19c0760cab7aec4a8359010c5",
            from: "+5511986481154",
            to: "+5518991427024",
            content_type: "image/jpeg",
            content: "9f2093abeecac621b55489bf8cb0e08ee00d5fe6da6f30e77214a648e58bd91b.jpg",
            hour: "22:55",
            date: "2022-05-10",
            ack: "read",
            date_ack: "2022-05-10 22:57:00"
        },
        {
            id: "da4b9237bacccdf19c0760cab7aec4a8359010b4",
            from: "+5511986481154",
            to: "+5518991427024",
            content_type: "text",
            content: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            hour: "22:56",
            date: "2022-05-10",
            ack: "recv",
            date_ack: "2022-05-10 22:57:30"
        },
        {
            id: "1b6453892473a467d07372d45eb05abc2031647a",
            from: "+5518991427024",
            to: "+5511986481154",
            content_type: "text",
            content: "Hi my friend!",
            hour: "22:58",
            date: "2022-05-10",
            ack: "read",
            date_ack: "2022-05-10 22:58:10"
        },
        {
            id: "1b6453892473a467d07372d45eb05abc2031648e",
            from: "+5518991427024",
            to: "+5511986481154",
            content_type: "image/jpeg",
            content: "8e230c13bb9329016729c807dc48ea7b4ce2a9c8a5e6a78191bfa4d37d9169b2.jpg",
            hour: "22:58",
            date: "2022-05-10",
            ack: "recv",
            date_ack: "2022-05-10 22:58:23"
        },
        {
            id: "1b6453892473a467d07372d45eb05abc2031648b",
            from: "+5518991427024",
            to: "+5511986481154",
            content_type: "text",
            content: "Segue meu vídeo-aula.",
            hour: "22:58",
            date: "2022-05-10",
            ack: "recv",
            date_ack: "2022-05-10 22:58:30"
        },
        {
            id: "1b6453892473a467d07372d45eb05abc2031648d",
            from: "+5518991427024",
            to: "+5511986481154",
            content_type: "video/mp4",
            content: "8e0004be5bbde74a18897e2bf48049deb30f0444e7884898c1e0e79c89dcff2f.mp4",
            hour: "22:58",
            date: "2022-05-10",
            ack: "recv",
            date_ack: "2022-05-10 22:58:33"
        },
        {
            id: "da4b9237bacccdf19c0760cab7aec4a8359010b8",
            from: "+5511986481154",
            to: "+5518991427024",
            content_type: "text",
            content: "Good by!",
            hour: "22:58",
            date: "2022-05-10",
            ack: "read",
            date_ack: "2022-05-10 22:58:38"
        },
        {
            id: "1b6453892473a467d07372d45eb05abc2031647c",
            from: "+5518991427024",
            to: "+5511986481154",
            content_type: "text",
            content: "Good by!",
            hour: "22:59",
            date: "2022-05-10",
            ack: "sent",
            date_ack: "2022-05-10 22:59:00"
        },
    ];

    return (
        <div className={ `container-fluid d-flex flex-column-reverse overflow-auto flex-grow-1 flex-b p-3 ${className}` }>
            <div className="container-fluid d-flex flex-column p-0">
                {messages.map(msg => 
                  <Balloon 
                        key={ msg.id }
                        className={ user.id == msg.from ? "chat-balloon-right" : "chat-balloon-left" } 
                        message={ msg } />
                )}
            </div>
        </div>
    );
};

export default Chat;