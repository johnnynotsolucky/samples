<template>
  <div id="app">
    <demo />
  </div>
</template>

<script>
import Demo from './components/Demo';

export default {
  name: 'app',
  components: {
    Demo,
  },
};
</script>

<style lang="sass">
body
  margin: 0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  margin-top: 60px
</style>
