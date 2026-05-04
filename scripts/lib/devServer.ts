// scripts/lib/devServer.ts
// shared probe + early-exit for scripts that depend on a local dev/preview server

// probe a base URL; throws (w/ helpful hint) & exits if unreachable
export async function requireRunningServer(
  baseUrl: string,
  hint: string
): Promise<void>
{
  let reachable = false
  try
  {
    const res = await fetch(baseUrl)
    reachable = res.ok
  }
  catch
  {
    reachable = false
  }

  if (!reachable)
  {
    console.error(`\nServer not reachable at ${baseUrl}\n${hint}\n`)
    process.exit(1)
  }
}
