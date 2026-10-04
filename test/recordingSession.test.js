import { beforeEach, describe, expect, it } from 'vitest'
import { resetDb, seedRecord } from './helpers.js'

describe('recordingSession.finishRecording（記録終了時の収支算出）', () => {
  beforeEach(async () => {
    await resetDb()
    localStorage.clear()
  })

  it('開始持玉10,000・最終持玉8,750・交換レート3.5で終了すると、収支は-4,375になる', async () => {
    const { recordId } = await seedRecord({
      record: { exchangeRate: 3.5, endTime: null },
      periods: [{ startHeldBalls: 10000, endHeldBalls: 8750, startRotations: 0, endRotations: 250 }]
    })
    const store = useRecordingSessionStore()
    store.start(recordId)

    await store.finishRecording(recordId)

    const record = await useDb().records.get(recordId)
    expect(record.finalHeldBalls).toBe(8750)
    expect(record.balance).toBe(-4375)
  })

  it('複数区間で貯玉・現金を投資し当選した場合、持玉収支×交換レート-総投資金額を収支として記録する', async () => {
    const { recordId } = await seedRecord({
      record: { exchangeRate: 3.5, endTime: null },
      periods: [
        { startTime: '2026-10-04T01:00:00.000Z', investment: 0, startHeldBalls: 2000, endHeldBalls: 0, endRotations: 100 },
        {
          startTime: '2026-10-04T02:00:00.000Z',
          investment: 5000,
          startRotations: 100,
          endRotations: 200,
          winType: 'rush',
          continueCount: 2,
          wonBalls: 6000,
          postWinHeldBalls: 6000,
          postWinRentalBalls: 0
        }
      ]
    })
    const store = useRecordingSessionStore()
    store.start(recordId)

    await store.finishRecording(recordId)

    const record = await useDb().records.get(recordId)
    // 持玉収支 = 6000 - 2000 = 4000、収支 = 4000 × 3.5 - 5000 = 9000
    expect(record.balance).toBe(9000)
  })

  it('小数点以下は四捨五入して記録する', async () => {
    const { recordId } = await seedRecord({
      record: { exchangeRate: 3.55, endTime: null },
      periods: [{ investment: 1000, startHeldBalls: 0, endHeldBalls: 301, endRotations: 30 }]
    })
    const store = useRecordingSessionStore()
    store.start(recordId)

    await store.finishRecording(recordId)

    const record = await useDb().records.get(recordId)
    // 301 × 3.55 - 1000 = 68.55 → 69
    expect(record.balance).toBe(69)
  })

  it('終了時刻を記録し、記録中セッションを破棄する', async () => {
    const { recordId } = await seedRecord({
      record: { endTime: null },
      periods: [{ investment: 1000, endRotations: 20 }]
    })
    const store = useRecordingSessionStore()
    store.start(recordId)

    await store.finishRecording(recordId)

    const record = await useDb().records.get(recordId)
    expect(record.endTime).toEqual(expect.any(String))
    expect(store.isRecording).toBe(false)
    expect(localStorage.getItem('pachineko:recordingSession')).toBeNull()
  })
})
