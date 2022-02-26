import Vue from "vue";
import Vuex from "vuex";
import access from "./access";
import convenios from "./convenios";
import companys from "./companys";
import usuarios from "./usuarios";
import permissions from "./permissions";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    access,
    convenios,
    companys,
    usuarios,
    permissions,
  },
});
