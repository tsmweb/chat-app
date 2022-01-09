import React, { Fragment, useState, useEffect } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { People, Person, ChatText, BoxArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { getUserID, getUserName, clearLocalStorage } from "../services/token";
import { getUserPhotoService } from "../services/fileService";

import imgAvatar from "../assets/img/avatar.png";

const Header = (props) => {
    const [userPhoto, setUserPhoto] = useState(imgAvatar);
    let navigate = useNavigate();

    useEffect(() => {
        fetchUserPhoto(getUserID())
    }, []);

    const fetchUserPhoto = async (userID) => {
        const resp = await getUserPhotoService(userID);

        if (resp.status === 200) {
            const reader = new FileReader();
            reader.readAsDataURL(resp.data);
            reader.onload = () => {
                const base64data = reader.result;
                setUserPhoto(base64data);
            };
        } else {
            setUserPhoto(imgAvatar);
        }
    };

    const handleClickLogoff = (event) => {
        event.preventDefault();
        event.stopPropagation();

        clearLocalStorage();
        navigate("/sign-in");
    };

    return (
        <Fragment>
            <Navbar bg="dark" variant="dark" expand={ false }>
                <Container fluid className="justify-content-start">
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />

                    <Navbar.Brand className="ms-3">Chat App</Navbar.Brand>

                    <Navbar.Offcanvas 
                        id="offcanvasNavbar" 
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="start"
                        style={{ width: "300px" }}>
                        
                        <Offcanvas.Header className="navdrawer-header bg-dark" style={{ height: "140px" }}>
                            <a href="/" className="d-flex align-items-center mb-md-0 me-md-auto link-dark text-white text-decoration-none">
                                <img src={ userPhoto } className="img-avatar me-3" />
                                <div>
                                    <p className="fs-5 fw-bolder mb-1">{ getUserName() }</p>
                                    <p className="fs-6 m-0">{ getUserID() }</p>
                                </div>
                            </a>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <ul className="nav nav-pills flex-column mb-auto sidebar-menu-item">
                                <li className="nav-item">
                                    <a href="#" className="nav-link active" aria-current="page">
                                        <ChatText className="bi me-2" size="18" />
                                        Conversas
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link link-dark">
                                        <Person className="bi me-2" size="18" />
                                        Contatos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link link-dark">
                                        <People className="bi me-2" size="18" />
                                        Grupos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link link-dark" onClick={ handleClickLogoff }>
                                        <BoxArrowLeft className="bi me-2" size="18" />
                                        Sair
                                    </a>
                                </li>
                            </ul>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </Fragment>
    );
}

export default Header;