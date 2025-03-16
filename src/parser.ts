const newlines = /\r?\n/

// parse #region and #endregion
export function parseRegions(input: string): Record<string, string> {
  const lines = input.split(newlines)
  const results = {}
  let key = null

  for(const line of lines) {
    if(line.startsWith('#region')) {
      if(key) results[key] = results[key].join('\n').trim()
      key = line.replace('#region', '').match(/\w+/)?.[0].trim()
      if(key) results[key] = []
    }

    else if(line.startsWith('#endregion') && key) {
      results[key] = results[key].join('\n')
      key = null
    }

    else if(key) results[key].push(line)
  }

  return results
}


// basic markdown parser for top-level headings
interface MarkdownData {
  heading: string
  content: string
}

export function parseMarkdown(input: string, mapCallback?: (data: MarkdownData) => any) {
  const lines = input.split(newlines)
  let results = []
  let insideCodeBlock = false

  for (const line of lines) {
    if(line.startsWith('```')) {
      insideCodeBlock = !insideCodeBlock
    }

    // check for new regions
    if (line.startsWith('# ') && !insideCodeBlock) {
      const data: MarkdownData = {
        heading: line.slice(2),
        content: ''
      }
      results.push(data)
    }

    else if (results.length) {
      let current = results.at(-1)
      current.content += (current.content.length? '\n': '') + line
    }
  }

  if(mapCallback) results = results.map(mapCallback)
  return results
}