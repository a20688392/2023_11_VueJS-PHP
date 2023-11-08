<script setup>
import { useCommentStore } from '@/stores/comment'
import { storeToRefs } from 'pinia'

const commentStore = useCommentStore()
const { willAdd } = storeToRefs(commentStore)
</script>

<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <button
      class="btn btn-light mx-2"
      data-bs-toggle="modal"
      data-bs-target="#addCommentModalUI"
      aria-hidden="true"
    >
      <img class="head-img my-4" src="../../assets/add.png" />
    </button>
  </div>
  <div
    class="modal fade"
    id="addCommentModalUI"
    tabindex="-1"
    aria-labelledby="addCommentModalLabelUI"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <form @submit.prevent="commentStore.createComment()">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title" id="addCommentModalLabel">新增留言</h5>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <label for="inputTitle" class="d-flex col-3 justify-content-center">標題</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="inputTitle" v-model="willAdd.title" />
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <label for="inputContent" class="d-flex col-3 justify-content-center">內文</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                id="inputContent"
                v-model="willAdd.content"
              />
            </div>
          </div>
          <div class="d-flex justify-content-evenly align-items-center py-3">
            <button type="submit" class="btn btn-success px-5" data-bs-dismiss="modal">新增</button>
            <button type="submit" class="btn btn-outline-secondary px-5" data-bs-dismiss="modal">
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
