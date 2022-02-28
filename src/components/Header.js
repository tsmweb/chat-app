import React from "react";
import { Navbar, Container } from "react-bootstrap"
import Menu from "./Menu";
import Avatar from "./Avatar";

const Header = (props) => {

    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid className="header-height">
                <Navbar.Brand 
                    href="#"
                    className="fs-6 p-0"
                >
                    {props.profile &&
                    <Avatar
                        id={ props.profile.id } 
                        name={ props.profile.name } 
                        description={ props.profile.description }
                        isGroup={ props.profile.isGroup === undefined ? false : props.profile.isGroup }
                        onClick={ () => props.onClick(props.profile) } />
                    }
                </Navbar.Brand>

                <Navbar.Text>
                    <Menu show={ false } items={ props.menu } />            
                </Navbar.Text>
            </Container>  
        </Navbar>
    );
};

export default Header;