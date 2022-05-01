import { useState, useEffect } from "react";
import { useContacts } from "../contexts/contact";
import moment from "moment";
import Header from "./Header";
import ModalScreen from "./ModalScreen";
import ContactInfo from "./ContactInfo";
import GroupInfo from "./GroupInfo";
import ChatSendMessage from "./ChatSendMenssage";

const Content = () => {
    const { selectedContact } = useContacts();
    const [profile, setProfile] = useState(null);
    const [menu, setMenu] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        "title": "",
        "content": null
    });

    const contactMenu = [
        {
            "title": "Bloquear",
            "onAction": null
        },
        {
            "title": "Deletar",
            "onAction": null
        },
        {
            "title": "Limpar conversa",
            "onAction": null
        },
    ];

    const groupMenu = [
        {
            "title": "Sair do grupo",
            "onAction": null
        },
        {
            "title": "Limpar conversa",
            "onAction": null
        },
    ];

    useEffect(() => {
        if (selectedContact === null) {
            return
        }
        
        const updateAt = moment(selectedContact.updatedAt).format("hh:mm");
        const prof = {
            "id": selectedContact.id,
            "name": selectedContact.name,
            "lastname": selectedContact.lastname,
            "isGroup": selectedContact.isGroup,
            "description": `visto por último hoje às ${updateAt}`
        }
        setProfile(prof);

        if (selectedContact.isGroup) {
            setMenu(groupMenu);
        } else {
            setMenu(contactMenu);
        }
    }, [selectedContact])

    const handleHeaderClick = (contact) => {
        if (contact.isGroup) {
            setForm({
                "title": "Grupo",
                "content": <GroupInfo onHide={ () => setShowModal(false) } />
            });
        } else {
            setForm({
                "title": "Contato",
                "content": <ContactInfo onHide={ () => setShowModal(false) } />
            });
        }
       
        setShowModal(true);
    };

    return (
        <>
            <div className="d-flex flex-column h-100 border-start chat-bg">
                <Header 
                    className="flex-grow-0"
                    menu={ menu } 
                    profile={ profile } 
                    onClick={ handleHeaderClick } />

                <div className="flex-grow-1 p-2">
                    <h1>Chat</h1>
                </div>

               <ChatSendMessage 
                    className="flex-grow-0" />
            </div>

            <ModalScreen 
                show={ showModal }
                onHide={ () => setShowModal(false) }
                title={ form.title }
            >
                 { form.content }
            </ModalScreen>
        </>
    );
};

export default Content;