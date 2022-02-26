import { baseURL } from "./globalData";
import store from "./index";

const permissions = {
  namespaced: true,
  state: {
    API: {
      baseURL,
      message: "",
    },
    permissions: {},
  },
  mutations: {
    getPermissionsMutation(state, payload) {
      // console.log("getPermissionsMutation payload", payload);
      state.permissions = payload;
    },
  },
  actions: {
    async getPermissionsAction({ commit, state }) {
      // console.log("State Access ", store._modules.root.state.access.user_data);

      await fetch(state.API.baseURL + "/api/auth/permissions/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + store._modules.root.state.access.access_token,
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          let dataPermissions = payload;
          // console.log("dataPermissions payload", dataPermissions);

          commit("getPermissionsMutation", dataPermissions);
        })
        .catch((err) => {
          console.error("Error al intentar obtener los datos", err);
        });
    },
  },
};

export default permissions;
