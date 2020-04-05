<template>
  <div class="task-card">
    <div class="name">
      <!-- <router-link> -->
      <h3>{{name}}</h3>
      <!-- </router-link> -->
    </div>
    <div class="actions">
      <KbnButton type="text" @click="$emit('remove', {id, listId})">
        <KbnIcon name="remove" />
      </KbnButton>
    </div>
  </div>
</template>

<script>
import KbnButton from "../atoms/KbnButton";
import KbnIcon from "../atoms/KbnIcon";

export default {
  name: "KbnTaskCard",

  components: {
    // eslint-disable-next-line vue/no-unused-components
    KbnButton,
    // eslint-disable-next-line vue/no-unused-components
    KbnIcon
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
    description: {
      type: String,
      default: ""
    },
    listId: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.task-card {
  display: flex;
}

.name {
  flex: 1;
}

h3 {
  margin: 0;
  font-size: 0.75em;
  text-align: left;
  padding-left: 8px;
}

a {
  text-decoration: none;
  color: #2c3e50;
}

.actions {
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  cursor: pointer;
  font-size: 1.2em;
}
</style>