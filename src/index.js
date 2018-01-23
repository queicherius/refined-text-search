const pattern = /(-)?("[^"]*"|[^\s]+)/g

export function tokenize (query) {
  query = query.toLowerCase().trim()

  let results = []
  let matched

  // eslint-disable-next-line
  while (matched = pattern.exec(query)) {
    const prefix = matched[1]
    let term = matched[2]
    let result = {}

    // Strip quotes
    term = term.replace(/(^"|"$)/g, '')
    result.term = term

    // Set flags based on prefix
    if (prefix === '-') {
      result.exclude = true
    }

    results.push(result)
  }

  // Sort the results so the terms with the exclude flag are at the very start
  results.sort((a, b) => (a.exclude === b.exclude) ? 0 : a.exclude ? -1 : 1)

  return results
}

export function match (tokens, text) {
  text = text.toLowerCase()

  for (let i = 0; i !== tokens.length; i++) {
    const token = tokens[i]
    const match = text.indexOf(token.term) !== -1

    if (token.exclude && match) {
      return false
    }

    if (!token.exclude && !match) {
      return false
    }
  }

  return true
}
