<template>
  <div>
    <div class="area-chart">
      <h1>Example Area Chart</h1>
      <area-chart @select="onSelect"
        :data="data"
        :width="chartWidth"
        :height="300"
        :max="max" />
      <div class="content">
        <h3>Selected Value: {{currentValue}}</h3>
        <div>
          <label>Record Count: </label>
          <input v-model:value="itemCount" />
        </div>
        <div>
          <label>Min Value: </label>
          <input v-model:value="min" />
        </div>
        <div>
          <label>Max Value: </label>
          <input v-model:value="max" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* globals window */
import AreaChart from './AreaChart';
import generateData from '../randomData';

export default {
  name: 'demo',
  data() {
    return {
      data: [],
      chartWidth: 0,
      currentValue: null,
      itemCount: 25,
      min: 10,
      max: 100,
    };
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    setInterval(() => {
      this.data = generateData(this.itemCount,
        parseInt(this.min, 10),
        parseInt(this.max, 10));
    }, 2000);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      const chartContainer = this.$el.querySelector('.area-chart');
      this.chartWidth = chartContainer.offsetWidth;
    },
    onSelect(value) {
      this.currentValue = value;
    },
  },
  components: {
    AreaChart,
  },
};
</script>

<style lang="sass">
h1, .content
  margin-left: 20px

label
  display: inline-block
  width: 150px
</style>