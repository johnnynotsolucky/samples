import generated from './generated'

export default {
  name: 'svg',
  props: {
    name: String,
  },
  render(h) {
    return this.name
      ? h(generated[this.name])
      : h('div')
  }
}