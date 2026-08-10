import Dexie from 'dexie'

let db

export function useDb() {
  if (!db) {
    db = new Dexie('pachineko')
    db.version(1).stores({
      halls: '++id, name',
      machines: '++id, name',
      records: '++id, hallId, machineId',
      periods: '++id, recordId'
    })
  }
  return db
}
