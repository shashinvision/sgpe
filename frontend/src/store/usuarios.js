import { baseURL } from "./globalData";
import store from "./index";

const usuarios = {
  namespaced: true,
  state: {
    API: {
      baseURL,
      message: "",
    },
    usuarios: {},
  },
  mutations: {
    getUsuariosMutation(state, payload) {
      // console.log("getUsuariosMutation payload", payload);
      state.usuarios = payload;
    },
    setUsuariosMutation(state, payload) {
      // console.log("setUsuariosMutation payload", payload);
      state.API.message = payload;
    },
    cleanMessageMutation(state) {
      state.API.message = "";
    },
  },
  actions: {
    async getUsuariosAction({ commit, state }) {
      // console.log("State Access ", store._modules.root.state.access.user_data);

      await fetch(state.API.baseURL + "/api/auth/usuarios/", {
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
          let dataUsuarios = payload;
          // console.log("dataUsuarios payload", dataUsuarios);

          commit("getUsuariosMutation", dataUsuarios);
        })
        .catch((err) => {
          console.error("Error al intentar obtener los datos", err);
        });
    },
    async setUsuariosAction({ commit, state }, payload) {
      // console.log("payload usuarios", payload);
      const data = {
        name: payload.name,
        email: payload.email,
        id_permissions: payload.id_permissions,
        id_companys: payload.id_companys,
        password: payload.password,
        state: 1,
      };
      await fetch(state.API.baseURL + "/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + store._modules.root.state.access.access_token,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          // console.log("Respuesta insert", payload);

          commit("setUsuariosMutation", payload);
        })
        .catch((err) => {
          console.error("Error al intentar ingresar", err);
        });
    },
    async updateUsuariosAction({ commit, state }, payload) {
      // console.log("dataupdate usuario", payload);
      const data = {
        name: payload.datos.name,
        password: payload.datos.password,
        id_permissions: payload.datos.id_permissions,
        id_companys: payload.datos.id_companys,
        state: 1,
      };

      await fetch(
        state.API.baseURL + "/api/auth/usuario/edit/" + payload.idEdit,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + store._modules.root.state.access.access_token,
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          // console.log("Respuesta insert", payload);

          commit("setUsuariosMutation", payload);
        })
        .catch((err) => {
          console.error("Error al intentar ingresar", err);
        });
    },
    async deleteUsuariosAction({ commit, state }, payload) {
      const data = {
        state: 0,
      };
      await fetch(
        state.API.baseURL + "/api/auth/usuario/delete/" + payload.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + store._modules.root.state.access.access_token,
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          // console.log("Respuesta insert", payload);

          commit("setUsuariosMutation", payload);
        })
        .catch((err) => {
          console.error("Error al intentar ingresar", err);
        });
    },
    async perfilUpdateAction({ commit, state }, payload) {
      console.log("perfilUpdateAction payload", payload);
      const data = {
        name: payload.name,
        passwordOld: payload.passwordOld,
        password: payload.password,
      };

      await fetch(state.API.baseURL + "/api/auth/perfil/" + payload.idEdit, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + store._modules.root.state.access.access_token,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          // console.log("Respuesta insert", payload);

          commit("setUsuariosMutation", payload);
        })
        .catch((err) => {
          console.error("Error al intentar ingresar", err);
        });
    },
    cleanMessageAction({ commit }) {
      commit("cleanMessageMutation");
    },
  },
};

export default usuarios;
