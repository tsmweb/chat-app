import React, { useState, useRef } from "react";
import { Overlay, Popover, ListGroup } from "react-bootstrap";
import { Image, PlayBtn, FilePdf } from "react-bootstrap-icons";
import * as fileService from "../services/file";

const ChatChooseAttachment = (props) => {
    const [show, setShow] = useState(props.show);
    const [target, setTarget] = useState(null);
    const inputImageRef = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    const handlePDFAction = () => {
        setShow(false);
        props.onClick("Action PDF", "pdf");
    };

    const handleVideoAction = () => {
        setShow(false);
        props.onClick("Action Video", "video");
    };

    const handleImageAction = () => {
        setShow(false);
        inputImageRef.current.click();
    };

    const handleFile = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const resp = await fileService.uploadMedia(file);
            if (resp.status === 201) {
                props.onClick(resp.data.name, file.type);
            } else {
                console.log("[!] ChatChooseAttachment.handleFile: ", resp.data.error_message);
            }
        }
    };

    return (
        <>
            <i className="fa fa-paperclip"
                style={{ fontSize: "1.5em" }} 
                aria-hidden="true"
                role="button"
                onClick={ handleClick }></i>

            <input type="file" 
                ref={ inputImageRef }
                accept="image/*" 
                style={{display: "none"}}
                onChange={ handleFile } />

            <Overlay
                show={ show }
                target={ target }
                placement="top">

                <Popover id="popover-chat-attachment" className="p-0">
                    <Popover.Body className="p-1">
                        <ListGroup>
                            <ListGroup.Item className="mt-1 mb-1" action onClick={ handlePDFAction }>
                                <FilePdf size={32} title="PDF" />
                            </ListGroup.Item>
                            <ListGroup.Item className="mb-1" action onClick={ handleVideoAction }>
                                <PlayBtn size={32} title="Vídeo" />
                            </ListGroup.Item>
                            <ListGroup.Item className="mb-1" action onClick={ handleImageAction }>
                                <Image size={32} title="Imagem" />
                            </ListGroup.Item>
                        </ListGroup>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </>
    );
};

export default ChatChooseAttachment;
