import React from "react";
import moment from "moment";

const ContactLastMessageAt = ({contact}) => {
    let lastMessageAt = "";

    if (contact.lastMessageAt > 0) {
        const diff = moment(Date.now()).diff(contact.lastMessageAt, "days");
        const dateLastMessageAt = new Date(contact.lastMessageAt);

        if (diff === 0) {
            lastMessageAt = moment(dateLastMessageAt).format("HH:mm");
        } else {
            lastMessageAt = moment(dateLastMessageAt).format("DD/MM/YYYY");
        }
    }

    return (
        <small className="text-secondary">
            { lastMessageAt }
        </small>
    );
};

export default ContactLastMessageAt;