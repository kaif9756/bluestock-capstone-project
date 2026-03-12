const DB_NAME = "logicLooperDB"
const STORE_NAME = "puzzleProgress"
const DB_VERSION = 1

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)
        request.onupgradeneeded = function(event) {
            const db = event.target.result
            if(!db.objectStoreNames.contains(STORE_NAME)){
            db.createObjectStore(STORE_NAME)
        }
        
        }
        request.onsuccess = function(event) {
            resolve(event.target.result)
        }
        request.onerror = function() {
            reject("IndexedDB error")
        }
        
    })
}
// save progress
export async function saveProgress(key, data) {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, "readwrite")
    const store = tx.objectStore(STORE_NAME)
    store.put(data, key)
}
// load progress
export async function loadProgress(key) {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, "readonly")
    const store = tx.objectStore(STORE_NAME)
    return new Promise((resolve) => {
        const request = store.get(key)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => resolve(null)
    })
}