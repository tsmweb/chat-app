import React, { useRef, useState, useEffect } from "react";
import { CameraFill } from "react-bootstrap-icons";
import { Overlay, Popover, ListGroup } from "react-bootstrap";
import * as fileService from "../services/file";
import ModalScreen from "./ModalScreen";
import imgLoading from "../assets/img/loading.gif";
import imgAvatar from "../assets/img/avatar.png";

const ProfileImage = ({ profile, size, readOnly, onChange, className }) => {
    const [currentSrc, setCurrentSrc] = useState(imgLoading);
    const [loading, setLoading] = useState(true);

    const [display, setDisplay] = useState("none");
    const [show, setShow] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const target = useRef(null);
    const inputImageRef = useRef(null);

    useEffect(() => {
        (async () => {
            await fetchImage();
            // console.log(`[*] fetchImage(${profile.id})`);
        })();
        // eslint-disable-next-line
    }, [profile.id, profile.updateAt]);

    const fetchImage = async () => {
        setCurrentSrc(imgLoading);
        setLoading(true);

        let img = null;

        if (profile.isGroup === true) {
            img = await fileService.getGroupPhoto(profile.id);
        } else {
            img = await fileService.getUserPhoto(profile.id);
        }
        
        if (img === null) {
            img = imgAvatar;
        }

        // start loading original image
        const imageToLoad = new Image();
        imageToLoad.src = img;
        imageToLoad.onload = () => {
            setCurrentSrc(img);
            setLoading(false);
        };
    };

    const handleClick = (event) => {
        if (readOnly) {
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
        onChange(event.target.files[0]);
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
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: "50%",

                    backgroundImage: `url(${currentSrc})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                    opacity: loading ? 0.5 : 1,
                    transition: "opacity .15s linear"
                }}
                
                className={ className }
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
                title={ `${profile.name} ${profile.lastname}` }
            >
                <img src={ currentSrc } 
                    alt={ `${profile.name} ${profile.lastname}` }
                    style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover" 
                    }} />
            </ModalScreen>
        </>
    );
};

export default ProfileImage;