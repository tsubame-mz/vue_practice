<template>
  <p>KbnTaskDetailForm</p>
</template>

<script>
export default {
  name: "KbnTaskDetailForm",

  props: {
    task: {
      type: Object,
      required: true,
      default: () => {}
    },
    update: {
      type: Function,
      required: true
    }
  }
};
</script>

<style scoped>
</style>