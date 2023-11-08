<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AlterToast from '@/components/Global/AlterToast.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

onMounted(() => {
  userStore.findUser()
  console.log('mounted!')
})
</script>

<template>
  <AlterToast></AlterToast>
  <RouterView />
</template>
