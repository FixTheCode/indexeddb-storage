import { openDB, deleteDB, /* wrap, unwrap */ } from './with-async-ittr.js';

var DATABASE = "DemoDB";
var DATABASE_VERSION = 1;
var STORE_COUNTRY_LIST = 'country';
var db;

initDB();

export async function search(s) {
    var val = await searchCountry(s);
    return val;
}

export async function show() {
    var val = await showAllCountries();
    return val;
}

// create a local db of countries
async function initDB() {
    db = await openDB(DATABASE, DATABASE_VERSION, {
        upgrade(db) {
            // only create the object store if it does not aleady exist
            if (!db.objectStoreNames.contains(STORE_COUNTRY_LIST)) {
                const store = db.createObjectStore(STORE_COUNTRY_LIST, {
                keyPath: 'id', 
                autoIncrement: true
                });
                store.createIndex('code', 'code');
            }
        }
    });
    const data = getCountryList();
    const tx = await db.transaction(STORE_COUNTRY_LIST, 'readwrite');
    const store = tx.objectStore(STORE_COUNTRY_LIST);
    for(let item of data) {
        await store.add({data:item});
    }
    await tx.done;
}

// search for country
async function searchCountry(s) {
    if (s) {
        const db = await openDB(DATABASE, DATABASE_VERSION);
        const tx = db.transaction(STORE_COUNTRY_LIST, 'readonly');
        var result = 'No match';
        for await (const cursor of tx.store) {
            if (cursor.value.data.code === s.toUpperCase()) {
                return cursor.value.data.name;
            }
        }
        return result;
    }
}

// retrieve all data from country store
async function showAllCountries() {
    const db = await openDB(DATABASE, DATABASE_VERSION);
    const tx = db.transaction(STORE_COUNTRY_LIST, 'readonly');
    var result = [];
    //result = await db.getAllFromIndex(STORE_COUNTRY_LIST, 'code');
    for await (const cursor of tx.store) {
        result.push(cursor.value.data.code + ' ' + cursor.value.data.name);
    }
    return result;
}

async function deleteDatabase(name = string)
{
    await deleteDB(name);
}