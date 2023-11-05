import { defineStore } from 'pinia'
import axios from 'axios'
import { useToastStore } from '@/stores/alterToast'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        account: '',
        email: '',
        pass: '',
        pass_check: '',
        user_id: ''
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
    async findUser() {
      const options = {
        method: 'GET',
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials: true,
        url: 'http://192.168.56.1/~web/2023_11_VueJS-PHP/board-api/src/Controller/User/FindUser.php'
      }
      axios(options)
        .then((res) => {
          console.log(res)
          if (res.data) {
            console.log('yes')
            console.log(res.data)
            this.user.user_id = res.data.user_id
            this.user.email = res.data.email
            this.user.account = res.data.account
            // console.log(state.user);
          }
        })
        .catch((error) => {
          console.log('no')
          console.log(error)
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
        url: 'http://192.168.56.1/~web/2023_11_VueJS-PHP/board-api/src/Controller/User/CreateUser.php'
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
        url: 'http://192.168.56.1/~web/2023_11_VueJS-PHP/board-api/src/Controller/User/UserLogin.php'
      }
      axios(options)
        .then((res) => {
          console.log(res)
          this.user.pass = ''
          this.user.pass_check = ''
          this.user.user_id = res.data.user_id
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
        url: 'http://192.168.56.1/~web/2023_11_VueJS-PHP/board-api/src/Controller/User/UserLogout.php'
      }
      axios(options)
        .then((res) => {
          console.log(res)
          return res.data
        })
        .then((res) => {
          let toast = useToastStore()
          toast.setToast(res)
          this.clearData()
        })
        .catch((error) => {
          console.log('no')
          console.log(error)
        })
      // delUserCacheData();
      // console.log(state.user);
      // getItems();
    }
  }
})
