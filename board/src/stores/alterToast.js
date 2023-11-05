import { defineStore } from 'pinia'
import { Toast } from 'bootstrap/dist/js/bootstrap.esm.min.js'

export const useToastStore = defineStore('toastData', {
  state: () => {
    return {
      toastData: {
        event: '',
        status: '',
        content: ''
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
    // //註冊
    async alter() {
      var toastLiveExample = document.getElementById('liveToast');
      var toast = new Toast(toastLiveExample)
      toast.show();
    },
    setToast(data) {
      console.log("alterToast")
      console.log(data)
      this.toastData = data
      this.alter()
    }
  }
})
