import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ContactsProvider, useContacts } from "../contexts/data";
import Content from "./Content";
import Sidebar from "./Sidebar";

const Main = () => {

    return (
        <ContactsProvider>
            <Container className="h-100 m-auto p-0">
                <Row className="h-100 m-0 p-0">
                    <Col sm={4} className="p-0">
                        <Sidebar />
                    </Col>
                    <Col sm={8} className="p-0">
                        <Content />
                    </Col>
                </Row>
            </Container>
        </ContactsProvider>
    );
};

export default Main;