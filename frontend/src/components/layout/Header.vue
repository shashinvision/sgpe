<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">
      <b-icon icon="archive-fill" scale="2" variant=""></b-icon>
      <span> &nbsp; SGPE</span>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav> -->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit"
            >Buscar</b-button
          >
        </b-nav-form> -->
        <!-- 
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown v-if="auth" right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <!-- <em>Menú</em> -->
            <b id="colorMenu">Menú</b>
          </template>
          <b-dropdown-item to="/Perfil">Perfil</b-dropdown-item>
          <b-dropdown-item to="/">Convenios</b-dropdown-item>
          <b-dropdown-item
            v-if="user_data.id_permissions === 1"
            :to="{ name: 'Admin' }"
          >
            Administración
          </b-dropdown-item>
          <b-dropdown-item v-if="auth" @click="logoutNow"
            >Cerrar sesión</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SgpeHeader",

  data() {
    return {};
  },
  computed: {
    ...mapState("access", ["auth", "user_data"]),
  },
  mounted() {},
  methods: {
    ...mapActions("access", {
      logout: "logoutAction",
    }),
    logoutNow() {
      this.logout();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="css" scoped>
#colorMenu {
  color: white !important;
}
</style>
