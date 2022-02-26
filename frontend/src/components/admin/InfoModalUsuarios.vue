<template>
  <b-modal
    :id="infoModal.id"
    :title="infoModal.title"
    hide-footer
    @hide="resetInfoModal"
  >
    <!-- <pre>{{ infoModal.name }}</pre> -->
    <b-button variant="info" @click="verForm"> editar </b-button>
    <b-button variant="danger" @click="deleteItem"> eliminar </b-button>
    <FormAddEditUsuario
      v-if="formActivo"
      :infoModal="infoModal"
      @refrescar="refrescar"
    />
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import FormAddEditUsuario from "./FormAddEditUsuario.vue";
export default {
  name: "SgpeInfomodal",
  components: { FormAddEditUsuario },
  data() {
    return {
      formActivo: false,
    };
  },
  props: {
    infoModal: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    ...mapActions("usuarios", ["deleteUsuariosAction"]),
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.name = "";
      this.infoModal.id_companys = null;
      this.infoModal.id_permissions = null;
    },
    verForm() {
      return (this.formActivo = !this.formActivo);
    },
    deleteItem() {
      if (
        confirm(
          "¡Alerta!, ¿Estas seguro de querer eliminar este registro?.\n\rEl registro no se visualizará en la tabla después de esta acción, pero sus datos se conservará en la base de datos de forma interna."
        )
      ) {
        let idUsuario = this.infoModal.title.split("#");

        this.deleteUsuariosAction({ id: idUsuario[1] });
        setTimeout(() => {
          this.$emit("refrescar", "");

          this.$root.$emit("bv::hide::modal", "info-modal");
        }, 500);
      }
    },
    refrescar() {
      this.$emit("refrescar", "");
    },
  },
};
</script>

<style scoped></style>
