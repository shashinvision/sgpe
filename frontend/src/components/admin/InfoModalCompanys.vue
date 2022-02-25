<template>
  <b-modal
    :id="infoModal.id"
    :title="infoModal.title"
    hide-footer
    @hide="resetInfoModal"
  >
    <!-- <pre>{{ infoModal.name }}</pre> -->
    <b-button variant="info" @click="verForm"> editar </b-button>
    <b-button variant="danger"> eliminar </b-button>
    <FormAddEditCompany v-if="formActivo" :infoModal="infoModal" />
  </b-modal>
</template>

<script>
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
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.name = "";
    },
    verForm() {
      return (this.formActivo = !this.formActivo);
    },
  },
};
</script>

<style scoped></style>
