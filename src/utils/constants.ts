import {Database}from '@firebase/database';
export let fireDb: Database

export function setFireDb(db: Database) {
    fireDb = db
}
