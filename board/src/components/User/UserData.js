import axios from 'axios'
import Storage from '@/components/User/Storage'

// import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'




export default function UserData(userStore) {
  const { user } = storeToRefs(userStore)
  let { localGet, localSet, localRemove } = Storage()
  //畫面初始化確認有無使用者
  console.log(user)
  function findUser() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'multipart/form-data' },
      withCredentials: true,
      url: 'http://localhost/practicevue/board-api/src/function/user/findUser.php'
    }
    axios(options)
      .then((res) => {
        console.log(res)
        if (res.data.checkname) {
          console.log('yes')
          // console.log(res.data);
          // user = {};
          user.user_id = res.data.user_id
          user.email = res.data.email
          user.account = res.data.user_name
          // console.log(user);
        }
      })
      .catch((error) => {
        console.log('no')
        console.log(error)
      })
  }
  // //註冊
  function register() {
    console.log(user)
    const options = {
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data' },
      data: {
        account: user.account,
        email: user.email,
        pass: user.pass,
        pass_check: user.pass_check
      },
      url: 'http://192.168.1.180/~web/2023_11_VueJS-PHP/board-api/src/Controller/User/CreateUser.php'
    }
    axios(options)
      .then((res) => {
        console.log('yes')
        console.log(res)
        // result.event = res.data.event
        // result.status = res.data.status
        // result.content = res.data.content
      })
      .catch((error) => {
        console.log('no')
        console.log(error)
      })
    console.log(user)
    delUserCacheData()
  }
  //登入
  function login() {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data' },
      withCredentials: true,
      data: {
        user_name: user.name,
        user_password: user.password
      },
      url: 'http://localhost/practicevue/board-api/src/function/user/userLogin.php'
    }
    axios(options)
      .then((res) => {
        console.log(res)
        // result.event = res.data.event
        // result.status = res.data.status
        // result.content = res.data.content
        if (res.data.checkname) {
          console.log('yes')
          delUserCacheData()
          user.user_id = res.data.user_id
          user.email = res.data.email
          user.name = res.data.user_name
          user.check_name = res.data.user_name
          localSet(res.data.board)
          localGet()
        }
      })
      .catch((error) => {
        console.log('no')
        console.log(error)
      })
  }
  //登出
  function logout() {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data' },
      withCredentials: true,
      data: {
        user_name: user.name
      },
      url: 'http://localhost/practicevue/board-api/src/function/user/userLogout.php'
    }
    axios(options)
      .then((res) => {
        console.log(res)
        localRemove()
      })
      .catch((error) => {
        console.log('no')
        console.log(error)
      })
    delUserCacheData()
    console.log(user)
  }
  //刪除user資訊
  function delUserCacheData() {
    user.check_name = 'none'
    user.name = ''
    user.email = ''
    user.password = ''
    user.user_id = ''
  }

  return {
    findUser,
    register,
    login,
    logout,
    delUserCacheData,
    localGet,
    localSet,
    localRemove
  }
}
