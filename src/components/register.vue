<template>
<v-card     class="mx-auto"
    max-width="450" max-height="150" elevation="13">
    <v-card-title>Registration New User </v-card-title>
<div id="app">
  <v-app id="inspire">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
    <form action="#" @submit.prevent="submit">
              <v-text-field
        v-model="form.name"
        :error-messages="nameErrors"
        :counter="10"
        label="Username"
        required
      ></v-text-field>
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
      <v-btn
        class="mr-4"
        @click="submit">
     Create
      </v-btn>
    </form>
  </v-app>
</div>
</v-card>
</template>


<script>
import firebase from "firebase";
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        name: "",
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
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {});
                  axios.post(`https://api.jag.network/user/${firebase.auth().currentUser.uid}`);
                  const user = firebase.auth().currentUser;
          this.$router.replace({ name: "account" });

      // send the signed in user a verification email
      user.sendEmailVerification();
        })
        
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>