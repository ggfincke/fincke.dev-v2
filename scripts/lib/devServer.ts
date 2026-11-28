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
  const deadline = Date.now() + timeoutMs

  // every probe & pause is cut to the time left, so a server that accepts
  // the connection but never answers can't outlast the timeout
  for (
    let remaining = timeoutMs;
    remaining > 0;
    remaining = deadline - Date.now()
  )
  {
    if (await isServerReachable(baseUrl, remaining))
    {
      return
    }

    await sleep(Math.min(intervalMs, Math.max(deadline - Date.now(), 0)))
  }

  console.error(`\nServer not reachable at ${baseUrl}\n${hint}\n`)
  process.exit(1)
}

async function isServerReachable(
  baseUrl: string,
  timeoutMs: number
): Promise<boolean>
{
  try
  {
    const res = await fetch(baseUrl, {
      signal: AbortSignal.timeout(timeoutMs),
    })
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
