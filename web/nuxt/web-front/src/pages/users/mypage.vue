<script lang="ts">
//仮置き　後にグローバルstateから取得
const userId = ref<number>(1);
if (!userId.value) {
  navigateTo("/login");
}
</script>

<template>
  <div>マイページ</div>
</template>
