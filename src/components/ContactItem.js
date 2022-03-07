import { useEffect } from "react";
import Moment from "react-moment";
import RoundImage from "./RoundImage";
import * as fileService from "../services/file";
import { useHttpRespImage } from "../hooks/hooks";
import { useContacts } from "../contexts/contact";
import imgAvatar from "../assets/img/avatar.png";

const ContactItem = (props) => {
    const contact = props.contact;
    const { setSelectedContact } = useContacts();
    const { image, loadImage } = useHttpRespImage(imgAvatar);

    useEffect(() => {
        (async () => {
            await fetchImage();
        })();
        // eslint-disable-next-line
    }, [contact]);

    const fetchImage = async () => {
        let resp = undefined;

        if (contact.isGroup) {
            resp = await fileService.getGroupPhoto(contact.id);
        } else {
            resp = await fileService.getUserPhoto(contact.id);
        }

        loadImage(resp);
    };

    const handleClick = () => {
        setSelectedContact(contact);
    };

    return (
        <div className="d-flex w-100 align-content-center">
            <RoundImage 
                src={ image } 
                size={ 44 } 
                title={ contact.name }
                readOnly={ true }
                className="me-2 flex-shrink-0" />

            <div className="d-flex flex-column w-100"
                onClick={ handleClick }
                role="button"
            >
                <div className="d-flex justify-content-between"> 
                    <strong>
                        { contact.name }
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