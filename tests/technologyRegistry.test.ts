// tests/technologyRegistry.test.ts
// critical coverage for the canonical technology registry

import { describe, expect, it } from 'vitest'

import { WORK_EXPERIENCE } from '~/content/experience'
import { projects } from '~/content/projects'
import {
  getTechnology,
  getTechnologyBackgroundColor,
  getTechnologyColor,
  getTechnologyIds,
  getTechnologyTerms,
  resolveTechnologyId,
} from '~/content/technologies'

import { TECHNOLOGY_ALIAS_CASES } from '~/tests/fixtures'

describe('technology registry', () =>
{
  it('keeps ids, labels, and aliases unique', () =>
  {
    const technologyIds = getTechnologyIds()
    const labels = technologyIds.map(
      (technologyId) => getTechnology(technologyId).label
    )
    const seenTerms = new Set<string>()

    expect(new Set(technologyIds).size).toBe(technologyIds.length)
    expect(new Set(labels).size).toBe(labels.length)

    for (const technologyId of technologyIds)
    {
      for (const term of getTechnologyTerms(technologyId))
      {
        const normalizedTerm = term.toLowerCase()

        expect(
          seenTerms.has(normalizedTerm),
          `duplicate technology term: ${term}`
        ).toBe(false)

        seenTerms.add(normalizedTerm)
      }
    }
  })

  it('covers every technology referenced by runtime content', () =>
  {
    const technologyIds = new Set(getTechnologyIds())
    const referencedTechnologies = new Set([
      ...projects.flatMap((project) => project.technologies),
      ...WORK_EXPERIENCE.flatMap((job) => job.technologies ?? []),
    ])

    for (const technologyId of referencedTechnologies)
    {
      expect(
        technologyIds.has(technologyId),
        `missing technology id: ${technologyId}`
      ).toBe(true)
    }
  })

  it('resolves canonical aliases used by authored content', () =>
  {
    for (const [alias, technologyId] of TECHNOLOGY_ALIAS_CASES)
    {
      expect(resolveTechnologyId(alias)).toBe(technologyId)
    }
  })

  it('provides color mappings for every canonical technology', () =>
  {
    for (const technologyId of getTechnologyIds())
    {
      expect(getTechnologyColor(technologyId)).toMatch(/^var\(--.+\)$/)
      expect(getTechnologyBackgroundColor(technologyId)).toMatch(
        /^var\(--.+\)$/
      )
    }
  })
})
