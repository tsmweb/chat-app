import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

const Home = () => {

    return (
        <Container className="h-100 m-auto p-0">
            <Row className="h-100 m-0 p-0">
                <Col sm={4} className="p-0">
                    <Sidebar />
                </Col>
                <Col sm={8} className="p-0">
                    <p>Content R</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;