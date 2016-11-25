<template>
  <div>
    <a href="#" @click="reverseValue()">{{ value }}</a>
  </div>
</template>

<script>
export default {
  name: 'reverse',
  computed: {
    value() {
      return this.$store.state.value;
    },
  },
  methods: {
    reverseValue() {
      this.$store.dispatch('REVERSE',
        { value: this.$store.state.value });
    },
  },
};
</script>
