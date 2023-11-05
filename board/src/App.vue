<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AlterToast from '@/components/AlterToast/AlterToast.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const findUser = () => {
  userStore.findUser()
}

onMounted(() => {
  findUser()
  console.log('mounted!')
})
</script>

<template>
  <AlterToast></AlterToast>
  <RouterView />
</template>
