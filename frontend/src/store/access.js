import { baseURL } from "./globalData";

const access = {
  namespaced: true,
  state: {
    API: {
      baseURL,
      signin: "/api/auth/signup",
      login: "/api/auth/login",
      logout: "/api/auth/logout",
    },
    access_token: null,
    expires_at: null,
    token_type: null,
    message: null, // en caso que no sea login correcto arroja -  message: "Unauthorized"
    user_data: null,
    auth: false,
  },
  mutations: {
    loginMutation(state, dataLogin) {
      console.log("loginMutation", dataLogin);
      if (
        dataLogin.message != undefined ||
        dataLogin.message == "Successfully logged out"
      ) {
        state.auth = false;
        state.access_token = null;
        state.expires_at = null;
        state.token_type = null;
        state.user_data = null;
      } else {
        state.auth = true;
        state.access_token = dataLogin.access_token;
        state.expires_at = dataLogin.expires_at;
        state.token_type = dataLogin.token_type;
        state.user_data = dataLogin.user_data;
      }
    },
    logoutMutation(state) {
      state.auth = false;
      state.username = null;
    },
    signinMutation(state, payload) {
      // console.log("respuesta signinMutation", payload);

      state.message = payload.message;
    },
  },
  actions: {
    async signInAction({ commit, state }, dataSignIn) {
      // console.log("signInAction", dataSignIn);

      await fetch(state.API.baseURL + state.API.signin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(dataSignIn), // body data type must match "Content-Type" header
      })
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          // console.log("respuesta signInAction", payload);

          commit("signinMutation", payload);
        })
        .catch(function (err) {
          console.error("Error al intentar ingresar", err);
        });
    },
    async loginAction({ commit, state }, dataLogin) {
      // console.log("loginAction", dataLogin);

      await fetch(state.API.baseURL + state.API.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(dataLogin), // body data type must match "Content-Type" header
      })
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          // console.log("respuesta login", payload);

          commit("loginMutation", payload);
        })
        .catch(function (err) {
          console.error("Error al intentar ingresar", err);
        });
    },
    async logoutAction({ commit, state }) {
      await fetch(state.API.baseURL + state.API.logout, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.access_token,
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          console.log("Respuesta logout", payload);

          commit("logoutMutation");
        })
        .catch(function (err) {
          console.error("Error al intentar ingresar", err);
        });
    },
  },
};

export default access;
