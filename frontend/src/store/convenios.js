import { baseURL } from "./globalData";
import store from "./index";

const convenios = {
  namespaced: true,
  state: {
    API: {
      baseURL,
    },
  },
  mutations: {
    setConveniosMutation(state, payload) {
      console.log(state);
      console.log("setConveniosMutation payload", payload);
    },
  },
  actions: {
    async setConveniosAction({ commit, state }, payload) {
      console.log("setConveniosAction commit, state", commit, state);
      console.log("setConveniosAction payload", payload);
      console.log(
        "store de access en store convenios ",
        store._modules.root.state.access.user_data
      );

      commit("setConveniosMutation", payload);
      //   await fetch(state.API.baseURL + state.API.logout, {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + state.access_token,
      //       "X-Requested-With": "XMLHttpRequest",
      //     },
      //   })
      //     .then((res) => {
      //       return res.json();
      //     })
      //     .then((payload) => {
      //       console.log("Respuesta logout", payload);

      //       commit("setConveniosMutation");
      //     })
      //     .catch(function (err) {
      //       console.error("Error al intentar ingresar", err);
      //     });
    },
  },
};

export default convenios;
