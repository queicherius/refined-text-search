/* eslint-env node, mocha */
import {expect} from 'chai'
import module from '../src/index.js'

describe('my module', () => {
  it('should return the answer to life', async () => {
    let result = await module()
    expect(result).to.equal(42)
  })

  it('should be able to overwrite internals', async () => {
    module.__set__('answer', 'programming!')

    let result = await module()
    expect(result).to.equal('programming!')
  })
})
