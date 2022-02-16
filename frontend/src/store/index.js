import Vue from "vue";
import Vuex from "vuex";
import access from "./access";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { access },
});
