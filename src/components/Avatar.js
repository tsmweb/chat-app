import React, { useEffect } from "react";
import { useHttpRespImage } from "../hooks/hooks";
import * as fileService from "../services/file";
import RoundImage from "./RoundImage";
import imgAvatar from "../assets/img/avatar.png";

const Avatar = (props) => {
    const { image, loadImage } = useHttpRespImage(imgAvatar);

    useEffect(() => {
        (async () => {
            await fetchImage();
        })();
        // eslint-disable-next-line
    }, [props.id]);

    const fetchImage = async () => {
        if (props.id === undefined) {
            return
        }

        let resp = undefined;

        if (props.isGroup) {
            resp = await fileService.getGroupPhoto(props.id);
        } else {
            resp = await fileService.getUserPhoto(props.id);
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