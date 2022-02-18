import { baseURL } from "./globalData";
import store from "./index";

const convenios = {
  namespaced: true,
  state: {
    API: {
      baseURL,
      message: "",
    },
    convenios: {},
  },
  mutations: {
    getConveniosMutation(state, payload) {
      // console.log("getConveniosMutation payload", payload);
      state.convenios = payload;
    },
    setConveniosMutation(state, payload) {
      // console.log("setConveniosMutation payload", payload);
      state.API.message = payload;
    },
    cleanMessageMutation(state) {
      state.API.message = "";
    },
  },
  actions: {
    async getConveniosAction({ commit, state }) {
      // console.log("Data insert", data);

      await fetch(state.API.baseURL + "/api/auth/convenios", {
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
          let dataConvenios = payload;
          // console.log("dataConvenios payload", dataConvenios);

          for (let i = 0; i < dataConvenios.length; i++) {
            // console.log("dataconvenios", dataConvenios[i]);
            if (dataConvenios[i].state == "Vigente") {
              dataConvenios[i].isActive = true;
              dataConvenios[i]._rowVariant = "success";
            } else if (dataConvenios[i].state == "No vigente") {
              dataConvenios[i].isActive = false;
              dataConvenios[i]._rowVariant = "danger";
            }
          }
          // console.log("getConveniosAction payload", dataConvenios);

          commit("getConveniosMutation", dataConvenios);
        })
        .catch((err) => {
          console.error("Error al intentar obtener los datos", err);
        });
    },
    async setConveniosAction({ commit, state }, payload) {
      // console.log("setConveniosAction commit, state", commit, state);
      // console.log("setConveniosAction payload", payload);
      // console.log(
      //   "store de access en store convenios ",
      //   store._modules.root.state.access.user_data
      // );

      // console.log("token", store._modules.root.state.access.access_token);
      // console.log("document", payload.archivo);
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
          // console.log("Respuesta insert", payload);

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
      // console.log("document", payload.archivo);
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
