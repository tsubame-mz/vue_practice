<template>
  <form class="task-detail-form" novalidate>
    <div class="form-item">
      <label for="task-name">タスク名</label>
      <input type="text" id="task-name" v-model="task.name" />
    </div>
    <div class="form-item">
      <label for="task-description">説明</label>
    </div>
    <textarea id="task-description" v-model="task.description" />
    <div class="form-actions">
      <KbnButton :disabled="progress" @click="onClick">更新</KbnButton>
      <p v-if="progress" class="update-progress">更新中...</p>
      <p v-if="error" class="update-error">{{error}}</p>
    </div>
  </form>
</template>

<script>
import KbnButton from "../atoms/KbnButton";

export default {
  name: "KbnTaskDetailForm",

  components: {
    KbnButton
  },

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
  },

  data() {
    return {
      progress: false,
      error: ""
    };
  },

  methods: {
    onClick() {
      if (this.progress) {
        return;
      }

      this.progress = true;

      this.$nextTick(() => {
        this.update(this.task)
          .catch(err => {
            this.error = err.message;
          })
          .then(() => (this.progress = false));
      });
    }
  }
};
</script>

<style scoped>
form {
  display: block;
  margin: 0 auto;
  text-align: left;
}

label {
  display: block;
}

input,
textarea {
  width: 99%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}
</style>