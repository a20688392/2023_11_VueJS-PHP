<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AlterToast from '@/components/AlterToast/AlterToast.vue'
import { useUserStore } from '@/stores/user'
import MessageApi from './components/MessageApi.vue';

import { NMessageProvider } from "naive-ui";
const userStore = useUserStore()

onMounted(() => {
  userStore.findUser()
  console.log('mounted!')
})
</script>

<template>
  <n-message-provider>
    <message-api/>
  </n-message-provider>
  <AlterToast></AlterToast>
  <RouterView />
</template>
