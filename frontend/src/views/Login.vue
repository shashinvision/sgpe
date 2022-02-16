<template>
  <b-container fluid class="text-center">
    <main class="form-signin">
      <form>
        <!-- <img
        class="mb-4"
        src="/docs/5.0/assets/brand/bootstrap-logo.svg"
        alt=""
        width="72"
        height="57"
      /> -->
        <h1 class="h3 mb-3 fw-normal">Please login</h1>

        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="dataLogin.email"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="dataLogin.password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <!-- 
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div> -->
        <button
          class="w-100 btn btn-lg btn-primary"
          type="submit"
          @click.prevent="onSubmit"
        >
          Login
        </button>
        <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
      </form>
    </main>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SgpeLogin",

  data() {
    return {
      dataLogin: {
        email: "felipei.mancilla@gmail.com",
        password: "1234",
        remember_token: true,
      },
    };
  },

  mounted() {},

  methods: {
    ...mapActions("access", {
      login: "loginAction",
    }),
    async onSubmit() {
      try {
        await this.login(this.dataLogin);
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.error(error);
      }
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
