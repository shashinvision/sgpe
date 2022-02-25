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
    <FormAddEditCompany v-if="formActivo" :infoModal="infoModal" />
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import FormAddEditCompany from "./FormAddEditCompany.vue";
export default {
  name: "SgpeInfomodal",
  components: { FormAddEditCompany },
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
    ...mapActions("companys", ["deleteCompanysAction"]),
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.name = "";
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
        let idCompany = this.infoModal.title.split("#");

        this.deleteCompanysAction({ id: idCompany[1] });
        setTimeout(() => {
          this.$emit("datosTabla", "");

          this.$root.$emit("bv::hide::modal", "info-modal");
        }, 500);
      }
    },
  },
};
</script>

<style scoped></style>
