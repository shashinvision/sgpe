<template>
  <b-container fluid class="text-center">
    <main class="form-signin">
      <h1 class="h2 mb-3 fw-normal">Panel de administración</h1>

      <div>
        <b-card title="Card Title" no-body>
          <b-card-header header-tag="nav">
            <b-nav card-header tabs>
              <b-nav-item
                :active="navActive"
                :desactived="!navActive"
                @click="activarDesactivarNav"
              >
                Empresas</b-nav-item
              >
              <b-nav-item
                :active="!navActive"
                :desactived="!navActive"
                @click="activarDesactivarNav"
                >Usuarios</b-nav-item
              >
              <!-- <b-nav-item disabled>Disabled</b-nav-item> -->
            </b-nav>
          </b-card-header>

          <b-card-body>
            <Empresas v-if="navActive" />
            <Usuarios v-else />
          </b-card-body>
        </b-card>
      </div>
    </main>
  </b-container>
</template>

<script>
import Empresas from "../components/admin/Empresas.vue";
import Usuarios from "../components/admin/Usuarios.vue";
export default {
  components: {
    Empresas,
    Usuarios,
  },
  name: "SgpeAdmin",

  data() {
    return {
      navActive: true,
    };
  },

  mounted() {},

  methods: {
    activarDesactivarNav() {
      return (this.navActive = !this.navActive);
    },
  },
};
</script>
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 70%;
  padding: 15px;
  margin: auto;
}
</style>
