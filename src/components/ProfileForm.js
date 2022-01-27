import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import RoundImage from "./RoundImage";
import { useAuth } from "../contexts/auth";
import { getUserPhotoService } from "../services/fileService";
import { getUserService, updateUserService } from "../services/authService";
import imgAvatar from "../assets/img/avatar.png";

const ProfileForm = (props) => {
    const { user, Refresh } = useAuth();
    const [image, setImage] = useState(imgAvatar);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [validated, setValidated] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        (async () => {
            await fetchImage();
            await fetchData();
        })();
    }, [user.id]);

    const fetchImage = async () => {
        const resp = await getUserPhotoService(user.id);
        loadImage(resp);
    };

    const loadImage = (resp) => {
        if (resp.status === 200) {
            const reader = new FileReader();
            reader.readAsDataURL(resp.data);
            reader.onload = () => {
                const base64data = reader.result;
                setImage(base64data);
            };
        } else {
            setImage(imgAvatar);
        }
    };

    const fetchData = async () => {
        const resp = await getUserService();
        if (resp.status === 200) {
            setName(resp.data.name);
            setLastname(resp.data.lastname);
        } else {
            setMessageAlert(resp.data.error_message);
            setShowAlert(true);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "name":
                setName(value);
                break;
            case "lastname":
                setLastname(value);
                break;    
        }
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
    
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            const resp = await updateUserService(user.id, name, lastname);
            if (resp.status === 200) {
                Refresh();
                props.onHide();
                return;
            } else {
                setMessageAlert(resp.data.error_message);
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

            <RoundImage 
                src={ image } 
                size={ 160 } 
                title={ `${name} ${lastname}` }
                readOnly={ false } 
                className="m-auto" />

            <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
                <Form.Group className="mb-3" controlId="formID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="ID"
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
                        Salvar
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default ProfileForm;