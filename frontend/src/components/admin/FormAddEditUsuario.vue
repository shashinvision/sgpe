<template>
  <div class="mt-3">
    <b-row class="my-1">
      <b-col sm="2">
        <label for="nombreUsuario" size="sm">Usuario:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="nombreUsuario"
          placeholder="Nombre usuario..."
          size="sm"
          v-model="datos.name"
        ></b-form-input>
      </b-col>
      <b-col sm="2">
        <label for="emailUsuario" size="sm">Email:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="emailUsuario"
          placeholder="Email usuario..."
          size="sm"
          v-model="datos.email"
        ></b-form-input>
      </b-col>
      <b-col sm="2" v-if="infoModal.title === 'Añadir Usuario'">
        <label for="passwordUsuario" size="sm">Contraseña:</label>
      </b-col>
      <b-col sm="10" v-if="infoModal.title === 'Añadir Usuario'">
        <b-form-input
          id="emailUsuario"
          placeholder="Email usuario..."
          size="sm"
          type="password"
          v-model="datos.password"
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
  name: "SgpeFormAddEditUsuario",

  data() {
    return {};
  },
  computed: {
    ...mapState("usuarios", ["API"]),
    datos() {
      const datos = {
        name: this.infoModal.name,
        email: this.infoModal.email,
        password: this.infoModal.password,
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
    ...mapActions("usuarios", {
      setUsuarios: "setUsuariosAction",
      updateUsuarios: "updateUsuariosAction",
      cleanMessage: "cleanMessageAction",
    }),
    addEdit() {
      if (this.infoModal.title === "Añadir Usuario") {
        this.setUsuarios(this.datos);
        setTimeout(() => {
          this.limpieza();
        }, 1000);
      } else {
        const idEdit = this.infoModal.title.split("#");
        // console.log("id edit", idEdit[1]);
        this.updateUsuarios({
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
