// tests/async.test.ts
// coverage for shared script async helpers

import { describe, expect, it } from 'vitest'

import { mapWithConcurrency } from '../scripts/lib/async'

describe('script async helpers', () =>
{
  it('preserves input ordering when work resolves out of order', async () =>
  {
    const release: Array<() => void> = []

    const resultPromise = mapWithConcurrency([1, 2, 3], 3, async (item) =>
    {
      await new Promise<void>((resolve) =>
      {
        release[item] = resolve
      })

      return item * 10
    })

    release[3]()
    release[1]()
    release[2]()

    await expect(resultPromise).resolves.toEqual([10, 20, 30])
  })

  it('never exceeds the configured concurrency limit', async () =>
  {
    let active = 0
    let maxActive = 0

    await mapWithConcurrency([1, 2, 3, 4, 5, 6], 2, async (item) =>
    {
      active += 1
      maxActive = Math.max(maxActive, active)

      await new Promise((resolve) => setTimeout(resolve, 0))

      active -= 1
      return item
    })

    expect(maxActive).toBe(2)
  })

  it('passes item indexes to the mapper', async () =>
  {
    await expect(
      mapWithConcurrency(
        ['a', 'b', 'c'],
        2,
        async (item, index) => `${index}:${item}`
      )
    ).resolves.toEqual(['0:a', '1:b', '2:c'])
  })

  it('returns an empty result for empty input', async () =>
  {
    await expect(
      mapWithConcurrency([], 3, async () => 'unreachable')
    ).resolves.toEqual([])
  })

  it('rejects invalid concurrency limits clearly', async () =>
  {
    await expect(
      mapWithConcurrency([1], 0, async (item) => item)
    ).rejects.toThrow(
      new RangeError('Concurrency limit must be a positive integer')
    )

    await expect(
      mapWithConcurrency([1], 1.5, async (item) => item)
    ).rejects.toThrow(
      new RangeError('Concurrency limit must be a positive integer')
    )
  })
})
