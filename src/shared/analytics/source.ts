// src/shared/analytics/source.ts
// validates source labels shared by the browser & pages function

export const DIRECT_OR_UNKNOWN_SOURCE = 'direct/unknown'

const SOURCE_TAG = /^[a-z0-9][a-z0-9_-]{0,63}$/
const SOURCE_HOSTNAME =
  /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z][a-z0-9-]*[a-z0-9]$/

export function normalizeAnalyticsSource(value: string | null)
{
  const source = value?.trim().toLowerCase()
  if (!source || source.length > 120)
  {
    return undefined
  }

  if (
    source === DIRECT_OR_UNKNOWN_SOURCE ||
    SOURCE_TAG.test(source) ||
    SOURCE_HOSTNAME.test(source)
  )
  {
    return source
  }

  return undefined
}
