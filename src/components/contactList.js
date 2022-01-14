import React, { Fragment, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { PersonPlusFill, PeopleFill } from "react-bootstrap-icons";
import { getAllContactsService, getAllGroupsService } from "../services/userService";
import Avatar from "./avatar";

const ContactList = (props) => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(async () => {
        const resp = await fetchContacts();
        setContacts(resp);
    }, []);

    const fetchContacts = async () => {
        let contacts = [];
        let groups = [];

        const respContact = await getAllContactsService();
        if (respContact.status === 200) {
            contacts = respContact.data.map(contact => {
                return {
                    "id": contact.id,
                    "name": `${contact.name} ${contact.lastname}`,
                    "description": "",
                    "isGroup": false
                }
            });

            const respGroup = await getAllGroupsService();
            if (respGroup.status === 200) {
                groups = respGroup.data.map(group => {
                    return {
                        "id": group.id,
                        "name": group.name,
                        "description": group.description,
                        "isGroup": true
                    }
                });
            }
        }

        return contacts.
                concat(groups).
                sort((c1, c2) => {
                    if (c1.name < c2.name) {
                        return -1;
                    }
                    if (c1.name > c2.name) {
                        return 1;
                    }
                    return 0;
                });
    };

    const handleNewContactClick = (event) => {
        alert("Novo contato!");
    };

    const handleNewGroupClick = (event) => {
        alert("Novo grupo!");
    };

    const handleContactClick = (contact) => {
        alert(`${contact.isGroup} - ${contact.id} `);
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearch(value.toLowerCase());
    };

    const filterContacts = (contact) => {
        return contact.name.toLowerCase().includes(search);
    };

    return (
        <Fragment>
            <div className="d-flex flex-column flex-shrink-0 p-0 bg-light h-100">
                <div className="sidebar-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Contatos</h5>
                        <span className="badge bg-primary rounded-pill">
                            { contacts.length }
                        </span>
                    </div>

                    <Form>
                        <Form.Control 
                            type="text" 
                            placeholder="Pesquisar..." 
                            name="search"
                            aria-label="Pesquisar..." 
                            onChange={ handleSearchChange }/>
                    </Form>
                </div>

                <div className="list-group list-group-flush border-bottom scrollarea">
                    <a href="#" 
                        className="list-group-item list-group-item-action" 
                        onClick={ handleNewContactClick }
                    >
                        <div className="w-100">
                            <PersonPlusFill size={44} className="me-3" />
                            <strong>Novo contato</strong>
                        </div>
                    </a>

                    <a href="#" 
                        className="list-group-item list-group-item-action" 
                        onClick={ handleNewGroupClick }
                    >
                        <div className="w-100">
                            <PeopleFill size={44} className="me-3" />
                            <strong>Novo grupo</strong>
                        </div>
                    </a>

                    { contacts.
                        filter(filterContacts).
                        map(contact => (
                            <a href="#" 
                                className="list-group-item list-group-item-action" 
                                key={ contact.id }
                                onClick={ () => handleContactClick(contact) }>

                                <Avatar
                                    id={ contact.id } 
                                    name={ contact.name } 
                                    description={ contact.description }
                                    isGroup={ contact.isGroup } />
                            </a>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default ContactList;