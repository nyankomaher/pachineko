import Dexie from 'dexie'

let db

export function useDb() {
  if (!db) {
    db = new Dexie('pachineko')
    db.version(1).stores({
      halls: '++id, name, order',
      machines: '++id, name',
      records: '++id, hallId, machineId',
      periods: '++id, recordId'
    })
    db.version(2).stores({
      halls: '++id, name, order',
      machines: '++id, name, order',
      records: '++id, hallId, machineId',
      periods: '++id, recordId'
    }).upgrade(async (tx) => {
      const { migrateToV2 } = useDbMigrations()
      const machines = await tx.table('machines').toArray()
      const { machines: migrated } = migrateToV2({ machines })
      await Promise.all(migrated.map((machine) => tx.table('machines').put(machine)))
    })
    db.version(3).stores({
      halls: '++id, name, order',
      machines: '++id, name, order',
      records: '++id, hallId, machineId',
      periods: '++id, recordId'
    }).upgrade(async (tx) => {
      const { migrateToV3 } = useDbMigrations()
      const records = await tx.table('records').toArray()
      const periods = await tx.table('periods').toArray()
      const { records: migrated } = migrateToV3({ records, periods })
      await Promise.all(migrated.map((record) => tx.table('records').put(record)))
    })
    db.version(4).stores({
      halls: '++id, name, order',
      machines: '++id, name, order',
      records: '++id, hallId, machineId',
      periods: '++id, recordId'
    }).upgrade(async (tx) => {
      const { migrateToV4 } = useDbMigrations()
      const records = await tx.table('records').toArray()
      const periods = await tx.table('periods').toArray()
      const { records: migrated } = migrateToV4({ records, periods })
      await Promise.all(migrated.map((record) => tx.table('records').put(record)))
    })
  }
  return db
}
