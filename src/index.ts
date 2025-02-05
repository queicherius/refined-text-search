const pattern = /(=|-)?("[^"]*"|[^\s]+)/g

interface OrClause {
  or: true
  children: Array<Array<Token>>
}

interface Token {
  term: string
  exclude?: boolean
  exact?: boolean
}

export function tokenize(query: string): Array<OrClause | Token> {
  query = query.toLowerCase().trim()

  const orClauses = query.split(/ or | \| /)

  if (orClauses.length === 1) {
    return tokenizeClause(orClauses[0])
  }

  return [{ or: true, children: orClauses.map(tokenizeClause) }]
}

export function tokenizeClause(query: string) {
  const tokens: Array<Token> = []
  let matched

  while ((matched = pattern.exec(query))) {
    const prefix = matched[1]
    let term = matched[2]

    // Strip quotes
    term = term.replace(/(^"|"$)/g, '')

    // Set flags based on prefix
    const exclude = prefix === '-' ? true : undefined
    const exact = prefix === '=' ? true : undefined

    tokens.push({
      term,
      ...(exclude ? { exclude } : {}),
      ...(exact ? { exact } : {}),
    })
  }

  // Sort the results so the terms with the exclude flag are at the very start
  tokens.sort((a, b) => (a.exclude === b.exclude ? 0 : a.exclude ? -1 : 1))

  return tokens
}

export function match(tokens: Array<OrClause | Token>, text: string): boolean {
  text = text.replace(/\s+/g, ' ').trim().toLowerCase()

  for (let i = 0; i !== tokens.length; i++) {
    const token = tokens[i]

    if ('or' in token) {
      return token.children.some((childTokens) => match(childTokens, text))
    }

    const textMatch = token.exact ? text === token.term : text.indexOf(token.term) !== -1

    if (token.exclude && textMatch) {
      return false
    }

    if (!token.exclude && !textMatch) {
      return false
    }
  }

  return true
}
