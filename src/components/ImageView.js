import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap"
import * as fileService from "../services/file";
import imgLoading from "../assets/img/loading.gif";
import imgDefault from "../assets/img/media_default.png";

const ImageView = ({ src, title }) => {
    const [currentSrc, setCurrentSrc] = useState(imgLoading);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        (async () => {
            await fetchImage();
            // console.log(`[*] fetchImage(${profile.id})`);
        })();
        // eslint-disable-next-line
    }, [src]);

    const fetchImage = async () => {
        setCurrentSrc(imgLoading);

        const img = await fileService.getMedia(src);
        if (img === null) {
            img = imgDefault;
        }

        // start loading original image
        const imageToLoad = new Image();
        imageToLoad.src = img;
        imageToLoad.onload = () => {
            setCurrentSrc(img);
        };
    };

    const handleClick = () => {
        setShowImage(true);
    };

    return (
        <>
            <div>
                <img src={ currentSrc }
                    alt={ title }
                    style={{
                        borderRadius: "7.5px",
                        width: "100%", 
                        height: "100%", 
                        objectFit: "scale-down", 
                    }}
                    onClick={ handleClick } />
            </div>

            <Modal 
                show={ showImage }
                onHide={ () => setShowImage(false) }
                dialogClassName="modal-screen"
                fullscreen="md-down"
                backdrop="static"
                keyboard={ false }
                scrollable={ true }
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header 
                    closeButton 
                    closeVariant="white"
                    className="text-light bg-black p-2 border-0"
                >
                    <Modal.Title className="fs-6">
                        { title }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 bg-black">
                    <img src={ currentSrc } 
                        alt={ title }
                        style={{ 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "scale-down" 
                        }} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ImageView;
