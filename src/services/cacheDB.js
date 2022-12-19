import * as idb from "idb";

const DB_NAME = "chat-store";
const DB_VERSION = 1;

const PROFILE_STORE = "profiles";
const CONTACT_STORE = "contacts";
const CHAT_STORE = "chats";

const CHAT_TAG_INDEX = "tag_idx";
const CHAT_GROUP_INDEX = "group_idx";

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
            chatStore.createIndex(CHAT_TAG_INDEX, "tag");
            chatStore.createIndex(CHAT_GROUP_INDEX, "group");
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

export const getContact = async (id) => {    
    return await db.get(CONTACT_STORE, id);
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
export const addMessage = async (message) => {
    return await db.put(CHAT_STORE, message);
};

export const getMessage = async (id) => {    
    return await db.get(CHAT_STORE, id);
};

export const getAllContactMessages = async (tag) => {
    return await db.getAllFromIndex(CHAT_STORE, CHAT_TAG_INDEX, tag);
};

export const getAllGroupMessages = async (group) => {
    return await db.getAllFromIndex(CHAT_STORE, CHAT_GROUP_INDEX, group);
};

export const deleteContactMessages = async (tag) => {
    const tx = db.transaction(CHAT_STORE,  "readwrite");
    const index = tx.store.index(CHAT_TAG_INDEX)

    for await (const cursor of index.iterate(tag)) {
        const id = cursor.primaryKey;
        cursor.delete(id);
    }

    await tx.done;
};

export const deleteGroupMessages = async (group) => {
    const tx = db.transaction(CHAT_STORE,  "readwrite");
    const index = tx.store.index(CHAT_GROUP_INDEX)

    for await (const cursor of index.iterate(group)) {
        const id = cursor.primaryKey;
        cursor.delete(id);
    }

    await tx.done;
};
