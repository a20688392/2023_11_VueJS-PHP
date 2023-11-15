import { defineStore } from 'pinia'
import axios from 'axios'
import { useToastStore } from '@/stores/alterToast'

export const useCommentStore = defineStore('commentData', {
  state: () => {
    return {
      willAdd: {
        content: '',
        title: ''
      },
      comments: [],
      search: {
        first_time: '',
        last_time: '',
        search_content: ''
      },
      cache: {
        id: 0,
        content: '',
        title: ''
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
    // 獲取所有留言
    async getItems() {
      const options = {
        method: 'GET',
        headers: { 'content-type': 'multipart/form-data' },
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/Comment/GetAll.php'
      }
      axios(options).then((res) => {
        console.log(res.data.statement)
        this.comments = []
        this.comments.push(res.data.statement)
      })
    },
    //搜尋關鍵字
    async searchComment() {
      const options = {
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        data: {
          first_time: this.search.first_time,
          last_time: this.search.last_time,
          search_content: this.search.search_content
        },
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/Comment/SearchComment.php'
      }
      axios(options)
        .then((res) => {
          console.log('searchcomment ok')
          console.log(res)
          // this.$patch({ comments: res.data.statement })
          this.comments = []
          this.comments.push(res.data.statement)
          let toast = useToastStore()
          toast.setToast(res.data)
        })
        .catch((error) => {
          console.log('no')
          console.log(error)
          let toast = useToastStore()
          toast.setToast(error.response.data)
        })
    },
    // 獲取自身留言
    async getSelfComment() {
      const options = {
        method: 'GET',
        withCredentials: true,
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/Comment/GetSelfComment.php'
      }
      axios(options)
        .then((res) => {
          console.log('get self comment ok')
          console.log(res)
          this.comments = []
          this.comments.push(res.data)
        })
        .catch((error) => {
          console.log('create error')
          console.log(error)
          let toast = useToastStore()
          toast.setToast(error.response.data)
        })
    },
    // 清空搜尋
    async clearSearch() {
      this.search.first_time = ''
      this.search.last_time = ''
      this.search.search_content = ''
    },
    async createComment() {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials: true,
        data: {
          title: this.willAdd.title,
          content: this.willAdd.content
        },
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/Comment/CreateComment.php'
      }
      axios(options)
        .then((res) => {
          console.log('create ok')
          console.log(res)
          this.comments = []
          this.getItems()
          this.willAdd.title = ''
          this.willAdd.content = ''
          let toast = useToastStore()
          toast.setToast(res.data)
        })
        .catch((error) => {
          console.log('create error')
          console.log(error)
          let toast = useToastStore()
          toast.setToast(error.response.data)
        })
    },
    // 抓到要編輯的留言ID
    async getCacheData(cache) {
      this.cache.id = cache.id
      this.cache.title = cache.title
      this.cache.content = cache.content
      console.log('get cache data ok ' + this.cache)
    },
    // 清空搜尋
    async clearCache() {
      this.cache = {}
    },
    // 更新資料
    async editComment() {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials: true,
        data: {
          id: this.cache.id,
          title: this.cache.title,
          content: this.cache.content
        },
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/Comment/EditComment.php'
      }
      axios(options)
        .then((res) => {
          console.log('cditComment ok')
          console.log(res)
          this.comments = []
          this.getSelfComment()
          this.cache = {}
          let toast = useToastStore()
          toast.setToast(res.data)
        })
        .catch((error) => {
          console.log('create error')
          console.log(error)
          let toast = useToastStore()
          toast.setToast(error.response.data)
        })
    },
    // 獲取自身留言
    async deleteComment() {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials: true,
        data: {
          id: this.cache.id
        },
        url: 'http://localhost/2023_11_VueJS-PHP/board-api/src/Controller/Comment/DelComment.php'
      }
      axios(options)
        .then((res) => {
          console.log('deleteComment ok')
          console.log(res)
          this.comments = []
          this.getSelfComment()
          this.cache = {}
          let toast = useToastStore()
          toast.setToast(res.data)
        })
        .catch((error) => {
          console.log('create error')
          console.log(error)
          let toast = useToastStore()
          toast.setToast(error.response.data)
        })
    }
  }
})
