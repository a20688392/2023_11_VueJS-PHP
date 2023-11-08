<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>
<template>
  <div class="col-7">
    <div class="mb-1 bg-white">
      <div class="w-auto d-flex align-items-center flex-column mx-2">
        <div class="m-2">自己所有留言</div>
      </div>
      <div class="w-auto d-flex align-items-center flex-column border-top mx-2">
        <img class="head-img my-4" src="../../assets/logo.svg" />
        <div class="m-2">{{ user.account }}</div>
        <div class="m-2">個人簡介</div>
      </div>
    </div>
  </div>
</template>
