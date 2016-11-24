<template>
  <div id="app">
    <simple />
  </div>
</template>

<script>
import Simple from './components/Simple';

export default {
  name: 'app',
  components: {
    Simple,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
