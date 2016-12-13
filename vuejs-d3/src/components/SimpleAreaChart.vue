<template>
  <svg width="250" height="250">
    <g style="transform: translate(0, 10px)">
      <path class="line" :d="line" />
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3';

const data = [99, 71, 78, 25, 36, 92];

export default {
  name: 'simple-area-chart',
  data() {
    return {
      line: '',
    };
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      const x = d3
        .scaleTime()
        .range([0, 250]);
      const y = d3
        .scaleLinear()
        .range([230, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain([0, data.length]);
      y.domain([0, 100]);
      const path = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d));

      this.line = path(data);
    },
  },
};
</script>

<style lang="sass" scoped>
svg
  margin: 25px;

.line
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>
