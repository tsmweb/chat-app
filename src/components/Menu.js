import React, { useState } from "react";
import { Overlay, Popover, ListGroup } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";

const Menu = (props) => {
    const [show, setShow] = useState(props.show);
    const [target, setTarget] = useState(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    const handleItemAction = (onAction) => {
        setShow(false);
        onAction();
    };

    return (
        <>
            <a href="#" onClick={ handleClick }>
                <ThreeDotsVertical size={22} />
            </a>
        
            <Overlay
                show={ show }
                target={ target } 
                placement="bottom">
                                
                <Popover id="popover-header-menu" className="p-0">
                    <Popover.Body className="p-1">
                        { props.items.map(item => (
                            <ListGroup key={ item.title } variant="flush">
                                <ListGroup.Item action onClick={ () => handleItemAction(item.onAction) }>
                                    { item.title }
                                </ListGroup.Item>
                            </ListGroup>
                        ))}
                    </Popover.Body>
                </Popover>
            </Overlay>
        </>
    );
};

export default Menu;