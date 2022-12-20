import React, { useState, useEffect } from "react";
import { Check, CheckAll } from "react-bootstrap-icons";
import ImageView from "./ImageView";

const Balloon = ({ className, isContact, message }) => {
    const [ack, setAck] = useState({type: "sent", color: "#5e5e5e"});
    const [isMedia, setIsMedia] = useState(false);
    const [media, setMedia] = useState({});

    useEffect(() => {
        if (message.content_type === "media") {
            setMedia(JSON.parse(message.content));
            setIsMedia(true);
        } else {
            setIsMedia(false);
        }

        switch (message.ack) {
            case "recv":
                setAck({type: "recv", color: "#5e5e5e"});
                break;
            case "read":
                setAck({type: "read", color: "#167bff"});
                break;
            default:
                setAck({type: "sent", color: "#5e5e5e"});

        }
    }, [message])

    return (
        <div className={ `chat-balloon ${className}` }>

            <div className="container-fluid p-1 ps-2 pe-2">
                
                <div>
                    <span className="font-strong">
                        { message.from }
                    </span>
                </div>

                {isMedia 
                ?   <div className="chat-balloon-media" role="button">
                        { media.type.includes("image") &&
                           <ImageView
                                src={ media.name } 
                                title={ message.from } /> }

                        { media.type.includes("video") && 
                            <span className="font-normal text-break">
                                { media.name }
                            </span>
                        }
                    </div>
                
                :   <div>
                        <span className="font-normal text-break">
                            { message.content }
                        </span>

                        <span style={{ 
                            width: "54px",
                            display: "inline-block",
                            verticalAlign: "middle"
                        }}></span>
                    </div>
                }
            
                <div className={isMedia ? "chat-balloon-media-footer" : "chat-balloon-footer"}>
                    <span className="p-1 font-small">
                        { message.hour }
                    </span>

                    {!isContact &&
                    <span style={{ fontSize: ".7em", color: `${ack.color}` }} className="p-0">
                        {ack.type === "sent" 
                            ? <Check size={18} />
                            : <CheckAll size={18} />}
                    </span>
                    }
                </div>

            </div>
           
        </div>
    );
};

export default Balloon;