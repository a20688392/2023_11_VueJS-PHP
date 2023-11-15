<script setup>
import { onMounted } from 'vue'
import { useCommentStore } from '@/stores/comment'
import { storeToRefs } from 'pinia'

const commentStore = useCommentStore()
const { comments, cache } = storeToRefs(commentStore)

onMounted(() => {
  commentStore.getSelfComment()
  console.log(commentStore.cache)
})
</script>
<template>
  <div class="col-7">
    <div class="mb-1 bg-white">
      <div class="w-auto d-flex align-items-center text-center flex-column mx-2">
        <div class="m-2">自己所有留言</div>
      </div>
      <div class="w-auto d-flex flex-column border-top">
        <div class="col" v-for="(data, i) in comments[0]" :key="i">
          <div class="card bg-secondary bg-opacity-25 m-2">
            <div class="row g-0">
              <div class="col-md-2 text-center d-flex align-items-center">
                <h5 class="w-100"># {{ data.id }}</h5>
              </div>
              <div class="bg-white p-1 col-md-4 text-center flex-grow-1 row g-0">
                <div class="col-md-6">
                  <div>
                    <h4>標題：{{ data.title }}</h4>
                    <!-- <h4 v-if="data.id !== cache.id">標題：{{ data.title }}</h4>
                    <div v-if="data.id == cache.id">標題：</div>
                    <input
                      type="text"
                      class="form-control"
                      v-if="data.id == cache.id"
                      v-model="cache.title"
                    /> -->
                  </div>
                  <div>
                    <h6>留言：{{ data.content }}</h6>
                    <!-- <h6 v-if="data.id !== cache.id">留言：{{ data.content }}</h6>
                    <input
                      type="text"
                      class="form-control"
                      v-if="data.id == cache.id"
                      v-model="cache.content"
                    /> -->
                  </div>
                </div>
                <div class="col-md-6 position-relative">
                  <div class="row-6">
                    <small class="text-muted">time</small>
                  </div>
                  <div class="row-6">
                    <small class="text-muted">{{ data.createdAt }}</small>
                    <br />
                    <small class="text-muted">{{ data.updatedAt }}</small>
                  </div>
                </div>
              </div>

              <div class="col-md-3 row g-0">
                <div class="w-50 h-100 p-1">
                  <button
                    type="button"
                    class="w-100 h-100 btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editModalUI"
                    aria-hidden="true"
                    @click="commentStore.getCacheData(data)"
                  >
                    修改
                  </button>
                </div>
                <div class="w-50 h-100 p-1">
                  <button
                    type="button"
                    class="w-100 h-100 btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModalUI"
                    aria-hidden="true"
                    @click="commentStore.getCacheData(data)"
                  >
                    刪除
                  </button>
                </div>
                <!-- <div class="w-50 h-100 p-2" v-if="data.id !== cache.id">
                  <button
                    type="button"
                    class="w-100 h-100 btn btn-primary"
                    @click="commentStore.getCacheData(data)"
                  >
                    修改
                  </button>
                </div>
                <div class="w-50 h-100 p-2" v-if="data.id !== cache.id">
                  <button
                    type="button"
                    class="w-100 h-100 btn btn-danger"
                    @click="commentStore.deleteComment(data.id)"
                  >
                    刪除
                  </button>
                </div>
                <div class="w-50 h-100 p-2" v-if="data.id == cache.id">
                  <button
                    type="button"
                    class="w-100 h-100 btn btn-success"
                    @click="commentStore.editComment()"
                  >
                    完成
                  </button>
                </div>
                <div class="w-50 h-100 p-2" v-if="data.id == cache.id">
                  <button
                    type="button"
                    class="w-100 h-100 btn btn-secondary"
                    @click="commentStore.clearCache(data)"
                  >
                    取消
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit Modal -->
  <div
    class="modal fade"
    id="editModalUI"
    tabindex="-1"
    aria-labelledby="editModalLabelUI"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <form @submit.prevent="commentStore.editComment()">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title" id="editModalLabel"># {{ cache.id }}</h5>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <label for="inputAccount" class="d-flex col-3 justify-content-center">標題</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="inputAccount" v-model="cache.title" />
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <label for="inputPassword" class="d-flex col-3 justify-content-center">留言</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="inputPassword" v-model="cache.content" />
            </div>
          </div>
          <div class="d-flex justify-content-evenly align-items-center py-3">
            <button type="submit" class="btn btn-success px-5" data-bs-dismiss="modal">完成</button>
            <button class="btn btn-secondary px-5" data-bs-dismiss="modal">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Delete Modal -->
  <div
    class="modal fade"
    id="deleteModalUI"
    tabindex="-1"
    aria-labelledby="deleteModalUI"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <form @submit.prevent="commentStore.deleteComment()">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title" id="deleteModalLabel"># {{ cache.id }}</h5>
          </div>
          <div class="text-center">
            <h4>標題：{{ cache.title }}</h4>
            <h6>留言：{{ cache.content }}</h6>
          </div>
          <div class="d-flex justify-content-evenly align-items-center py-3">
            <button type="submit" class="btn btn-danger px-5" data-bs-dismiss="modal">
              確定要刪除?
            </button>
            <button class="btn btn-secondary px-5" data-bs-dismiss="modal">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
