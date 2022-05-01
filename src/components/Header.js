import React from "react";
import { Navbar, Container } from "react-bootstrap"
import Menu from "./Menu";
import Avatar from "./Avatar";

const Header = ({ menu, profile, onClick, className }) => {

    return (
        <Navbar bg="dark" variant="dark" className={ className }>
            <Container fluid className="header-height">
                <Navbar.Brand 
                    href="#"
                    className="fs-6 p-0"
                >
                    {profile &&
                    <Avatar
                        profile={ profile }
                        onClick={ () => onClick(profile) } />
                    }
                </Navbar.Brand>

                <Navbar.Text>
                    <Menu show={ false } items={ menu } />            
                </Navbar.Text>
            </Container>  
        </Navbar>
    );
};

export default Header;