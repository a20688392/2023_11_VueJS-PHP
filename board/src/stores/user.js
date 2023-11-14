import { defineStore } from 'pinia'
import axios from 'axios'
import { useToastStore } from '@/stores/alterToast'
import VueCookies from 'vue-cookies'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        account: '',
        email: '',
        intro: '',
        pass: '',
        pass_check: '',
        user_id: ''
      },
      tmpUser: {
        account: '',
        email: '',
        intro: '',
        pass: '',
        pass_check: ''
      }
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  getters: {
    // double: (state) => state.count * 2
  },
  actions: {
    // increment() {
    //   this.count++
    // }
    async check() {
      console.log('check')
      const options = {
        method: 'GET',
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials: true,
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/User/FindUser.php'
      }
      axios(options)
        .then((res) => {
          // console.log(res.data)
          if (res.data) {
            console.log(res.data)
            return res.data
          }
        })
        .catch((error) => {
          console.log('no')
          console.log(error)
          let toast = useToastStore()
          toast.setToast(error.response.data)
        })
    },
    async findUser() {
      const options = {
        method: 'GET',
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials: true,
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/User/FindUser.php'
      }
      axios(options)
        .then((res) => {
          if (res.data) {
            this.user.user_id = res.data.user_id
            this.user.email = res.data.email
            this.user.account = res.data.account
            // console.log(state.user);
          }
        })
        .catch((error) => {
          console.log('no')
          console.log(error)
          let toast = useToastStore()
          toast.setToast(error.response.data)
        })
    },
    // //註冊
    async register() {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data' },
        data: {
          account: this.user.account,
          email: this.user.email,
          pass: this.user.pass,
          pass_check: this.user.pass_check
        },
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/User/CreateUser.php'
      }
      axios(options)
        .then((res) => {
          console.log('yes')
          // console.log(res);
          return res.data
        })
        .then((res) => {
          let toast = useToastStore()
          toast.setToast(res)
          this.clearData()
        })
        .catch((error) => {
          console.log('no')
          let toast = useToastStore()
          toast.setToast(error.response.data)
          this.clearData()
        })
    },
    //登入
    async login() {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials: true,
        changeOrigin: true,
        data: {
          account: this.user.account,
          pass: this.user.pass
        },
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/User/UserLogin.php'
      }
      axios(options)
        .then((res) => {
          console.log(res)
          VueCookies.set('User-Id', res.data.user_id, { expires: 1 })
          // Cookies.set('User-Id', res.data.user_id)
          this.user.pass = ''
          this.user.pass_check = ''
          this.user.user_id = res.data.user_id
          this.user.email = res.data.email
          this.user.intro = res.data.intro
          let toast = useToastStore()
          toast.setToast(res.data)
        })
        .catch((error) => {
          console.log('no')
          let toast = useToastStore()
          toast.setToast(error.response.data)
          this.clearData()
        })
    },
    async clearData() {
      this.$reset()
    },
    //登出
    async signOut() {
      const options = {
        method: 'GET',
        withCredentials: true,
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/User/UserLogout.php'
      }
      axios(options)
        .then((res) => {
          console.log(res)
          VueCookies.remove('User-Id')
          return res.data
        })
        .then((res) => {
          let toast = useToastStore()
          toast.setToast(res)
          this.router.push({ path: '/' })
          this.clearData()
        })
        .catch((error) => {
          console.log('no')
          console.log(error)
          let toast = useToastStore()
          toast.setToast(error.response.data)
        })
    },
    async editUser() {
      const options = {
        method: 'POST',
        withCredentials: true,
        headers: { 'content-type': 'multipart/form-data' },
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/User/EditUser.php',
        data: {
          account: this.tmpUser.account,
          email: this.tmpUser.email,
          intro: this.tmpUser.intro,
          pass: this.tmpUser.pass,
          pass_check: this.tmpUser.pass_check
        }
      }
      axios(options)
        .then((res) => {
          console.log(res)
          let toast = useToastStore()
          this.router.push({ path: '/' })
          toast.setToast(res.data)
          this.clearData()
        })
        .catch((error) => {
          console.log('no')
          console.log(error)
          let toast = useToastStore()
          toast.setToast(error.response.data)
        })
    }
  }
})
