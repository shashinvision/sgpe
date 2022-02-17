<template>
  <!-- añadir modal -->
  <b-modal
    hide-footer
    id="addEditConvenioModal"
    :title="infoModal.title"
    size="xl"
  >
    <b-row class="my-1">
      <b-col sm="2">
        <label for="inicioConvenio" size="sm">Empresa:</label>
      </b-col>
      <b-col sm="10">
        <b-form-select
          id="nombreEmpresa"
          v-model="selected"
          :options="options"
          size="sm"
        ></b-form-select>

        <!-- <b-form-input
          id="nombreEmpresa"
          placeholder="Nombre empresa..."
          size="sm"
          :value="infoModal.content.name"
        ></b-form-input> -->
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
          :value="infoModal.content.dateStart"
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
          :value="infoModal.content.dateEnd"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="documentoConvenio" size="sm">Archivo:</label>
      </b-col>
      <b-col sm="10">
        <a
          v-if="infoModal.title != 'Añadir Convenio'"
          :href="infoModal.content.document"
          target="_blank"
        >
          {{ infoModal.content.document }}
        </a>
        <b-form-file
          accept=".jpg, .jpeg, .png, .pdf"
          v-model="archivo"
          :state="Boolean(archivo)"
          placeholder="Elija un archivo o suéltelo aquí..."
          drop-placeholder="Suelta el archivo aquí..."
          size="sm"
        ></b-form-file>
        <i id="formatos">Formatos aceptados: .jpg, .jpeg, .png, .pdf</i>
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
export default {
  name: "SgpeAddmodal",

  data() {
    return {
      archivo: null,
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
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

  mounted() {},

  methods: {
    addEdit() {
      if (this.infoModal.title === "Añadir Convenio") {
        // Code to Save
        alert("save");
      } else {
        // COde to Edit
        alert("edit");
      }
    },
  },
};
</script>

<style scoped>
#formatos {
  font-size: 12px;
  color: green;
}
</style>
