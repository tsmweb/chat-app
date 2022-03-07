import { useState, useEffect } from "react";
import { useContacts } from "../contexts/contact";
import moment from "moment";
import Header from "./Header";
import ModalScreen from "./ModalScreen";

const Content = () => {
    const { selectedContact } = useContacts();
    const [profile, setProfile] = useState(null);
    const [openContactForm, setOpenContactForm] = useState(false);

    const menu = [
        {
            "title": "Bloquear",
            "onAction": null
        }
    ];

    useEffect(() => {
        if (selectedContact === null) {
            return
        }
        
        const updateAt = moment(selectedContact.updatedAt).format("hh:mm");
        const prof = {
            "id": selectedContact.id,
            "name": selectedContact.name,
            "isGroup": selectedContact.isGroup,
            "description": `visto por último hoje às ${updateAt}`
        }
        setProfile(prof);
    }, [selectedContact])

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