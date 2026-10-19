// src/sections/writing/components/WritingList.tsx
// published articles list for the home page

import { ARTICLES, WRITING_CONTENT } from '~/content/writing'
import { InteractiveCard } from '~/shared/components/layout/InteractiveCard'
import { StaggeredItem } from '~/shared/components/layout/StaggeredItem'
import { MediumIcon } from '~/shared/components/ui/icons'
import { ANIMATION_DELAYS } from '~/shared/utils/animationConfig'
import { formatYearMonth } from '~/shared/utils/dateSpan'

// compact article rows styled to match the education rows above
export function WritingList()
{
  return (
    <section aria-labelledby="writing-heading">
      <h2 id="writing-heading" className="sr-only">
        {WRITING_CONTENT.heading}
      </h2>
      <div className="space-y-2">
        {ARTICLES.map((article, index) => (
          <StaggeredItem
            key={article.id}
            baseDelay={ANIMATION_DELAYS.writing.base}
            stepDelay={ANIMATION_DELAYS.writing.step}
            index={index}
          >
            <InteractiveCard
              href={article.url}
              contentClassName="flex items-center gap-3"
              withHoverBackdrop
            >
              <MediumIcon
                size={20}
                className="mx-3.5 shrink-0 text-[var(--muted)]"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-[var(--white)] transition-colors sm:truncate lg:group-hover:text-[var(--yellow)]">
                  {article.title}
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  {article.publisher}
                  <span className="px-1.5">·</span>
                  {formatYearMonth(article.published)}
                </p>
              </div>
            </InteractiveCard>
          </StaggeredItem>
        ))}
      </div>
    </section>
  )
}
