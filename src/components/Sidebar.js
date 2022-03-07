import React, { useState } from "react";
import { useAuth } from "../contexts/auth";
import Header from "./Header";
import ContactList from "./ContactList";
import ModalScreen from "./ModalScreen";
import ProfileForm from "./ProfileForm";

const Sidebar = () => {
    const { user, Logout } = useAuth();
    const [openProfileForm, setOpenProfileForm] = useState(false);

    const menu = [
        {
            "title": "Sair",
            "onAction": Logout
        }
    ];

    const handleHeaderClick = (contact) => {
        setOpenProfileForm(true);
    };

    return (
        <>
            <div className="h-100 bg-white">
                <Header 
                    menu={ menu } 
                    profile={ user } 
                    onClick={ handleHeaderClick } />

                <ContactList />
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