<template>
  <div class="task-list-header">
    <div class="title">
      <h2>{{name}}</h2>
    </div>
    <div class="actions">
      <KbnButton type="text" @click="$emit('add')">
        <KbnIcon name="add" />
      </KbnButton>
    </div>
  </div>
</template>

<script>
import KbnButton from "../atoms/KbnButton";
import KbnIcon from "../atoms/KbnIcon";

export default {
  name: "KbnTaskListHeader",

  components: {
    KbnButton,
    KbnIcon
  },

  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.task-list-header {
  display: flex;
  border-bottom: thin solid black;
}

.title {
  flex: 1;
}

h2 {
  margin: 0;
  padding-left: 6px;
  font-size: 1em;
  text-align: left;
}

.actions {
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  cursor: pointer;
  font-size: 1.5em;
}
</style>