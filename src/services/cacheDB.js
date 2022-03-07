import * as idb from "idb";

const DB_NAME = "chat-store";
const DB_VERSION = 1;

const PROFILE_STORE = "profiles";
const CONTACT_STORE = "contacts";
const CHAT_STORE = "chats";

window.addEventListener("unhandledrejection", event => {
    alert("Error: " + event.reason.message);
});

let db;

const initDB = async () => {    
    db = await idb.openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            db.createObjectStore(PROFILE_STORE, {keyPath: "id"});
            db.createObjectStore(CONTACT_STORE, {keyPath: "id"});

            const chatStore = db.createObjectStore(CHAT_STORE, {keyPath: "id"});
            chatStore.createIndex("from_idx", "from");
            chatStore.createIndex("to_idx", "to");
            chatStore.createIndex("group_idx", "group");
        },
    });
};

initDB();

/* PROFILE */
export const addProfile = async (profile) => {
    return await db.put(PROFILE_STORE, profile);
};

export const getProfile = async (id) => {    
    return await db.get(PROFILE_STORE, id);
};

/* CONTACT */
export const addContact = async (contact) => {
    return await db.put(CONTACT_STORE, contact);
};

export const addContacts = async (contacts) => {
    const tx = db.transaction(CONTACT_STORE,  "readwrite");
    const op = [];

    for (let contact of contacts) {
        op.push(tx.store.add(contact));  
    }
    
    op.push(tx.done);

    return await Promise.all(op);
};

export const deleteContact = async (id) => {
    return await db.delete(CONTACT_STORE, id);
};

export const clearContacts = async () => {
    return await db.clear(CONTACT_STORE);
};

export const getAllContacts = async () => {
    return await db.getAll(CONTACT_STORE);
};

/* CHAT MESSAGE */
export const addChatMessage = async (message) => {
    return await db.add(CHAT_STORE, message);
};

export const deleteChatMessage = async (id) => {
    return await db.delete(CHAT_STORE, id);
};

// export const getChatMessage = async (contactID) => {
//     //TODO
// };
