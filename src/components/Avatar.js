import React, { useEffect } from "react";
import { useHttpRespImage } from "../hooks/hooks";
import { getUserPhotoService, getGroupPhotoService } from "../services/fileService";
import RoundImage from "./RoundImage";
import imgAvatar from "../assets/img/avatar.png";

const Avatar = (props) => {
    
    const { image, loadImage } = useHttpRespImage(imgAvatar);

    useEffect(() => {
        (async () => {
            await fetchImage();
        })();
    }, [props.id]);

    const fetchImage = async () => {
        let resp = undefined;

        if (props.isGroup) {
            resp = await getGroupPhotoService(props.id);
        } else {
            resp = await getUserPhotoService(props.id);
        }

        loadImage(resp);
    };

    return (
        <div className="d-flex w-100 align-content-center">
            <RoundImage 
                src={ image } 
                size={ 44 } 
                title={ props.name }
                readOnly={ true }
                className="me-2 flex-shrink-0" />

            <div className="d-flex flex-column w-100"
                onClick={ props.onClick }
                role="button"
            >
                <strong>{ props.name }</strong>
                <small>{ props.description }</small>
            </div>
        </div>
    );
};

export default Avatar;