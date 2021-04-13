<template>
<v-card     class="mx-auto"
    max-width="450" max-height="150" elevation="13">
    <v-card-title>Login </v-card-title>
<div id="app">
  <v-app id="inspire">
      <div v-if="error" class="alert alert-danger">{{error}}</div>
    <form action="#" @submit.prevent="submit">
      <v-text-field
        v-model="form.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
      ></v-text-field>
            <v-text-field
        v-model="form.password"
        :error-messages="emailErrors"
        label="password"
        type=password
        required
      ></v-text-field>
      <v-card-subtitle >Don't have an account? <a href="/register">create New Account</a> </v-card-subtitle>
      <v-btn
        class="mr-4"
        @click="submit">
     submit
      </v-btn>
    </form>
  </v-app>
</div>
</v-card>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          this.$router.replace({ name: "account" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>