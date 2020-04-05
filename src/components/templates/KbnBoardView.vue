<template>
  <div class="board-view">
    <KbnBoardNavigation @logout="onLogout" />
    <p v-if="progress" class="progress">{{ message }}</p>
    <KbnBoardTask :lists="lists" />
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import KbnBoardNavigation from "../molecules/KbnBoardNavigation";
import KbnBoardTask from "../organisms/KbnBoardTask";

export default {
  name: "KbnBoardView",

  components: {
    KbnBoardNavigation,
    KbnBoardTask
  },

  data() {
    return {
      progress: false,
      message: ""
    };
  },

  computed: mapState({
    lists: state => state.board.lists
  }),

  created() {
    this.loadLists();
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

    loadLists() {
      this.setProgress("読込み中...");
      this.$store
        .dispatch("fetchList")
        .catch(err => {
          throw err;
        })
        .then(() => {
          this.resetProgress();
        });
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

<style scoped>
.board-view {
  border: medium solid black;
}

.progress {
  margin: auto;
}
</style>
