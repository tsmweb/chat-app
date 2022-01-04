export const setToken = (auth) => {
    localStorage.setItem("token", auth.token);
    localStorage.setItem("id", auth.id);
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const getID = () => {
    return localStorage.getItem("id");
}

export const clearLocalStorage = () => {
    return localStorage.clear();
}