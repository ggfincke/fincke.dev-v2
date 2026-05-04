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

    const andPattern = /\band\b/gi
    const withPattern = /\bwith\b/gi

    function getReplacement(text, pattern, replacement)
    {
      pattern.lastIndex = 0
      const nextText = text.replace(pattern, replacement)
      return nextText === text ? null : nextText
    }

    function replaceCommentText(fixer, comment, nextText)
    {
      if (comment.type === 'Line')
      {
        return fixer.replaceText(comment, `//${nextText}`)
      }

      return fixer.replaceText(comment, `/*${nextText}*/`)
    }

    return {
      Program()
      {
        const comments = sourceCode.getAllComments()

        for (const comment of comments)
        {
          const text = comment.value
          const textWithoutAnd = getReplacement(text, andPattern, '&')

          if (textWithoutAnd)
          {
            context.report({
              loc: comment.loc,
              messageId: 'useAmpersand',
              fix(fixer)
              {
                return replaceCommentText(fixer, comment, textWithoutAnd)
              },
            })
          }

          const textWithoutWith = getReplacement(text, withPattern, 'w/')

          if (textWithoutWith)
          {
            context.report({
              loc: comment.loc,
              messageId: 'useWith',
              fix(fixer)
              {
                return replaceCommentText(fixer, comment, textWithoutWith)
              },
            })
          }
        }
      },
    }
  },
}

export default rule
