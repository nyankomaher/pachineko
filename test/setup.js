import { indexedDB, IDBKeyRange } from 'fake-indexeddb'
import Dexie from 'dexie'

// Dexie はモジュール読み込み時点の globalThis.indexedDB を参照するため、明示的に差し替える
Dexie.dependencies.indexedDB = indexedDB
Dexie.dependencies.IDBKeyRange = IDBKeyRange
