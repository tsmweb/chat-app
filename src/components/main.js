import React, { Fragment, useState, useEffect } from "react";
import { getToken, getUserID, clearLocalStorage } from "../services/token";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./header";
import ContactList from "./contactList";

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        const token = getToken();

        if (token === null) {
            navigate("/sign-in");
        }
    }, [])

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const handleClick = (event) => {
        clearLocalStorage();
        navigate("/sign-in");
    }

    return (
        <Fragment>
            <Container fluid className="h-100 m-0 p-0">
                <Header />

                <ContactList />
            </Container>
        </Fragment>
    );
}

export default Home;