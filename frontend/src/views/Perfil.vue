<template>
  <b-container fluid class="text-center">
    <main class="form-signin">
      <form>
        <h1 class="h3 mb-3 fw-normal">Configuración Perfil</h1>
        <p>
          Bienvenido
          <b> {{ dataLogin.name || user_data.name }} </b>
        </p>
        <div class="form-floating mt-3">
          <label for="floatingInput">Email</label>
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            :value="user_data.email"
            readonly
          />
        </div>
        <div class="form-floating mt-3">
          <label for="companyName">Compañía</label>
          <input
            type="email"
            class="form-control"
            id="companyName"
            :value="user_data.company"
            readonly
          />
        </div>
        <div class="form-floating mt-3">
          <label for="permissionName">Permisos</label>
          <input
            type="email"
            class="form-control"
            id="permissionName"
            :value="user_data.permissions"
            readonly
          />
        </div>
        <div class="form-floating mt-3">
          <label for="nombreUsuario">Nombre de usuario</label>
          <input
            type="text"
            class="form-control"
            id="nombreUsuario"
            placeholder="Nuevo nombre..."
            v-model="dataLogin.name"
          />
        </div>
        <div class="form-floating mt-3">
          <label for="floatingPasswordOld">Contraseña antigua</label>
          <input
            type="password"
            class="form-control"
            id="floatingPasswordOld"
            placeholder="Password..."
            v-model="dataLogin.passwordOld"
          />
        </div>
        <div class="form-floating mt-3">
          <div class="form-floating mt-3">
            <label for="floatingPassword">Nueva Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password..."
              v-model="dataLogin.password"
            />
            <label for="floatingPasswordConf">Confirmar contraseña</label>
            <input
              type="password"
              class="form-control"
              id="floatingPasswordConf"
              placeholder="Password..."
              v-model="dataLogin.passwordConf"
            />
          </div>

          <b-row>
            <b-col lg="12" class="my-1 d-flex flex-row-reverse">
              <i
                style="color: red"
                v-show="
                  dataLogin.passwordConf !== '' &&
                  dataLogin.password !== '' &&
                  dataLogin.passwordConf !== dataLogin.password
                "
              >
                Las contraseñas no coinciden</i
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12" class="my-1 d-flex flex-row-reverse">
              <i style="color: blue">{{ API.message }}</i>
            </b-col>
          </b-row>
        </div>
        <!-- 
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div> -->
        <b-button
          class="w-100 btn btn-lg"
          variant="success"
          @click="editarPerfil"
          :disabled="
            (dataLogin.passwordConf != '' &&
              dataLogin.passwordOld == '' &&
              dataLogin.password == '') ||
            (dataLogin.passwordOld != '' &&
              dataLogin.passwordConf == '' &&
              dataLogin.password == '') ||
            (dataLogin.password != '' &&
              dataLogin.passwordConf == '' &&
              dataLogin.passwordOld == '') ||
            (dataLogin.passwordOld !== '' &&
              dataLogin.passwordConf !== dataLogin.password)
          "
        >
          Guardar
        </b-button>
        <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
      </form>
    </main>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SgpePerfil",

  data() {
    return {
      dataLogin: {
        name: localStorage.getItem("userName") || "",
        passwordOld: "",
        password: "",
        passwordConf: "",
        idEdit: "",
      },
    };
  },
  computed: {
    ...mapState("access", ["user_data"]),
    ...mapState("usuarios", ["API"]),
  },
  updated() {},

  methods: {
    ...mapActions("usuarios", {
      login: "loginAction",
      perfilUpdate: "perfilUpdateAction",
      cleanMessage: "cleanMessageAction",
    }),
    editarPerfil() {
      this.dataLogin.idEdit = this.user_data.id;
      this.perfilUpdate(this.dataLogin);
      localStorage.setItem("userName", this.dataLogin.name);
      setTimeout(() => {
        this.cleanMessage();
      }, 3000);
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
  max-width: 330px;
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
