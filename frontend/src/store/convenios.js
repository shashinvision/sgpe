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
      // const data = {
      //   name_company_convenio: payload.name,
      //   created_by_user_id: store._modules.root.state.access.user_data.id,
      //   companys_id: store._modules.root.state.access.user_data.id_companys,
      //   states_id: 2,
      //   document_path: payload.archivo.name,
      //   date_start: payload.dateStart,
      //   date_end: payload.dateEnd,
      //   state: 1,
      // };

      // console.log("Data insert", data);

      let data = new FormData();
      data.append("name_company_convenio", payload.name);
      data.append(
        "created_by_user_id",
        store._modules.root.state.access.user_data.id
      );
      data.append(
        "companys_id",
        store._modules.root.state.access.user_data.id_companys
      );
      data.append("states_id", 2);
      data.append(
        "document_path",
        payload.archivo != null ? payload.archivo : payload.document
      );
      data.append("date_start", payload.dateStart);
      data.append("date_end", payload.dateEnd);
      data.append("state", 1);

      await fetch(state.API.baseURL + "/api/auth/convenio", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization:
            "Bearer " + store._modules.root.state.access.access_token,
          "X-Requested-With": "XMLHttpRequest",
        },
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
        body: data, // Cuando se usa FormData JSON.stringify, no se necesita body data type must match "Content-Type" header
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
      // const data = {
      //   name_company_convenio: payload.name,
      //   created_by_user_id: store._modules.root.state.access.user_data.id,
      //   companys_id: store._modules.root.state.access.user_data.id_companys,
      //   states_id: 2,
      //   document_path: payload.archivo.name,
      //   date_start: payload.dateStart,
      //   date_end: payload.dateEnd,
      //   state: 1,
      // };

      // console.log("updateConveniosAction commit", commit);
      // console.log("updateConveniosAction state", state);
      // console.log("updateConveniosAction payload", payload);

      let data = new FormData();
      data.append("name_company_convenio", payload.datos.name);
      data.append(
        "created_by_user_id",
        store._modules.root.state.access.user_data.id
      );
      data.append(
        "companys_id",
        store._modules.root.state.access.user_data.id_companys
      );
      data.append("states_id", 2);
      data.append(
        "document_path",
        payload.datos.archivo != null
          ? payload.datos.archivo
          : payload.datos.document
      );
      data.append("date_start", payload.datos.dateStart);
      data.append("date_end", payload.datos.dateEnd);
      data.append("state", 1);

      await fetch(
        state.API.baseURL + "/api/auth/convenio/edit/" + payload.idEdit,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization:
              "Bearer " + store._modules.root.state.access.access_token,
            "X-Requested-With": "XMLHttpRequest",
          },
          // body: JSON.stringify(data), // body data type must match "Content-Type" header
          body: data, // Cuando se usa FormData JSON.stringify, no se necesita body data type must match "Content-Type" header
        }
      )
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
    async deleteConveniosAction({ commit, state }, payload) {
      const data = {
        state: 0,
      };
      await fetch(
        state.API.baseURL + "/api/auth/convenio/delete/" + payload.id,
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
