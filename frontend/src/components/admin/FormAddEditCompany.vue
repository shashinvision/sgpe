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
    </b-row>
    <b-row>
      <b-col lg="12" class="my-1 d-flex flex-row-reverse">
        <i class="mensaje">mesaje</i>
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
export default {
  name: "SgpeFormAddEditCompany",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    addEdit() {
      alert("ADD edit ");
    },
  },
};
</script>

<style scoped></style>
