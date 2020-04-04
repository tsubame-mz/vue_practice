<template>
  <div class="login-view">
    <h1>Kanban App</h1>
    <KbnLoginForm :onlogin="onLogin" />
  </div>
</template>

<script>
import KbnLoginForm from "../molecules/KbnLoginForm";

export default {
  name: "KbnLoginView",

  components: { KbnLoginForm },

  methods: {
    onLogin(authInfo) {
      return this.$store
        .dispatch("login", authInfo)
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          throw err;
          // this.throwReject(err);
        });
    },
    throwReject(err) {
      return Promise.reject(err);
    }
  }
};
</script>

<style scoped>
.login-view {
  width: 320px;
  margin: auto;
}
</style>
