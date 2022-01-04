import React, { useEffect } from "react";
import { getToken, getID, clearLocalStorage } from "../services/token";
import { useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate();

    useEffect(() => {
        const token = getToken();

        if (token === null) {
            navigate("/sign-in");
        }
    }, [])

    const handleClick = (event) => {
        clearLocalStorage();
        navigate("/sign-in");
    }

    return (
        <div>
            <p>ID: { getID() }</p>
            <p>Token: { getToken() }</p>
            <button onClick={ handleClick }>Sair</button>
        </div>
    );
}

export default Home;