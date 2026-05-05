// scripts/lib/async.ts
// shared async control-flow helpers for repository scripts

export async function mapWithConcurrency<T, R>(
  items: ReadonlyArray<T>,
  limit: number,
  mapper: (item: T) => Promise<R>
): Promise<R[]>
{
  if (!Number.isInteger(limit) || limit < 1)
  {
    throw new RangeError('Concurrency limit must be a positive integer')
  }

  const results: R[] = new Array(items.length)
  let cursor = 0

  const workerCount = Math.min(limit, items.length)
  const workers = Array.from({ length: workerCount }, async () =>
  {
    while (cursor < items.length)
    {
      const index = cursor++
      results[index] = await mapper(items[index])
    }
  })

  await Promise.all(workers)
  return results
}
