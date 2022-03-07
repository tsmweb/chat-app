import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useContacts } from "../contexts/contact";

const ContactForm = () => {
    const { AddContact } = useContacts();

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");

    const [validated, setValidated] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [variantAlert, setVariantAlert] = useState("success");

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            try {
                await AddContact(id, name, lastname);
                setMessageAlert("Contato criado com sucesso!");
                setVariantAlert("success");
                resetState();
                form.reset();
            } catch(err) {
                setMessageAlert(err);
                setVariantAlert("danger");
            }

            setShowAlert(true);
        } else {
            setValidated(true);
        }
    };

    const resetState = () => {
        setID("");
        setName("");
        setLastname("");
        setShowAlert(false);
    };

    const handleChange = (event) => {
        const input = event.target;

        switch (input.name) {
            case "id":
                setID(input.value);
                break;

            case "name":
                setName(input.value);
                break;

            case "lastname":
                setLastname(input.value);
                break;
                
            default:
                break;    
        }
    };

    return (
        <Container fluid className="p-3">
            <Alert variant={ variantAlert }
                    className="mb-2" 
                    show={ showAlert } 
                    onClose={ () => setShowAlert(false) } 
                    dismissible>

                { messageAlert }
            </Alert>

            <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
                <Form.Group className="mb-3" controlId="formID">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Telefone"
                        name="id"
                        value={ id }
                        onChange={ handleChange }
                        required />   
                    <Form.Control.Feedback type="invalid">
                        Informe o ID.
                    </Form.Control.Feedback> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control  
                        type="text" 
                        placeholder="Nome"
                        name="name"
                        value={ name }
                        onChange={ handleChange }
                        required />
                    <Form.Control.Feedback type="invalid">
                        Informe o nome.
                    </Form.Control.Feedback> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastname">
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control  
                        type="text" 
                        placeholder="Sobrenome (opcional)"
                        name="lastname"
                        value={ lastname }
                        onChange={ handleChange } />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" type="submit">
                        <i className="fa fa-floppy-o" aria-hidden="true"></i> Salvar
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default ContactForm;