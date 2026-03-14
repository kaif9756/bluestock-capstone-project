import { openDB } from "idb";

export const dbPromise = openDB("puzzle-db", 1, {
  upgrade(db) {

    if (!db.objectStoreNames.contains("activity")) {
      db.createObjectStore("activity", { keyPath: "date" });
    }

  }
});

// Save activity + prepare sync
export async function saveActivity(entry) {

  const db = await dbPromise;

  await db.put("activity", entry);

  const pending = JSON.parse(localStorage.getItem("pendingSync")) || [];

  pending.push(entry);

  localStorage.setItem("pendingSync", JSON.stringify(pending));

}

// Get all activities
export async function getAllActivity() {

  const db = await dbPromise;

  return db.getAll("activity");

}