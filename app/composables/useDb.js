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
      const machines = await tx.table('machines').toArray()
      await Promise.all(machines.map((machine, index) => tx.table('machines').update(machine.id, { order: index })))
    })
  }
  return db
}
