import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initDb = async () => {
    // new db 'contact_db' with v1
    openDB('contact_db', 1, {
        // add DB schema if it has not already been initialized
        upgrade(db) {
            if (db.objectStoreNames.contains('contacts')) {
                console.log('contact store already exists');
                return;
            }
            // create new object store for data with name 'id' and value ++
            db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
            console.log('contacts store created');
        }
    })
};

// GET
export const getDb = async () => {
    console.log('GET from db');
    // create connection to IndexedDB v1
    const contactDb = await openDB('contact_db', 1);
    // create new transaction and specifcy store/data privilages
    const tx = contactDb.rtransaction('contacts', 'readonly');
    // open desired object store
    const store = tx.objectStore('contacts');
    // use .getAll( ) to get all data from db
    const request = store.getAll();
    // confirm request
    const result = await request;
    console.log('result.value', result);
    return result;
};

// POST
export const postDb = async (name, email, phone, profile) => {
    console.log('POST to db');
    // create connection to db and specify v
    const contactDb = await openDB('contact_db', 1);
    // create new transaction and specify store/data privileges
    const tx = contactDb.transaction('contacts', 'readwrite');
    // open desired object store
    const store = tx.objectStore('contacts');
    // use .add( ) to store and pass in content
    const request = store.add({ name: name, email: email, phone: phone, profile: profile });
    // get confirmation of request
    const result = await request;
    console.log('🚀 - data saved to the database', result);
}

// DELETE
export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);
    // Create a connection to the IndexedDB database and the version we want to use.
    const contactDb = await openDB('contact_db', 1);
    // Create a new transaction and specify the store and data privileges.
    const tx = contactDb.transaction('contacts', 'readwrite');
    // Open up the desired object store.
    const store = tx.objectStore('contacts');
    // Use the .delete() method to get all data in the database.
    const request = store.delete(id);
    // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result?.value;
};

// EXPORTED EDIT function
export const editDb = async (id, name, email, phone, profile) => {
    console.log('PUT to the database');
    const contactDb = await openDB('contact_db', 1);
    const tx = contactDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');
    const request = store.put({ id: id, name: name, email: email, phone: phone, profile: profile });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  };