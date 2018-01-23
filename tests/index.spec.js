/* eslint-env node, mocha */
import { expect } from 'chai'
import * as module from '../src/index.js'

const TEXT = `
Up am intention on dependent questions oh elsewhere september.
No betrayed pleasure possible jointure we in throwing.
And can event rapid any shall woman green.
`

function match (query) {
  query = module.tokenize(query)
  return module.match(query, TEXT)
}

describe('tokenize', () => {
  it('single word', async () => {
    expect(module.tokenize(' Dependent   ')).to.deep.equal([
      {term: 'dependent'}
    ])
  })

  it('multiple words', async () => {
    expect(module.tokenize('on dependent')).to.deep.equal([
      {term: 'on'},
      {term: 'dependent'}
    ])
  })

  it('multiple words with lots of spaces', async () => {
    expect(module.tokenize('   on          dependent       ')).to.deep.equal([
      {term: 'on'},
      {term: 'dependent'}
    ])
  })

  it('single phrase', async () => {
    expect(module.tokenize('"on dependent"')).to.deep.equal([
      {term: 'on dependent'}
    ])
  })

  it('multiple phrases', async () => {
    expect(module.tokenize('"on dependent" "herp di derp" "flerp"')).to.deep.equal([
      {term: 'on dependent'},
      {term: 'herp di derp'},
      {term: 'flerp'}
    ])
  })

  it('exclude', async () => {
    expect(module.tokenize('-herp -"herp derp"')).to.deep.equal([
      {term: 'herp', exclude: true},
      {term: 'herp derp', exclude: true}
    ])
  })

  it('kitchen sink', async () => {
    expect(module.tokenize('"Hello World" my dear -"how are you" -horrible oh')).to.deep.equal([
      {term: 'how are you', exclude: true},
      {term: 'horrible', exclude: true},
      {term: 'hello world'},
      {term: 'my'},
      {term: 'dear'},
      {term: 'oh'}
    ])
  })
})

describe('match', () => {
  it('single word', async () => {
    expect(match('dependent')).to.equal(true)
    expect(match('up')).to.equal(true)
    expect(match('herp')).to.equal(false)
  })

  it('multiple words', async () => {
    expect(match('dependent pleasure')).to.equal(true)
    expect(match('dependent herp')).to.equal(false)
    expect(match('herp derp')).to.equal(false)
  })

  it('single phrase', async () => {
    expect(match('"dependent questions"')).to.equal(true)
    expect(match('"dependent pleasure"')).to.equal(false)
  })

  it('multiple phrases', async () => {
    expect(match('"dependent questions" "in throwing"')).to.equal(true)
    expect(match('"dependent pleasure" "in throwing"')).to.equal(false)
    expect(match('"dependent pleasure" "in throwing" "shall green"')).to.equal(false)
  })

  it('exclude', async () => {
    expect(match('-herp')).to.equal(true)
    expect(match('-"possible throwing"')).to.equal(true)
    expect(match('-pleasure')).to.equal(false)
    expect(match('-"pleasure possible"')).to.equal(false)
  })

  it('kitchen sink', async () => {
    expect(match('"possible jointure" -"herp derp" -derp woman')).to.equal(true)
    expect(match('-"possible jointure" -"herp derp" -derp woman')).to.equal(false)
    expect(match('"possible jointure" -"herp derp" -derp -woman')).to.equal(false)
    expect(match('"possible jointure" "herp derp" -derp woman')).to.equal(false)
    expect(match('"possible jointure" -"herp derp" derp woman')).to.equal(false)
  })
})
