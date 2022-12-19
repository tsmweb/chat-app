import { ContactStatus } from "../contexts/contact";
import moment from "moment";

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

export const contactStatusDescription = (contact) => {
    let description = "";
    const diff = moment(Date.now()).diff(contact.onlineAt, "days");
    
    if (contact.status === ContactStatus.ONLINE) {
        description = contact.status;
    } else if (diff === 0) {
        const onlineAt = moment(new Date(contact.onlineAt)).format("HH:mm");
        description = `visto por último hoje às ${onlineAt}`;
    }

    return description;
};