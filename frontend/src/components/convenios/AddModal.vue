<template>
  <!-- añadir modal -->
  <b-modal
    hide-footer
    id="addEditConvenioModal"
    :title="this.infoModal.title"
    size="xl"
  >
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
    <b-row class="my-1">
      <b-col sm="2">
        <label for="inicioConvenio" size="sm">Inicio:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          type="date"
          id="inicioConvenio"
          size="sm"
          v-model="datos.dateStart"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="finConvenio" size="sm">Fin:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          type="date"
          id="finConvenio"
          size="sm"
          v-model="datos.dateEnd"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="documentoConvenio" size="sm">Archivo:</label>
      </b-col>
      <b-col sm="10">
        <div v-if="this.infoModal.title != 'Añadir Convenio'">
          <a
            v-if="this.infoModal.content.document"
            :href="storageUrl(this.infoModal.content.document)"
            target="_blank"
          >
            <b-icon icon="file-earmark-text-fill"></b-icon>
          </a>
          <p v-else>Sin documento</p>
        </div>
        <b-form-file
          accept=".jpg, .jpeg, .png, .pdf"
          v-model="datos.archivo"
          :state="Boolean(datos.archivo)"
          placeholder="Elija un archivo o suéltelo aquí..."
          drop-placeholder="Suelta el archivo aquí..."
          size="sm"
        ></b-form-file>
        <i id="formatos">Formatos aceptados: .jpg, .jpeg, .png, .pdf</i>
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
  </b-modal>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { baseURL } from "../../store/globalData";
export default {
  name: "SgpeAddmodal",

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
    ...mapState("convenios", ["API"]),
    datos() {
      const datos = {
        name: this.infoModal.content.name,
        dateStart: this.infoModal.content.dateStart,
        dateEnd: this.infoModal.content.dateEnd,
        document: this.infoModal.content.document,
        archivo: null,
      };
      return datos;
    },
  },

  methods: {
    ...mapActions("convenios", {
      setConvenios: "setConveniosAction",
      updateConvenios: "updateConveniosAction",
      cleanMessage: "cleanMessageAction",
    }),
    addEdit() {
      if (this.infoModal.title === "Añadir Convenio") {
        if (
          this.datos.name === "" ||
          this.datos.dateStart === "" ||
          this.datos.dateEnd === "" ||
          this.datos.archivo === null
        ) {
          alert("Debe completar todos los campos para seguir");
        } else {
          // Code to Add
          // console.log("datos en add", this.datos);
          // console.log("this.infoModal.content", this.infoModal);
          this.setConvenios(this.datos);
          setTimeout(() => {
            this.limpieza();
          }, 1000);
        }
      } else {
        if (
          this.datos.name === "" ||
          this.datos.dateStart === "" ||
          this.datos.dateEnd === ""
        ) {
          alert("Debe completar todos los campos para seguir");
        } else {
          const idEdit = this.infoModal.title.split("#");
          // console.log("id edit", idEdit[1]);
          this.updateConvenios({
            datos: { ...this.datos },
            idEdit: idEdit[1],
          });
          setTimeout(() => {
            this.limpieza();
          }, 1000);
        }
      }
    },
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
