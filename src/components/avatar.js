import React, { useState, useEffect } from "react";
import { getUserPhotoService, getGroupPhotoService } from "../services/fileService";
import imgAvatar from "../assets/img/avatar.png";

const Avatar = (props) => {
    const [image, setImage] = useState(imgAvatar);

    useEffect(async () => {
        await fetchImage();
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

    const loadImage = (resp) => {
        if (resp.status === 200) {
            const reader = new FileReader();
            reader.readAsDataURL(resp.data);
            reader.onload = () => {
                const base64data = reader.result;
                setImage(base64data);
            };
        } else {
            setImage(imgAvatar);
        }
    };

    return (
        <div className="d-flex w-100 align-content-center">
            <img src={ image } className="img-avatar-list me-3"/>
            <div className="d-flex flex-column">
                <strong>{ props.name }</strong>
                <small>{ props.description }</small>
            </div>
        </div>
    );
};

export default Avatar;