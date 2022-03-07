import React, { useRef, useState } from "react";
import { CameraFill } from "react-bootstrap-icons";
import { Overlay, Popover, ListGroup } from "react-bootstrap";
import ModalScreen from "./ModalScreen";

const RoundImage = (props) => {
    const [display, setDisplay] = useState("none");
    const [show, setShow] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const target = useRef(null);
    const inputImageRef = useRef(null);

    const handleClick = (event) => {
        if (props.readOnly) {
            setShowImage(true);
        } else {
            show ? hideMenu() : showMenu();
        }
    };

    const handleSeeImageClick = () => {
        hideMenu();
        setShowImage(true);
    };

    const handleLoadImageClick = () => {
        hideMenu();
        inputImageRef.current.click();
    };

    const handleFileChange = (event) => {
        props.onChange(event.target.files[0]);
    };

    const showMenu = () => {
        setDisplay("flex");
        setShow(true);
    };

    const hideMenu = () => {
        setShow(false);
        setDisplay("none");
    };

    return (
        <>
            <div 
                style={{
                    width: `${props.size}px`,
                    height: `${props.size}px`,
                    borderRadius: "50%",

                    backgroundImage: `url(${props.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
                
                className={ props.className }
                onClick={ handleClick }
                role="button"
            >
                <div style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",

                    display: `${display}`,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div ref={ target }>
                        <CameraFill size={ 32 } color="white" />  
                    </div>
                </div>   

                <input type="file" 
                    ref={ inputImageRef }
                    accept="image/jpeg" 
                    style={{display: "none"}}
                    onChange={ handleFileChange } />  
            </div>
   
            <Overlay
                show={ show }
                target={ target.current } 
                container={ target }
                placement="bottom">
                                
                <Popover id="popover-header-menu" className="p-0">
                    <Popover.Body className="p-1">
                        <ListGroup variant="flush">
                            <ListGroup.Item action onClick={ handleSeeImageClick }>
                                Ver imagem
                            </ListGroup.Item>
                        </ListGroup>
                        
                        <ListGroup variant="flush">
                            <ListGroup.Item action onClick={ handleLoadImageClick }>
                                Carregar imagem
                            </ListGroup.Item>
                        </ListGroup>
                    </Popover.Body>
                </Popover>
            </Overlay>

            <ModalScreen 
                show={ showImage }
                onHide={ () => setShowImage(false) }
                title={ props.title }
            >
                <img src={ props.src } 
                    alt={ props.title }
                    style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover" 
                    }} />
            </ModalScreen>
        </>
    );
};

export default RoundImage;