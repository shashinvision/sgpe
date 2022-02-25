<template>
  <div>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="inicioConvenio" size="sm">Empresa:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="nombreEmpresa"
          placeholder="Nombre empresa..."
          size="sm"
          v-model="datos.name"
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="12" class="my-1 d-flex flex-row-reverse">
        <i class="mensaje">{{ API.message }}</i>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12" class="my-1 d-flex flex-row-reverse">
        <b-button variant="info" class="w-sm-100" id="add" @click="addEdit"
          >Guardar</b-button
        >
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SgpeFormAddEditCompany",

  data() {
    return {};
  },
  computed: {
    ...mapState("companys", ["API"]),
    datos() {
      const datos = {
        name: this.infoModal.name,
      };
      return datos;
    },
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
    ...mapActions("companys", {
      setCompanys: "setCompanysAction",
      updateCompanys: "updateCompanysAction",
      cleanMessage: "cleanMessageAction",
    }),
    addEdit() {
      if (this.infoModal.title === "Añadir Empresa") {
        this.setCompanys(this.datos);
        setTimeout(() => {
          this.limpieza();
        }, 1000);
      } else {
        const idEdit = this.infoModal.title.split("#");
        // console.log("id edit", idEdit[1]);
        this.updateCompanys({
          datos: { ...this.datos },
          idEdit: idEdit[1],
        });
        setTimeout(() => {
          this.limpieza();
        }, 1000);
      }
    },
    limpieza() {
      this.datos.name = "";
      this.cleanMessage();
      // Para cerrar el modal y para abrir es igual pero se cambia el hide por show
      this.$root.$emit("bv::hide::modal", "info-modal");
      this.$emit("refrescar", "");
    },
  },
};
</script>

<style scoped>
.mensaje {
  color: green;
}
</style>
