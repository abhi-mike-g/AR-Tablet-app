import { openDB } from 'idb';

const dbPromise = openDB('slides-ar', 1, {
  upgrade(db) {
    db.createObjectStore('captures', { keyPath: 'id', autoIncrement: true });
  }
});

export async function saveCapture(payload: {
  imgBlob: Blob; prep: Float32Array; created: number;
}) {
  (await dbPromise).add('captures', payload);
}

export const listCaptures = async () => (await dbPromise).getAll('captures');
