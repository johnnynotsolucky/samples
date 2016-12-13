<template>
  <svg @mousemove="mouseover" :width="width" :height="height">
    <g :style="{transform: `translate(${margin.left}px, ${margin.top}px)`}">
      <path class="area" :d="paths.area" />
      <path class="line" :d="paths.line" />
      <path class="selector" :d="paths.selector" />
    </g>
  </svg>
</template>

<script>
/* globals window, requestAnimationFrame */
import * as d3 from 'd3';
import TWEEN from 'tween.js';

const props = {
  data: {
    type: Array,
    default: () => [],
  },
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  margin: {
    type: Object,
    default: () => ({
      left: 0,
      right: 0,
      top: 10,
      bottom: 10,
    }),
  },
  max: {
    type: Number,
    default: 100,
  },
};

export default {
  name: 'area-chart',
  props,
  data() {
    return {
      paths: {
        area: '',
        line: '',
        selector: '',
      },
      lastHoverPoint: {},
      scaled: {
        x: null,
        y: null,
      },
      animatedData: [],
      points: [],
    };
  },
  computed: {
    actualDims() {
      const width = this.width - this.margin.left - this.margin.right;
      const height = this.height - this.margin.top - this.margin.bottom;
      return { width, height };
    },
  },
  watch: {
    data: function dataChanged(newData, oldData) {
      const vm = this;
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      new TWEEN.Tween(oldData)
        .easing(TWEEN.Easing.Quadratic.Out)
        .to(newData, 500)
        .onUpdate(function onUpdate() {
          vm.animatedData = this;
          vm.render();
        })
        .start();
      animate();
    },
    width: function widthChanged() {
      this.initialize();
      this.render();
    },
  },
  methods: {
    createArea: d3.area()
      .x(d => d.x)
      .y0(d => d.max)
      .y1(d => d.y),
    createLine: d3.line()
      .x(d => d.x)
      .y(d => d.y),
    createValueSelector: d3.area()
      .x(d => d.x)
      .y0(d => d.max)
      .y1(0),
    initialize() {
      this.scaled.x = d3.scaleLinear().range([0, this.actualDims.width]);
      this.scaled.y = d3.scaleLinear().range([this.actualDims.height, 0]);
      d3.axisLeft().scale(this.scaled.x);
      d3.axisBottom().scale(this.scaled.y);
    },
    render() {
      this.scaled.x.domain(d3.extent(this.data, (d, i) => i));
      this.scaled.y.domain([0, this.max]);
      this.points = [];
      for (const [i, d] of this.animatedData.entries()) {
        this.points.push({
          x: this.scaled.x(i),
          y: this.scaled.y(d),
          max: this.height,
        });
      }
      this.paths.area = this.createArea(this.points);
      this.paths.line = this.createLine(this.points);
    },
    mouseover({ offsetX }) {
      if (this.points.length > 0) {
        const x = offsetX - this.margin.left;
        const closestPoint = this.getClosestPoint(x);
        if (this.lastHoverPoint.index !== closestPoint.index) {
          const point = this.points[closestPoint.index];
          this.paths.selector = this.createValueSelector([point]);
          this.$emit('select', this.data[closestPoint.index]);
          this.lastHoverPoint = closestPoint;
        }
      }
    },
    getClosestPoint(x) {
      return this.points
        .map((point, index) => ({ x:
          point.x,
          diff: Math.abs(point.x - x),
          index,
        }))
        .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
    },
  },
};
</script>

<style lang="sass">
.area
  fill: #76BF8A

.line
  stroke: #4F7F5C
  stroke-width: 1px
  fill: none

.selector
  stroke: #28402E
  stroke-width: 3px
  fill: none
</style>
