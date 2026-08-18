export function useDbMigrations() {
  function periodsForRecord(periods, recordId) {
    return periods
      .filter((period) => period.recordId === recordId)
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
  }

  function migrateToV2({ machines, ...rest }) {
    return {
      ...rest,
      machines: machines.map((machine, index) => ({ ...machine, order: index }))
    }
  }

  function migrateToV3({ records, periods, ...rest }) {
    const { calcRecordAggregates } = useMetrics()
    return {
      ...rest,
      records: records.map((record) => {
        const { totalInvestedSavedBalls } = calcRecordAggregates(periodsForRecord(periods, record.id))
        return { ...record, totalInvestedSavedBalls }
      }),
      periods
    }
  }

  function migrateToV4({ records, periods, ...rest }) {
    const { calcRecordAggregates } = useMetrics()
    return {
      ...rest,
      records: records.map((record) => {
        const { totalBigWinCount } = calcRecordAggregates(periodsForRecord(periods, record.id))
        return { ...record, totalBigWinCount }
      }),
      periods
    }
  }

  const migrationsByVersion = {
    2: migrateToV2,
    3: migrateToV3,
    4: migrateToV4
  }

  function migrateTables(tables, fromVersion, toVersion) {
    let result = tables
    for (let version = fromVersion + 1; version <= toVersion; version++) {
      const migrate = migrationsByVersion[version]
      if (migrate) result = migrate(result)
    }
    return result
  }

  return { migrateToV2, migrateToV3, migrateToV4, migrateTables }
}
