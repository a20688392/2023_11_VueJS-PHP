<script setup>
import { onMounted } from 'vue'
import { useCommentStore } from '@/stores/comment'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const commentStore = useCommentStore()
const { comments } = storeToRefs(commentStore)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(() => {
  commentStore.getItems()
})
</script>
<template>
  <div class="container-sm p-3 vh-100">
    <div class="row row-cols-lg-4 g-4 justify-content-center">
      <div class="col" v-for="(data, i) in comments[0]" :key="i">
        <div class="card bg-secondary bg-opacity-25" v-if="data.user_id !== user.user_id">
          <div class="p-1 text-center">
            <h5 class="card-title"># {{ data.id }} {{ data.title }}</h5>
            <div class="bg-white p-1">
              <h4 class="m-5">{{ data.content }}</h4>
              <div>
                <small class="text-muted">{{ data.createdAt }}</small>
                <br />
                <small class="text-muted">{{ data.updatedAt }}</small>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-success bg-opacity-50" v-else>
          <div class="p-1 text-center">
            <h5 class="card-title"># {{ data.id }} {{ data.title }}</h5>
            <div class="bg-white p-1">
              <h4 class="m-5">{{ data.content }}</h4>
              <div>
                <small class="text-muted">{{ data.createdAt }}</small>
                <br />
                <small class="text-muted">{{ data.updatedAt }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
