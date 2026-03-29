// rules/comment-style-guide.js
// enforces `&` instead of "and" & `w/` instead of "with" in comments

const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce comment style abbreviations (& for and, w/ for with)',
      category: 'Stylistic Issues',
    },
    fixable: 'code',
    schema: [],
    messages: {
      useAmpersand: 'Use "&" instead of "and" in comments',
      useWith: 'Use "w/" instead of "with" in comments',
    },
  },

  create(context)
  {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    // regex patterns for standalone words
    const andPattern = /\band\b/gi
    const withPattern = /\bwith\b/gi

    return {
      Program()
      {
        const comments = sourceCode.getAllComments()

        for (const comment of comments)
        {
          const text = comment.value

          // check for "&" violations
          andPattern.lastIndex = 0
          if (andPattern.test(text))
          {
            andPattern.lastIndex = 0
            context.report({
              loc: comment.loc,
              messageId: 'useAmpersand',
              fix(fixer)
              {
                const newText = text.replace(andPattern, '&')
                if (comment.type === 'Line')
                {
                  return fixer.replaceText(comment, `//${newText}`)
                }
                else
                {
                  return fixer.replaceText(comment, `/*${newText}*/`)
                }
              },
            })
          }

          // check for "w/" violations
          withPattern.lastIndex = 0
          if (withPattern.test(text))
          {
            withPattern.lastIndex = 0
            context.report({
              loc: comment.loc,
              messageId: 'useWith',
              fix(fixer)
              {
                const newText = text.replace(withPattern, 'w/')
                if (comment.type === 'Line')
                {
                  return fixer.replaceText(comment, `//${newText}`)
                }
                else
                {
                  return fixer.replaceText(comment, `/*${newText}*/`)
                }
              },
            })
          }
        }
      },
    }
  },
}

export default rule
