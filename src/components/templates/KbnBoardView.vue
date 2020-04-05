<template>
  <div>
    <KbnBoardNavigation @logout="onLogout" />
    <p v-if="progress" class="progress">{{ message}}</p>
  </div>
</template>

<script>
import KbnBoardNavigation from "../molecules/KbnBoardNavigation";

export default {
  name: "KbnBoardView",

  components: {
    KbnBoardNavigation
  },

  data() {
    return {
      progress: false,
      message: ""
    };
  },

  methods: {
    setProgress(message) {
      this.progress = true;
      this.message = message;
    },

    resetProgress() {
      this.progress = false;
      this.message = "";
    },

    // eslint-disable-next-line no-unused-vars
    onLogout(evt) {
      this.setProgress("ログアウト中...");

      return this.$store.dispatch("logout").then(() => {
        this.$router
          .push({ path: "/login" })
          .catch(err => {
            throw err;
          })
          .then(() => {
            this.resetProgress();
          });
      });
    }
  }
};
</script>
