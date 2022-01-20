import React from "react";
import { Modal } from "react-bootstrap"

const ModalScreen = (props) => {
    return (
        <Modal 
            show={ props.show }
            onHide={ props.onHide }
            fullscreen="md-down"
            backdrop="static"
            keyboard={ false }
            scrollable={ true }
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header 
                closeButton 
                closeVariant="white"
                className="text-light bg-black"
            >
                <Modal.Title>
                    { props.title }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                { props.children }
            </Modal.Body>
        </Modal>
    );
};

export default ModalScreen;