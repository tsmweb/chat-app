import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const SignIn = () => {
    const { Login } = useAuth();

    const [validated, setValidated] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [showError, setShowError] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            const id = form.id.value;
            const password = form.password.value;

            const status = await Login(id, password);
            if (status === 200) {
                navigate("/", { replace: true });
                return;
            }
            
            if (status > 400) {
                if (status === 401) {
                    setMessageError("ID ou senha incorretos.");
                } else {
                    setMessageError("Houve um erro no processo de login!");
                }
                
                setShowError(true);
            }
        } else {
            setValidated(true);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <Alert variant="danger" 
                    className="mb-2" 
                    show={ showError } 
                    onClose={ () => setShowError(false) } 
                    dismissible>

                    { messageError }
                </Alert>

                <div className="auth-inner">
                    <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
                        <h3>Entrar</h3>

                        <Form.Group className="mb-3" controlId="formID">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Telefone"
                                name="id"
                                autoFocus
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe seu telefone.
                            </Form.Control.Feedback>    
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <p className="forgot-password">
                                <a href="#">Esqueceu a senha?</a>
                            </p>
                            <Form.Control 
                                type="password" 
                                placeholder="Senha"
                                name="password"
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe sua senha.
                            </Form.Control.Feedback>    
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type="submit">
                                Entrar
                            </Button>
                        </div>

                        <p className="link-bottom">
                            <Link to="/sign-up">Crie a sua conta.</Link>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;