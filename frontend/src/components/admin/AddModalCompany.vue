<template>
  <!-- añadir modal -->
  <b-modal hide-footer id="addEditModalCompany" title="titulo" size="xl">
    <FormAddEditCompany />
  </b-modal>
</template>

<script>
import FormAddEditCompany from "./FormAddEditCompany.vue";
import { mapActions, mapState } from "vuex";
import { baseURL } from "../../store/globalData";
export default {
  name: "SgpeAddmodal",
  components: {
    FormAddEditCompany,
  },
  data() {
    return {};
  },
  props: {
    infoModal: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    ...mapState("access", ["user_data"]),
    datos() {
      const datos = {
        name: "",
        dateStart: "",
        dateEnd: "",
        document: "",
        archivo: null,
      };
      return datos;
    },
  },

  methods: {
    ...mapActions("convenios", {}),

    storageUrl(data) {
      const arreglo = data.split("/");
      return baseURL + "/storage/" + arreglo[1];
    },
    limpieza() {
      this.datos.name = "";
      this.datos.dateStart = "";
      this.datos.dateEnd = "";
      this.datos.archivo = null;
      this.cleanMessage();
      // Para cerrar el modal y para abrir es igual pero se cambia el hide por show
      this.$root.$emit("bv::hide::modal", "addEditConvenioModal");
      this.$root.$emit("bv::hide::modal", "info-modal");
      this.$emit("refrescar", "");
    },
  },
};
</script>

<style scoped>
#formatos {
  font-size: 12px;
  color: green;
}
.mensaje {
  color: green;
}
</style>
