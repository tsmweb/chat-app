import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import ProfileImage from "./ProfileImage";
import { useAuth } from "../contexts/auth";

const ProfileForm = (props) => {
    const { user, UpdateUser, ChangeImage } = useAuth();
    const [name, setName] = useState(user.name);
    const [lastname, setLastname] = useState(user.lastname);
    const [validated, setValidated] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "name":
                setName(value);
                break;
            case "lastname":
                setLastname(value);
                break; 
            default:
                return;       
        }
    };

    const handleRoundImageChange = async (file) => {
        try {
            await ChangeImage(file);
        } catch(err) {
            setMessageAlert(err);
            setShowAlert(true);
        }
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
    
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            try {
                await UpdateUser(user.id, name, lastname);
                props.onHide();
            } catch(err) {
                setMessageAlert(err);
                setShowAlert(true);
            }
        } else {
            setValidated(true);
        }
    };

    return (
        <Container fluid className="p-3">
            <Alert variant="danger"
                className="mb-2" 
                show={ showAlert } 
                onClose={ () => setShowAlert(false) } 
                dismissible
            >
                { messageAlert }
            </Alert>

            <ProfileImage 
                profile={ user } 
                size={ 160 } 
                readOnly={ false } 
                onChange={ handleRoundImageChange }
                className="m-auto" />

            <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
                <Form.Group className="mb-3" controlId="formID">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Telefone"
                        name="id"
                        value={ user.id }
                        disabled />
                    <Form.Control.Feedback type="invalid">
                        Informe seu ID.
                    </Form.Control.Feedback> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control  
                        type="text" 
                        placeholder="Nome"
                        name="name"
                        value={ name }
                        onChange={ handleChange }
                        required />
                    <Form.Control.Feedback type="invalid">
                        Informe seu nome.
                    </Form.Control.Feedback> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control  
                        type="text" 
                        placeholder="Sobrenome"
                        name="lastname"
                        value={ lastname }
                        onChange={ handleChange }
                        required />
                    <Form.Control.Feedback type="invalid">
                        Informe seu sobrenome.
                    </Form.Control.Feedback> 
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

export default ProfileForm;