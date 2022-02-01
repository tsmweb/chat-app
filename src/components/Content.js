import { useState, useEffect } from "react";
import { useContacts } from "../contexts/data";
import moment from "moment";
import Header from "./Header";
import ModalScreen from "./ModalScreen";

const Content = (props) => {
    const { selectedContact } = useContacts();
    const [profile, setProfile] = useState({});
    const [openContactForm, setOpenContactForm] = useState(false);

    const menu = [
        {
            "title": "Bloquear",
            "onAction": null
        }
    ];

    useEffect(() => {
        const updateAt = moment(selectedContact.updatedAt).format("hh:mm");
        const prof = {
            "id": selectedContact.id,
            "name": selectedContact.name,
            "isGroup": selectedContact.isGroup,
            "description": `visto por último hoje às ${updateAt}`
        }
        setProfile(prof);
    }, [selectedContact.id])

    const handleHeaderClick = (contact) => {
        setOpenContactForm(true);
    };

    return (
        <>
            <div className="h-100 bg-white border-start">
                <Header 
                    menu={ menu } 
                    profile={ profile } 
                    onClick={ handleHeaderClick } />
            </div>

            <ModalScreen 
                show={ openContactForm }
                onHide={ () => setOpenContactForm(false) }
                title="Contato"
            >
                
            </ModalScreen>
        </>
    );
};

export default Content;