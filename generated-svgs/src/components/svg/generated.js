import codegen from 'babel-plugin-codegen/macro' // import/no-extraneous-dependencies

const svgs = codegen`
  const gen = require('./generateSvgComponents')
  module.exports = gen()
`

export default svgs
