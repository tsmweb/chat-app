import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { PersonPlus, People } from "react-bootstrap-icons";
import ModalScreen from "./ModalScreen";
import ContactForm from "./ContactForm";
import GroupForm from "./GroupForm";
import ContactItem from "./ContactItem";
import { useContacts } from "../contexts/contact";

const ContactList = (props) => {
    const { contacts } = useContacts();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        "title": "",
        "content": null
    });

    const handleNewContactClick = (event) => {
        event.preventDefault();
        setForm({
            "title": "Adicionar Contato",
            "content": <ContactForm/>
        });
        setShowModal(true);
    };

    const handleNewGroupClick = (event) => {
        event.preventDefault();
        setForm({
            "title": "Novo Grupo",
            "content": <GroupForm/>
        });
        setShowModal(true);
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearch(value.toLowerCase());
    };

    const filterContacts = (contact) => {
        return contact.name.toLowerCase().includes(search);
    };

    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-0 bg-light">
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
                            <PersonPlus size={36} className="me-3" />
                            <strong>Adicionar Contato</strong>
                        </div>
                    </a>

                    <a href="#" 
                        className="list-group-item list-group-item-action" 
                        onClick={ handleNewGroupClick }
                    >
                        <div className="w-100">
                            <People size={36} className="me-3" />
                            <strong>Novo Grupo</strong>
                        </div>
                    </a>

                    { contacts.filter(filterContacts).map(contact => (
                        <div key={ contact.id } className="list-group-item list-group-item-action">
                            <ContactItem
                                contact={ contact }
                                onClick={ () => props.onContactClick(contact) } />
                        </div>
                    ))}
                </div>
            </div>

            <ModalScreen 
                show={ showModal }
                onHide={ () => setShowModal(false) }
                title={ form.title }>

                { form.content }
            </ModalScreen>
        </>
    );
};

export default ContactList;