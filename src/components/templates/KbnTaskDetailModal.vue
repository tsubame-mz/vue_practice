<template>
  <div class="task-detail-modal">
    <p>タスク詳細ページ</p>
    <div class="wrapper">
      <div class="container">
        <div class="header">
          <KbnButton type="text" @click="onClick">
            <KbnIcon name="close" />
          </KbnButton>
        </div>
        <div class="body">
          <KbnTaskDetailForm :task="task" :update="onUpdate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KbnButton from "../atoms/KbnButton";
import KbnIcon from "../atoms/KbnIcon";
import KbnTaskDetailForm from "../molecules/KbnTaskDetailForm";

export default {
  name: "KbnTaskDetailModal",

  components: {
    KbnButton,
    KbnIcon,
    KbnTaskDetailForm
  },

  computed: {
    task() {
      const id = parseInt(this.$route.params.id);
      return !Number.isNaN(id)
        ? { ...this.$store.getters.getTaskById(id) }
        : {};
    }
  },

  methods: {
    back() {
      this.$router.push({ path: "/" });
    },

    onClick() {
      this.back();
    },

    onUpdate(task) {
      return this.$store
        .dispatch("updateTask", task)
        .then(() => {
          this.back();
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
</script>

<style scoped>
.task-detail-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.wrapper {
  display: table-cell;
  vertical-align: middle;
}

.container {
  width: 460px;
  margin: 0 auto;
  padding: 8px;
  background-color: white;
  border-radius: 0.5em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.header {
  text-align: right;
}

.header button {
  width: 16px;
  cursor: pointer;
  font-size: 1.5em;
}

.body {
  width: 100%;
}
</style>