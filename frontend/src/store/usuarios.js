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
    getCompanysMutation(state, payload) {
      // console.log("getCompanysMutation payload", payload);
      state.usuarios = payload;
    },
    setCompanysMutation(state, payload) {
      // console.log("setCompanysMutation payload", payload);
      state.API.message = payload;
    },
    cleanMessageMutation(state) {
      state.API.message = "";
    },
  },
  actions: {
    async getCompanysAction({ commit, state }) {
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
          let dataCompanys = payload;
          // console.log("dataCompanys payload", dataCompanys);

          commit("getCompanysMutation", dataCompanys);
        })
        .catch((err) => {
          console.error("Error al intentar obtener los datos", err);
        });
    },
    async setCompanysAction({ commit, state }, payload) {
      const data = {
        name: payload.name,
        state: 1,
      };
      await fetch(state.API.baseURL + "/api/auth/Usuario", {
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

          commit("setCompanysMutation", payload);
        })
        .catch((err) => {
          console.error("Error al intentar ingresar", err);
        });
    },
    async updateCompanysAction({ commit, state }, payload) {
      const data = {
        name: payload.datos.name,
        state: 1,
      };

      await fetch(
        state.API.baseURL + "/api/auth/Usuario/edit/" + payload.idEdit,
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

          commit("setCompanysMutation", payload);
        })
        .catch((err) => {
          console.error("Error al intentar ingresar", err);
        });
    },
    async deleteCompanysAction({ commit, state }, payload) {
      const data = {
        state: 0,
      };
      await fetch(
        state.API.baseURL + "/api/auth/Usuario/delete/" + payload.id,
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

          commit("setCompanysMutation", payload);
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
