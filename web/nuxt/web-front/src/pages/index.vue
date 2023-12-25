<script lang="ts" setup>
/*
definePageMeta({
  middleware: ['auth']
  // or middleware: 'auth'
})
*/
// cookieはRefオブジェクト
//const cookie = useCookie<string | null>('access_token', cookieOptions)

// クライアントサイド
//  document.cookieに書き込みされる
//  具体的にはcookieはwatch apiの監視対象となっているので値の更新を検知して書き込まれます
// サーバサイド
//  event.req.headers.cookieに書き込みされる
//  app:rendered、app:redirectedフック実行のタイミングでhttpヘッダに書き込まれる
//cookie.value = accessToken
</script>

<template>
  <div class="bg-secondary">
    <Header />
    <itemList />
    <Footer />
  </div>
</template>

<style scoped></style>
