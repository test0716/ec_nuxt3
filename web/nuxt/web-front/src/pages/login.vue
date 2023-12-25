<script setup lang="ts">
import { ref } from "vue";

//仮置き　後にグローバルstateから取得
const userId = ref<number>(1);

if (userId.value) {
  navigateTo("/users/mypage");
}

const email = ref<String>("");
const password = ref<String>("");

//エラーメッセージ格納用
const message = ref<String>("");

const submit = () => {
  console.log(email.value);
  password.value = "";
  //pwとアドレスが一致しなかった場合はメッセージを返す
  //statusは仮置き APIから取得
  const status = false;

  if (status) {
    return navigateTo("/mypage");
  } else {
    //messageはutilsから取得
    message.value = "メールアドレスまたはパスワードが一致しません。";
  }
};
</script>

<template>
  <header />
  <div class="login">
    <div class="login-triangle"></div>

    <h2 class="login-header">ユーザーログイン</h2>

    <div class="login-container">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <div v-if="message">{{ message }}</div>
      <button @click="submit">ログイン</button>
    </div>
  </div>
</template>

<style scoped>
@import "assets/css/login.css";
</style>
