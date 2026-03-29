// rules/file-header.js
// validates file headers match `// src/path/to/file.ts` pattern w/ description on line 2

const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce file header comments with path and description',
      category: 'Stylistic Issues',
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingHeader: 'File is missing a header comment with the file path',
      invalidPath:
        'File header path does not match actual file path. Expected: {{ expected }}',
      missingDescription: 'File header is missing a description on line 2',
    },
  },

  create(context)
  {
    const sourceCode = context.sourceCode ?? context.getSourceCode()
    const filename = context.filename ?? context.getFilename()

    return {
      Program(node)
      {
        const comments = sourceCode.getAllComments()
        const firstComment = comments[0]

        // get relative path from src/
        const srcIndex = filename.indexOf('src/')
        if (srcIndex === -1)
        {
          // file not in src/, skip validation
          return
        }
        const relativePath = filename.slice(srcIndex)

        // check if first comment exists & is on line 1
        if (!firstComment || firstComment.loc.start.line !== 1)
        {
          context.report({
            node,
            messageId: 'missingHeader',
            fix(fixer)
            {
              return fixer.insertTextBefore(node, `// ${relativePath}\n// \n\n`)
            },
          })
          return
        }

        // validate the path in the header
        if (firstComment.type !== 'Line')
        {
          context.report({
            node: firstComment,
            messageId: 'missingHeader',
          })
          return
        }

        const headerPath = firstComment.value.trim()
        if (headerPath !== relativePath)
        {
          context.report({
            node: firstComment,
            messageId: 'invalidPath',
            data: { expected: relativePath },
            fix(fixer)
            {
              return fixer.replaceText(firstComment, `// ${relativePath}`)
            },
          })
        }

        // check for description on line 2
        const secondComment = comments[1]
        if (
          !secondComment ||
          secondComment.loc.start.line !== 2 ||
          secondComment.type !== 'Line' ||
          secondComment.value.trim() === ''
        )
        {
          context.report({
            loc: { line: 2, column: 0 },
            messageId: 'missingDescription',
          })
        }
      },
    }
  },
}

export default rule
