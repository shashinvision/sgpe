<template>
  <b-modal
    :id="infoModal.id"
    :title="infoModal.title"
    hide-footer
    @hide="resetInfoModal"
  >
    <div class="d-flex justify-content-between">
      <button
        @click="activaDesactiva(1)"
        id="activar"
        class="btn btn-success"
        v-if="
          !infoModal.content.isActive &&
          (user_data.id_permissions === 1 || user_data.id_permissions === 3)
        "
      >
        Activar
      </button>
      <button
        @click="activaDesactiva(2)"
        id="desactivar"
        class="btn btn-warning"
        v-else-if="
          infoModal.content.isActive &&
          (user_data.id_permissions === 1 || user_data.id_permissions === 3)
        "
      >
        Desactivar
      </button>

      <button
        @click="addEdit"
        id="edit"
        class="btn btn-info"
        v-if="user_data.id_permissions === 1 || user_data.id_permissions === 5"
      >
        <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
      </button>

      <b-button
        @click="deleteItem"
        class="btn btn-danger"
        v-if="user_data.id_permissions === 1 || user_data.id_permissions === 5"
      >
        <b-icon icon="trash-fill" aria-hidden="true"></b-icon
      ></b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SgpeInfomodal",

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
  mounted() {},

  methods: {
    ...mapActions("convenios", {
      deleteConvenios: "deleteConveniosAction",
      activarDesactivarConvenio: "activarDesactivarConveniosAction",
    }),
    activaDesactiva(estado) {
      let approved_by_user_id = estado == 1 ? this.user_data.id : "";
      let disapproved_by_user_id = estado == 2 ? this.user_data.id : "";

      if (
        confirm(
          `¡Alerta!, ¿Estas seguro de querer ${
            estado == 1 ? "activar " : "desactivar"
          } el convenio ?.`
        )
      ) {
        this.activarDesactivarConvenio({
          id: this.infoModal.content.id,
          states_id: estado,
          approved_by_user_id,
          disapproved_by_user_id,
        });
        setTimeout(() => {
          this.$emit("datosTabla", "");

          this.$root.$emit("bv::hide::modal", "info-modal");
        }, 500);
      }
    },
    deleteItem() {
      if (
        confirm(
          "¡Alerta!, ¿Estas seguro de querer eliminar este registro?.\n\rEl registro no se visualizará en la tabla después de esta acción, pero sus datos se conservará en la base de datos de forma interna."
        )
      ) {
        this.deleteConvenios({ id: this.infoModal.content.id });
        setTimeout(() => {
          this.$emit("datosTabla", "");

          this.$root.$emit("bv::hide::modal", "info-modal");
        }, 500);
      }
    },
    resetInfoModal() {
      this.$emit("resetInfoModal", "");
    },
    addEdit(e) {
      // se envía el evento completo al componente padre
      this.$emit("addEdit", e);
    },
  },
};
</script>

<style scoped></style>
