<template>
  <div>
    <a href="#" @click="dispatchFoobar()">{{ value }}</a>
  </div>
</template>

<script>
export default {
  name: 'simple',
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
