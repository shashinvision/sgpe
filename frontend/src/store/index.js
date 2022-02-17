import Vue from "vue";
import Vuex from "vuex";
import access from "./access";
import convenios from "./convenios";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    access,
    convenios,
  },
});
