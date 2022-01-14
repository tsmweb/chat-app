import React, { Fragment } from "react";
import { Navbar, Container } from "react-bootstrap"
import Menu from "./menu";
import Avatar from "./avatar";

const Header = (props) => {

    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand 
                        href="#"
                        className="fs-6 p-0"
                        onClick={ () => props.onClick(props.profile) }>

                        <Avatar
                            id={ props.profile.id } 
                            name={ props.profile.name } 
                            description={ props.profile.description }
                            isGroup={ props.profile.isGroup === undefined ? false : props.profile.isGroup } />
                    </Navbar.Brand>

                    <Navbar.Text>
                        <Menu show={ false } items={ props.menu } />            
                    </Navbar.Text>
                </Container>  
            </Navbar>
        </Fragment>
    );
};

export default Header;