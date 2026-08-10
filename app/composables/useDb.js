import Dexie from 'dexie'

let db

export function useDb() {
  if (!db) {
    db = new Dexie('pachineko')
    db.version(1).stores({
      店舗: '++id, 店舗名',
      機種: '++id, 機種名',
      実績: '++id, 店舗ID, 機種ID',
      区間実績: '++id, 実績ID'
    })
  }
  return db
}
