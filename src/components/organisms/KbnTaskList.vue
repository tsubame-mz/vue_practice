<template>
  <div>
    <KbnTaskListHeader :name="name" @add="shown=true" />
    <ul>
      <li v-for="item in items" :key="item.id">
        <KbnTaskCard v-bind="item" @remove="onRemove" />
      </li>
    </ul>
    <KbnTaskForm v-if="shown" :list-id="id" @close="shown=false" />
  </div>
</template>

<script>
import KbnTaskListHeader from "../molecules/KbnTaskListHeader";
import KbnTaskCard from "../molecules/KbnTaskCard";
import KbnTaskForm from "../molecules/KbnTaskForm";

export default {
  name: "KbnTaskList",

  components: {
    KbnTaskListHeader,
    KbnTaskCard,
    KbnTaskForm
  },

  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      shown: false
    };
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul li {
  margin: 8px;
  padding: 4px;
  border: thin solid black;
  border-radius: 0.5em;
}
</style>