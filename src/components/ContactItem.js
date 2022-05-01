import React from "react";
import Moment from "react-moment";
import ProfileImage from "./ProfileImage";
import { useContacts } from "../contexts/contact";

const ContactItem = ({ contact }) => {
    const { setSelectedContact } = useContacts();

    const handleClick = () => {
        setSelectedContact(contact);
    };

    return (
        <div className="d-flex w-100 align-content-center">
            <ProfileImage 
                profile={ contact } 
                size={ 44 }
                readOnly={ true }
                className="me-2 flex-shrink-0" />

            <div className="d-flex flex-column w-100"
                onClick={ handleClick }
                role="button"
            >
                <div className="d-flex justify-content-between"> 
                    <strong>
                        { `${contact.name} ${contact.lastname}` }
                    </strong>
                    <small className="text-secondary">
                        <Moment format="hh:mm">
                            { contact.updatedAt }
                        </Moment>
                    </small>
                </div>
                
                <div className="d-flex justify-content-between">
                    <small>
                        { contact.lastMessage }
                    </small>
                    
                    { contact.unreadMessages > 0 &&
                    <span className="badge bg-primary rounded-pill">
                        { contact.unreadMessages }
                    </span>
                    }
                </div>
            </div>
        </div>
    );
};

export default ContactItem;