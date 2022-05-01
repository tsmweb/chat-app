import { createContext, useState, useEffect, useContext } from "react";
import * as userService from "../services/user";
import * as cacheDB from "../services/cacheDB";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        (async () => {
            LoadContacts(true);
        })();
    }, []);

    const LoadContacts = async (updateCache = false) => {
        try {            
            let contactList;

            if (updateCache) {
                contactList = await userService.fetchContacts();
                await cacheDB.clearContacts();
                await cacheDB.addContacts(contactList);
            } else {
                contactList = await cacheDB.getAllContacts();
            }

            setContacts(contactList);

            if (contactList.length > 0) {
                if (selectedContact === null) {
                    setSelectedContact(contactList[0]);
                } else {
                    const sc = contactList.find(contact => contact.id === selectedContact.id)
                    if (sc !== undefined) {
                        setSelectedContact(sc);
                    } else {
                        setSelectedContact(contactList[0]);
                    }
                }
            }            
        } catch(err) {
            console.log("[!] ContactsProvider.LoadContacts: ", err);
        }
    };

    const AddContact = async (id, name, lastname) => {
        const contact = {
            id: id,
            name: name,
            lastname: lastname,
            lastMessage: id,
            unreadMessages: 0,
            updatedAt: Date.now(),
            isGroup: false
        };

        const resp = await userService.addContact(id, name, lastname);
        if (resp.status === 201) {
            try {
                await cacheDB.addContact(contact);   
                await LoadContacts(false);
            } catch(err) {
                console.log("[!] ContactsProvider.AddContact: ", err);
            }
        } else {
            switch (resp.status) {
                case 404:
                    throw "Este contato não possui um perfil no sistema!";

                case 409:
                    throw "Este contato já existe na sua lista de contatos!"; 

                default:
                    console.log("[!] ContactsProvider.AddContact: ", resp.data.error_message);
                    throw "Não foi possível adicionar o contato!";
            }                
        }
    };

    const UpdateContact = async (id, name, lastname) => {
        const contact = {
            id: id,
            name: name,
            lastname: lastname,
            lastMessage: id,
            unreadMessages: 0,
            updatedAt: Date.now(),
            isGroup: false
        };

        const resp = await userService.updateContact(id, name, lastname);
        if (resp.status === 200) {
            try {
                await cacheDB.addContact(contact);
                await LoadContacts(false);
            } catch(err) {
                console.log("[!] ContactsProvider.UpdateContact: ", err);
            }
        } else {
            console.log("[!] ContactsProvider.UpdateContact: ", resp.data.error_message);
            throw "Não foi possível atualizar o contato!";
        }
    };

    const DeleteContact = async (id) => {
        const resp = await userService.deleteContact(id);
        if (resp.status === 200) {
            try {
                await cacheDB.deleteContact(id);
                await LoadContacts(false);
            } catch(err) {
                console.log("[!] ContactsProvider.DeleteContact: ", err);
            }
        } else {
            console.log("[!] ContactsProvider.DeleteContact: ", resp.data.error_message);
            throw "Não foi possível deletar o contato!";
        }
    };

    return (
        <ContactsContext.Provider value={{
            contacts, 
            selectedContact,
            setSelectedContact, 
            LoadContacts, 
            AddContact, 
            UpdateContact,
            DeleteContact
        }}>
            { children }
        </ContactsContext.Provider>
    );
};

export function useContacts() {
    return useContext(ContactsContext);
};