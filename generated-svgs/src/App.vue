<template>
  <div id="app">
    <select v-model="selectedName">
      <option disabled value="">Select an SVG</option>
      <option v-for="name in names" :key="name">{{name}}</option>
    </select>
    <div class="svg-wrapper">
      <svg-loader :name="selectedName" />
    </div>
  </div>
</template>

<script>
import generated from './components/svg/generated'
import SvgLoader from './components/svg/SvgLoader'

export default {
  name: 'app',
  data: () => ({
    names: Object.keys(generated),
    selectedName: '',
    checked: false
  }),
  components: {
    SvgLoader,
    VueLogo: () => import('./assets/svgs/vue.svg')
  },
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.svg-wrapper {
  width: 150px;
}
</style>
