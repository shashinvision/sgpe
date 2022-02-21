<template>
  <b-modal
    :id="infoModal.id"
    :title="infoModal.title"
    hide-footer
    @hide="resetInfoModal"
  >
    <div class="d-flex justify-content-between">
      <router-link
        :to="{ name: 'editar', params: { id: infoModal.id } }"
        class="btn btn-success"
        >Activar</router-link
      >
      <router-link
        :to="{ name: 'editar', params: { id: infoModal.id } }"
        class="btn"
        style="background-color: #f5c6cb"
        >Desactivar</router-link
      >
      <br />
      <button @click="addEdit" id="edit" class="btn btn-info">
        <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
      </button>

      <b-button @click="deleteItem" class="btn btn-danger">
        <b-icon icon="trash-fill" aria-hidden="true"></b-icon
      ></b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

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
  mounted() {},

  methods: {
    ...mapActions("convenios", {
      deleteConvenios: "deleteConveniosAction",
    }),
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
