import React from "react";
import ProfileImage from "./ProfileImage";

const Avatar = ({ profile, onClick }) => {

    return (
        <div className="d-flex w-100 align-content-center">
            <ProfileImage 
                profile={ profile } 
                size={ 44 } 
                readOnly={ true }
                className="me-2 flex-shrink-0" />

            <div className="d-flex flex-column w-100"
                onClick={ onClick }
                role="button"
            >
                <strong>{ `${profile.name} ${profile.lastname}` }</strong>
                <small>{ profile.description }</small>
            </div>
        </div>
    );
};

export default Avatar;