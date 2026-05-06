// scripts/lib/devServer.ts
// shared probe + early-exit for scripts that depend on a local dev/preview server

const DEFAULT_TIMEOUT_MS = 15_000
const DEFAULT_INTERVAL_MS = 250

interface RequireRunningServerOptions
{
  timeoutMs?: number
  intervalMs?: number
}

// probe a base URL; throws (w/ helpful hint) & exits if unreachable
export async function requireRunningServer(
  baseUrl: string,
  hint: string,
  {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    intervalMs = DEFAULT_INTERVAL_MS,
  }: RequireRunningServerOptions = {}
): Promise<void>
{
  const startedAt = Date.now()

  while (Date.now() - startedAt <= timeoutMs)
  {
    if (await isServerReachable(baseUrl))
    {
      return
    }

    await sleep(intervalMs)
  }

  console.error(`\nServer not reachable at ${baseUrl}\n${hint}\n`)
  process.exit(1)
}

async function isServerReachable(baseUrl: string): Promise<boolean>
{
  try
  {
    const res = await fetch(baseUrl)
    return res.ok
  }
  catch
  {
    return false
  }
}

function sleep(ms: number): Promise<void>
{
  return new Promise((resolve) => setTimeout(resolve, ms))
}
