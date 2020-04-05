<template>
  <nav class="board-navigation">
    <div class="title">
      <h1>Kanban App</h1>
    </div>
    <div class="actions">
      <KbnButton type="text" @click="onClick">ログアウト</KbnButton>
    </div>
  </nav>
</template>

<script>
import KbnButton from "../atoms/KbnButton";

export default {
  name: "KbnBoardNavigation",

  components: {
    KbnButton
  },

  methods: {
    onClick(evt) {
      this.$emit("logout", evt);
    }
  }
};
</script>

<style scoped>
.board-navigation {
  display: flex;
  border-bottom: medium solid black;
}

.title {
  flex: 1;
}

h1 {
  margin: 0px;
}

.actions {
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  cursor: pointer;
}
</style>
