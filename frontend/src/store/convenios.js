import { baseURL } from "./globalData";
import store from "./index";

const convenios = {
  namespaced: true,
  state: {
    API: {
      baseURL,
      message: "",
    },
  },
  mutations: {
    setConveniosMutation(state, payload) {
      // console.log("setConveniosMutation payload", payload);
      state.API.message = payload;
    },
    cleanMessageMutation(state) {
      state.API.message = "";
    },
  },
  actions: {
    async setConveniosAction({ commit, state }, payload) {
      // console.log("setConveniosAction commit, state", commit, state);
      // console.log("setConveniosAction payload", payload);
      // console.log(
      //   "store de access en store convenios ",
      //   store._modules.root.state.access.user_data
      // );

      // console.log("token", store._modules.root.state.access.access_token);
      console.log("document", payload.archivo);
      const data = {
        name_company_convenio: payload.name,
        created_by_user_id: store._modules.root.state.access.user_data.id,
        companys_id: store._modules.root.state.access.user_data.id_companys,
        states_id: 2,
        document_path: payload.archivo.name,
        date_start: payload.dateStart,
        date_end: payload.dateEnd,
        state: 1,
      };

      // console.log("Data insert", data);

      await fetch(state.API.baseURL + "/api/auth/convenio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + store._modules.root.state.access.access_token,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        // body: data, // body data type must match "Content-Type" header
      })
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          console.log("Respuesta insert", payload);

          commit("setConveniosMutation", payload);
        })
        .catch((err) => {
          console.error("Error al intentar ingresar", err);
        });
    },
    async updateConveniosAction({ commit, state }, payload) {
      // console.log("updateConveniosAction commit, state", commit, state);
      // console.log("updateConveniosAction payload", payload);
      // console.log(
      //   "store de access en store convenios ",
      //   store._modules.root.state.access.user_data
      // );

      // console.log("token", store._modules.root.state.access.access_token);
      console.log("document", payload.archivo);
      const data = {
        name_company_convenio: payload.name,
        created_by_user_id: store._modules.root.state.access.user_data.id,
        companys_id: store._modules.root.state.access.user_data.id_companys,
        states_id: 2,
        document_path: payload.archivo.name,
        date_start: payload.dateStart,
        date_end: payload.dateEnd,
        state: 1,
      };

      // console.log("Data insert", data);

      await fetch(state.API.baseURL + "/api/auth/convenio/edit/" + payload.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + store._modules.root.state.access.access_token,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        // body: data, // body data type must match "Content-Type" header
      })
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          console.log("Respuesta insert", payload);

          commit("setConveniosMutation", payload);
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

export default convenios;