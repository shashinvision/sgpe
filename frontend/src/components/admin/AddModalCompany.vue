<template>
  <!-- añadir modal -->
  <b-modal
    hide-footer
    id="addEditModalCompany"
    :title="infoModal.title"
    size="xl"
  >
    <FormAddEditCompany :infoModal="infoModal" @refrescar="refrescar" />
  </b-modal>
</template>

<script>
import FormAddEditCompany from "./FormAddEditCompany.vue";
import { mapState } from "vuex";
export default {
  name: "SgpeAddmodalCompany",
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
