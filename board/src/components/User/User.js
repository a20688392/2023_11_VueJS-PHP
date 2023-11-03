import axios from "axios";
import Storage from "@/components/User/Storage";

export default function User(state) {
  let { localGet, localSet, localRemove } = Storage();
  //畫面初始化確認有無使用者
  function findUser() {
    const options = {
      method: "GET",
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
      url: "http://localhost/practicevue/board-api/src/function/user/findUser.php",
    };
    axios(options)
      .then((res) => {
        console.log(res);
        if (res.data.checkname) {
          console.log("yes");
          // console.log(res.data);
          state.user = {};
          state.user.user_id = res.data.user_id;
          state.user.email = res.data.email;
          state.user.name = res.data.user_name;
          state.user.check_name = res.data.user_name;
          // console.log(state.user);
        }
      })
      .catch((error) => {
        console.log("no");
        console.log(error);
      });
  }
  // //註冊
  function register() {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data' },
      data: {
        name: state.user.name,
        email: state.user.email,
        password: state.user.password,
        pass_check: state.user.pass_check
      },
      url: 'http://localhost/practicevue/board-api/src/function/user/createUser.php'
    }
    axios(options)
      .then((res) => {
        console.log("yes");
        console.log(res);
        state.result.event = res.data.event;
        state.result.status = res.data.status;
        state.result.content = res.data.content;
      })
      .catch((error) => {
        console.log("no");
        console.log(error);
      });
    console.log(state.user);
    delUserCacheData();
  }
  //登入
  function login() {
    const options = {
      method: "POST",
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
      data: {
        user_name: state.user.name,
        user_password: state.user.password,
      },
      url: "http://localhost/practicevue/board-api/src/function/user/userLogin.php",
    };
    axios(options)
      .then((res) => {
        console.log(res);
        state.result.event = res.data.event;
        state.result.status = res.data.status;
        state.result.content = res.data.content;
        if (res.data.checkname) {
          console.log("yes");
          delUserCacheData();
          state.user.user_id = res.data.user_id;
          state.user.email = res.data.email;
          state.user.name = res.data.user_name;
          state.user.check_name = res.data.user_name;
          localSet(res.data.board);
          localGet();
        }
      })
      .catch((error) => {
        console.log("no");
        console.log(error);
      });
  }
  //登出
  function logout() {
    const options = {
      method: "POST",
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
      data: {
        user_name: state.user.name,
      },
      url: "http://localhost/practicevue/board-api/src/function/user/userLogout.php",
    };
    axios(options)
      .then((res) => {
        console.log(res);
        localRemove();
      })
      .catch((error) => {
        console.log("no");
        console.log(error);
      });
    delUserCacheData();
    console.log(state.user);
  }
  //刪除user資訊
  function delUserCacheData() {
    state.user.check_name = "none";
    state.user.name = "";
    state.user.email = "";
    state.user.password = "";
    state.user.user_id = "";
  }

  return {
    findUser,
    register,
    login,
    logout,
    delUserCacheData,
    localGet,
    localSet,
    localRemove,
  };
}
