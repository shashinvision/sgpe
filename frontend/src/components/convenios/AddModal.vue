<template>
  <!-- añadir modal -->
  <b-modal
    hide-footer
    id="addEditConvenioModal"
    :title="modalAddEdit.title"
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
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="inicioConvenio" size="sm">Inicio:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input type="date" id="inicioConvenio" size="sm"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="finConvenio" size="sm">Fin:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input type="date" id="finConvenio" size="sm"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="documentoConvenio" size="sm">Archivo:</label>
      </b-col>
      <b-col sm="10">
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
  </b-modal>
</template>

<script>
export default {
  name: "SgpeAddmodal",

  data() {
    return {
      archivo: null,
    };
  },
  props: {
    modalAddEdit: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
#formatos {
  font-size: 12px;
  color: green;
}
</style>
