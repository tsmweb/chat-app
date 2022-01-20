import React, { useState } from "react";
import { useAuth } from "../contexts/auth";
import Header from "./Header";
import ContactList from "./ContactList";
import ModalScreen from "./ModalScreen";
import ProfileForm from "./ProfileForm";

const Sidebar = (props) => {
    const { user, Logout } = useAuth();
    const [openProfileForm, setOpenProfileForm] = useState(false);

    const handleEditMenuClick = (event) => {
        alert("Edit Menu");
    }

    const menu = [
        {
            "title": "Editar",
            "onAction": handleEditMenuClick
        },
        {
            "title": "Sair",
            "onAction": Logout
        }
    ];

    const handleHeaderClick = (contact) => {
        setOpenProfileForm(true);
    };

    const handleContactClick = (contact) => {
        alert(contact.id);
    };

    return (
        <>
            <div className="h-100 bg-white">
                <Header 
                    menu={ menu } 
                    profile={ user } 
                    onClick={ handleHeaderClick } />

                <ContactList
                    onContactClick={ handleContactClick } />
            </div>

            <ModalScreen 
                show={ openProfileForm }
                onHide={ () => setOpenProfileForm(false) }
                title="Perfil"
            >
                <ProfileForm onHide={ () => setOpenProfileForm(false) } />
            </ModalScreen>
        </>
    );
};

export default Sidebar;