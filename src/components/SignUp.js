import React, { useState, useRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as authService from "../services/authService";
 
const SignUp = () => {
    const [validated, setValidated] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [variantAlert, setVariantAlert] = useState("success");
    const confirmPasswordRef = useRef(null);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
    
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            const id = form.id.value;
            const name = form.name.value;
            const lastname = form.lastname.value;
            const password = form.password.value;
            const resp = await authService.createAccount(id, name, lastname, password);

            if (resp.status === 201) {
                setMessageAlert("Conta criada com sucesso!");
                setVariantAlert("success");
                form.reset();
                return;
            } else {
                if (resp.status === 409) {
                    setMessageAlert("Usuário já inscrito!");
                } else {
                    setMessageAlert(resp.data.error_message);
                }
                setVariantAlert("danger");
            }

            setShowAlert(true);
        } else {
            setValidated(true);
        }
    };

    const handleChange = (e) => {
        const input = e.target;

        if (input.name === "password") {
            confirmPasswordRef.current.pattern = input.value;
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <Alert variant={ variantAlert } 
                    className="mb-2" 
                    show={ showAlert } 
                    onClose={ () => setShowAlert(false) } 
                    dismissible>

                    { messageAlert }
                </Alert>

                <div className="auth-inner">     
                    <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
                        <h3>Inscrever-se</h3>

                        <Form.Group className="mb-3" controlId="formID">
                            <Form.Label>ID</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="ID"
                                name="id"
                                autoFocus
                                required />
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
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe seu sobrenome.
                            </Form.Control.Feedback> 
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Senha"
                                name="password"
                                required 
                                pattern="^\S{6,}$"
                                onChange={ handleChange } />
                            <Form.Control.Feedback type="invalid">
                                Informe sua senha.
                            </Form.Control.Feedback> 
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirmação da Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirmação da senha"
                                name="confirmPassword"
                                ref={ confirmPasswordRef }
                                required
                                pattern="^\S{6,}$" />
                            <Form.Control.Feedback type="invalid">
                                Senha não confere.
                            </Form.Control.Feedback> 
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type="submit">
                                Inscrever-se
                            </Button>
                        </div>

                        <p className="link-bottom">
                            Já está inscrito <Link title="Already registered" to="/sign-in"> entrar?</Link>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;