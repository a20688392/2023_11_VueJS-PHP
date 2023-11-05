<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/alterToast'

import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const toastStore = useToastStore()
const { user } = storeToRefs(userStore)

const options = ref([
  {
    label: '滨海湾金沙，新加坡',
    key: 'marina bay sands',
    disabled: true
  },
  {
    label: '布朗酒店，伦敦',
    key: "brown's hotel, london"
  },
  {
    label: '亚特兰蒂斯巴哈马，拿骚',
    key: 'atlantis nahamas, nassau'
  },
  {
    label: '比佛利山庄酒店，洛杉矶',
    key: 'the beverly hills hotel, los angeles'
  }
])
const showDropdown = ref(false)

const handleSelect = (key) => {
  const message = window.$message
  message.info(String(key))
}

const handleClick = () => {
  showDropdown.value = !showDropdown.value
}

onMounted(() => {
  console.log('mounted!')
})
</script>

<template>
  <nav class="header-nav d-flex justify-content-between align-items-center">
    <a class="navbar-brand" href="#">CMRDB-Board {{ user.user_id != '' }}</a>
    <button @click="toastStore.alter()" type="button" class="btn btn-primary" id="liveToastBtn">
      Show live toast
    </button>
    <n-space>
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-button>悬浮！</n-button>
      </n-dropdown>
      <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <n-button>点击！</n-button>
      </n-dropdown>
      <n-dropdown :show="showDropdown" :options="options" @select="handleSelect">
        <n-button @click="handleClick"> 噢！我要自己手动！ </n-button>
      </n-dropdown>
    </n-space>
    <div class="d-flex justify-content-between align-items-center" v-if="user.user_id != ''">
      <img class="head-img" src="../../assets/logo.svg" />
      <li class="nav-item dropdown">
        <a
          class="dropdown-toggle text-white text-decoration-none mx-4 py-3"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ user.account }}
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#">個人資料</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#" @click="userStore.signOut()">登出</a></li>
        </ul>
      </li>
    </div>
    <div class="d-flex justify-content-between align-items-center" v-else>
      <button
        class="btn btn-light mx-4"
        data-bs-toggle="modal"
        data-bs-target="#loginModalUI"
        aria-hidden="true"
      >
        登入 / 註冊
      </button>
    </div>
  </nav>
  <!-- Login Modal -->
  <div
    class="modal fade"
    id="loginModalUI"
    tabindex="-1"
    aria-labelledby="loginModalLabelUI"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <form @submit.prevent="userStore.login()">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title" id="loginModalLabel">登入</h5>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <label for="inputAccount" class="d-flex col-3 justify-content-center">帳號名</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="inputAccount" v-model="user.account" />
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <label for="inputPassword" class="d-flex col-3 justify-content-center">密碼</label>
            <div class="col-sm-6">
              <input type="password" class="form-control" id="inputPassword" v-model="user.pass" />
            </div>
          </div>
          <div class="d-flex justify-content-evenly align-items-center py-3">
            <a
              class="text-primary text-decoration-none"
              data-bs-target="#registerModalUI"
              data-bs-toggle="modal"
            >
              尚未有帳戶?
            </a>
            <button type="submit" class="btn btn-primary px-5" data-bs-dismiss="modal">登入</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Register Modal -->
  <div
    class="modal fade"
    id="registerModalUI"
    tabindex="-1"
    aria-labelledby="registerModalUI"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <form @submit.prevent="userStore.register()">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title" id="loginModalLabel">註冊</h5>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <label for="inputAccount" class="d-flex col-3 justify-content-center">帳號名</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="inputAccount" v-model="user.account" />
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <label for="inputPassword" class="d-flex col-3 justify-content-center">信箱</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="inputPassword" v-model="user.email" />
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <label for="inputPassword" class="d-flex col-3 justify-content-center">密碼</label>
            <div class="col-sm-6">
              <input type="password" class="form-control" id="inputPassword" v-model="user.pass" />
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <label for="inputPassword" class="d-flex col-3 justify-content-center">再次密碼</label>
            <div class="col-sm-6">
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                v-model="user.pass_check"
              />
            </div>
          </div>
          <div class="d-flex justify-content-evenly align-items-center py-3">
            <div>
              <a
                class="text-primary text-decoration-none"
                data-bs-target="#loginModalUI"
                data-bs-toggle="modal"
              >
                已經有帳戶?
              </a>
            </div>
            <button type="submit" class="btn btn-primary px-5" data-bs-dismiss="modal">註冊</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.header-nav {
  background-color: #242f42;
  color: aliceblue;
  padding: 0.5rem;
}
.head-img {
  border-radius: 100%;
  width: 3rem;
}
</style>
