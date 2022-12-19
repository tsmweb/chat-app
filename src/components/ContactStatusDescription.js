import React from "react";
import { contactStatusDescription } from "../helpers/helper";

const ContactStatusDescription = ({contact}) => {
    const description = contactStatusDescription(contact);

    return (
        <small>
            { description }
        </small>
    );
};

export default ContactStatusDescription;