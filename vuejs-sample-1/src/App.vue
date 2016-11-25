<template>
  <div id="app">
    <reverse />
    <list />
  </div>
</template>

<script>
import Reverse from './components/Reverse';
import List from './components/List';

export default {
  name: 'app',
  components: {
    Reverse,
    List,
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
ul {
  list-style: none;
}
</style>
