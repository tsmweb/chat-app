import { useState } from "react";

export function useHttpRespImage(defaultImage) {
    const [image, setImage] = useState(defaultImage);

    const loadImage = (resp) => {
        if (resp.status === 200) {
            const reader = new FileReader();
            reader.readAsDataURL(resp.data);
            reader.onload = () => {
                const base64data = reader.result;
                setImage(base64data);
            };
        } else {
            setImage(defaultImage);
        }   
    };

    return { image, loadImage };
};
