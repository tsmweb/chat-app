export const setToken = (auth) => {
    localStorage.setItem("token", auth.token);
    localStorage.setItem("userID", auth.userID);
    localStorage.setItem("userName", auth.userName);
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const getUserID = () => {
    return localStorage.getItem("userID");
}

export const getUserName = () => {
    return localStorage.getItem("userName");
}

export const clearLocalStorage = () => {
    return localStorage.clear();
}