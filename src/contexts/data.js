import { createContext, useState, useEffect, useContext } from "react";
import * as userService from "../services/userService";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        (async () => {
            LoadContacts();
        })();
    }, []);

    const LoadContacts = async () => {
        const resp = await userService.fetchContacts();
        setContacts(resp);
        
        if (resp.length > 0) {
            setSelectedContact(resp[0]);
        }
    };

    const UpdateContact = (contact) => {
        const newContacts = contacts.map((item) => {
            if (item.id === contact.id) {
                return contact;
            }

            return item;
        }).sort((c1, c2) => {
            if (c1.name < c2.name) {
                return -1;
            }
            if (c1.name > c2.name) {
                return 1;
            }
            return 0;
        });

        setContacts(newContacts);
    };

    return (
        <ContactsContext.Provider value={{ contacts, LoadContacts, UpdateContact, selectedContact, setSelectedContact }}>
            { children }
        </ContactsContext.Provider>
    );
};

export function useContacts() {
    return useContext(ContactsContext);
};