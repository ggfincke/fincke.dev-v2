// scripts/lib/cliFormat.ts
// shared text-table & section-header formatting helpers for CLI scripts

// join sources into a single pipe-delimited string for display
export function formatSources(sources: ReadonlyArray<string>): string
{
  return sources.join(' | ')
}

// emit a leading newline + N-wide '=' separator line
export function printDivider(width = 80): void
{
  console.log('\n' + '='.repeat(width))
}

// emit a labeled section header (newline + "Title:" + dashes underneath)
export function printSection(title: string, width = 88): void
{
  console.log(`\n${title}:`)
  console.log('-'.repeat(width))
}

// table column descriptor — pad column to `width` chars (last column may omit width)
export interface PrintTableColumn<T>
{
  header: string
  width?: number
  format: (row: T) => string
}

// render a fixed-width table w/ header + separator rows
export function printTable<T>(
  rows: ReadonlyArray<T>,
  columns: ReadonlyArray<PrintTableColumn<T>>
): void
{
  const totalWidth = columns.reduce(
    (sum, col) => sum + (col.width ?? col.header.length),
    0
  )

  const headerLine = columns
    .map((col) =>
      col.width !== undefined ? col.header.padEnd(col.width) : col.header
    )
    .join('')
  console.log(headerLine)
  console.log('-'.repeat(totalWidth))

  for (const row of rows)
  {
    const line = columns
      .map((col) =>
      {
        const cell = col.format(row)
        return col.width !== undefined ? cell.padEnd(col.width) : cell
      })
      .join('')
    console.log(line)
  }
}
