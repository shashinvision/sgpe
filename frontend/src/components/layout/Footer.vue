<template>
  <div class="fluid-container footer">
    <p class="text-center">
      Copyright &copy; 2022,
      <a href="https://felipemancilla.herokuapp.com/" target="_blank"
        >Felipe Ignacio Mancilla Reyes</a
      >. Todos los derechos reservados.
    </p>
  </div>
</template>

<script>
export default {
  name: "SgpeFooter",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.footer {
  background-color: #4526a0;
  position: fixed;
  bottom: 0 !important;
  width: 100%;
  color: white;
}
.fluid-container.footer {
  background: #17a2b8;
}
.fluid-container.footer > *:last-child {
  margin-bottom: 0px;
  color: #fff;
}
a {
  color: #fff;
}
</style>
