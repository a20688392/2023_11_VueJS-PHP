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
    label: '個人資料',
    key: 'editProfile'
  },
  {
    key: 'header-divider',
    type: 'divider'
  },
  {
    label: '登出',
    key: 'signOut'
  }
])
const formRef = ref(null)
const loginRules = {
  username: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
  password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }]
}
const loginForm = ref({
  username: '',
  password: ''
})

const handleValidateClick = (e) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    const message = window.$message
    if (!errors) {
      message.success('Valid')
    } else {
      console.log(errors)
      message.error('Invalid')
    }
  })
}
const size = ref('medium')
const bodyStyle = ref({
  width: '600px'
})
const segmented = ref({
  content: 'soft',
  footer: 'soft'
})

const loginModalVisible = ref(false)

const showLoginModal = () => {
  loginModalVisible.value = true
}
const login = () => {
  const formRef = loginForm.value

  formRef.validate((errors) => {
    if (!errors) {
      // 在這裡處理登入邏輯，例如發送請求到後端進行驗證
      message.success('登入成功')
      loginModalVisible.value = false
    } else {
      message.error('請輸入正確的帳號和密碼')
    }
  })
}

const showDropdown = ref(false)

const handleSelect = (key) => {
  if (key == 'editProfile') {
    const message = window.$message
    message.info(String(key))
  }
  if (key == 'signOut') {
    userStore.signOut()
  }
  // const message = window.$message
  // message.info(String(key))
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
      <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <n-button text color="#ffffff">{{ user.account }}</n-button>
      </n-dropdown>
    </div>
    <!-- <div class="d-flex justify-content-between align-items-center" v-else></div> -->
    <div v-else>
      <!-- <n-button size="large" strong secondary @click="showModal = true"> 登入 / 註冊 </n-button> -->
      <!-- <n-button color="#8850ff" @click="showModal = true"> 登入 / 註冊 </n-button> -->
      <!-- <n-modal v-model:show="showModal" transform-origin="center"> -->
      <!-- <n-form
          ref="formRef"
          inline
          :label-width="80"
          :model="formValue"
          :rules="rules"
          :size="size"
        > -->
      <!-- <n-form-item label="帳號" path="user.account">
            <n-input v-model:value="formValue.user.account" placeholder="account" /> -->
      <!-- </n-form-item>
          <n-form-item label="密碼" path="user.pass">
            <n-input v-model:value="formValue.user.pass" placeholder="password" />
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="handleValidateClick"> 验证 </n-button> -->
      <!-- </n-form-item> -->
      <!-- </n-form> -->
      <!-- <n-form
          ref="formRef"
          inline
          :label-width="80"
          :model="formValue"
          :rules="rules"
          :size="size"
        > -->
      <!-- <n-form-item label="姓名" path="user.name">
            <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
          </n-form-item>
          <n-form-item label="年龄" path="user.age">
            <n-input v-model:value="formValue.user.age" placeholder="输入年龄" />
          </n-form-item>
          <n-form-item label="电话号码" path="phone">
            <n-input v-model:value="formValue.phone" placeholder="电话号码" />
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="handleValidateClick"> 验证 </n-button>
          </n-form-item>
        </n-form> -->
      <!-- <n-card
          style="width: 600px"
          title="模态框"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <template #header-extra> 噢！ </template>
          内容
          <template #footer> 尾部<n-input v-model:value="user.account" placeholder="输入姓名" /> </template>
        </n-card> -->
      <!-- </n-modal> -->
      <n-button @click="showLoginModal" text color="#FFFFFF">登入 / 註冊</n-button>
      <n-modal v-model:show="loginModalVisible" transform-origin="center" title="帳號登入">
        <n-form
          :model="loginForm"
          :rules="loginRules"
          size="large"
          label-placement="left"
          class="w-[30rem] p-5 bg-gray-50"
        >
          <n-form-item label="帳號" prop="username">
            <n-input v-model="loginForm.username" placeholder="請輸入帳號" />
          </n-form-item>
          <n-form-item label="密碼" prop="password">
            <n-input type="password" v-model="loginForm.password" placeholder="請輸入密碼" />
          </n-form-item>
          <n-form-item>
            <n-button dashed> Default </n-button>
            <n-button type="info">登入</n-button>
          </n-form-item>
        </n-form>
      </n-modal>
      <n-button type="info">登入</n-button>
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
