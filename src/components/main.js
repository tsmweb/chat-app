import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/auth";

import Header from "./header";
import ContactList from "./contactList";

const Home = () => {
    const { signed, user, Logout } = useAuth();

    console.log(`Home: ${signed}`);
    console.log(`Home: ${JSON.stringify(user)}`);

    const handleLogoutClick = (event) => {
        Logout();
    }

    const handleEditMenuClick = (event) => {
        alert("Edit Menu");
    }

    const menuSidebar = [
        {
            "title": "Editar",
            "onAction": handleEditMenuClick
        },
        {
            "title": "Sair",
            "onAction": handleLogoutClick
        }
    ];

    const handleHeaderClick = (contact) => {
        alert(contact.name);
    };

    return (
        <Fragment>
            <Container className="h-100 m-auto p-0">
                <Row className="m-0 p-0">
                    <Col sm={4} className="p-0">
                        <Header menu={ menuSidebar } profile={ user } onClick={ handleHeaderClick } />
                    </Col>
                    <Col sm={8} className="p-0">
                        
                    </Col>
                </Row>

                <Row className="h-100 m-0 p-0">
                    <Col sm={4} className="p-0">
                        <ContactList />
                    </Col>
                    <Col sm={8} className="p-0">
                        <p>Content R</p>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default Home;