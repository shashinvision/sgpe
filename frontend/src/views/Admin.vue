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
                Active</b-nav-item
              >
              <b-nav-item
                :active="!navActive"
                :desactived="!navActive"
                @click="activarDesactivarNav"
                >Inactive</b-nav-item
              >
              <!-- <b-nav-item disabled>Disabled</b-nav-item> -->
            </b-nav>
          </b-card-header>

          <b-card-body class="text-center">
            <b-card-text v-if="navActive">
              1 With supporting text below as a natural lead-in to additional
              content.
            </b-card-text>

            <b-card-text v-else>
              2 With supporting text below as a natural lead-in to additional
              content.
            </b-card-text>

            <b-button variant="primary">Go somewhere</b-button>
          </b-card-body>
        </b-card>
      </div>
    </main>
  </b-container>
</template>

<script>
export default {
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

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
