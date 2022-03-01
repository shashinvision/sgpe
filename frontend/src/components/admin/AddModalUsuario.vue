<template>
  <!-- añadir modal -->
  <b-modal
    hide-footer
    id="addEditModalUsuario"
    :title="infoModal.title"
    size="xl"
  >
    <FormAddEditUsuario :infoModal="infoModal" @refrescar="refrescar" />
  </b-modal>
</template>

<script>
import FormAddEditUsuario from "./FormAddEditUsuario.vue";
import { mapState } from "vuex";
export default {
  name: "SgpeAddmodalUsuario",
  components: {
    FormAddEditUsuario,
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
  },

  methods: {
    refrescar() {
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
