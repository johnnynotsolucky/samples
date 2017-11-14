module.exports = function () {
  const fs = require('fs')
  const path = require('path')

  const svgs = fs.readdirSync(path.join(__dirname, '../../assets/svgs'))
    .filter(filename => /\.svg$/.exec(filename))
    .map(filename => {
      const name = filename.substring(0, filename.length - 4)
      return `{
        name: '${name}', component: () => require.ensure([], (require) => require('../../assets/svgs/${filename}'))
      }`
    })

  return `
    [${svgs.join(',')}]
      .reduce((acc, svg) => Object.assign({}, acc, { [svg.name]: svg.component }), {})
  `
}