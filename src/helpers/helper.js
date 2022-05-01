export const readAsDataURL = (data) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        }
        reader.onerror = reject;
        reader.readAsDataURL(data);
    });
};