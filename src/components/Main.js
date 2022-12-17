import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ContactsProvider } from "../contexts/contact";
import { MessagesProvider } from "../contexts/message";
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
                        <MessagesProvider>
                            <Content />
                        </MessagesProvider>
                    </Col>
                </Row>
            </Container>
        </ContactsProvider>
    );
};

export default Main;