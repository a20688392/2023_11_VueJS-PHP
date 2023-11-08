<script setup>
import { useToastStore } from '@/stores/alterToast'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const { toastData } = storeToRefs(toastStore)
</script>

<template>
  <div class="d-flex position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <!-- 修改失敗 -->
      <div class="toast-header text-light bg-danger" v-if="toastData.status == 'error'">
        <strong class="me-auto">{{ toastData.event }}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <!-- 修改成功 -->
      <div class="toast-header text-light bg-success" v-if="toastData.status == 'success'">
        <strong class="me-auto">{{ toastData.event }}</strong>

        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-header toast-cancel" v-if="toastData.status == 'cancel'">
        <strong class="me-auto">{{ toastData.event }}</strong>

        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">{{ toastData.content }}</div>
    </div>
    <div class="p-5"></div>
  </div>
</template>
