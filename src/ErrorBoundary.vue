<template>
  <div>
    <div v-if="error" class="error">
      <p>予期しないエラーが発生しました。</p>
      <hr />
      <p class="message">エラーメッセージ: {{ error.message }}</p>
      <p class="info">エラー情報: {{ info }}</p>
      <p class="stack">エラーメッセージ: {{ error.stack }}</p>
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
export default {
  name: "ErrorBoundary",

  data() {
    return {
      error: null,
      info: null
    };
  },

  errorCaptured(err, vm, info) {
    this.error = err;
    this.info = info;
  }
};
</script>

<style>
.error {
  color: black;
  text-align: left;
}
</style>