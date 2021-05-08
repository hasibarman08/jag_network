<template>
    <v-row class="ma-0">
        <v-col sm="6" cols="12" class="purple darken-1 pa-7 d-flex align-items-center hv-sm-100">
            <div class="ma-auto text-center white--text">
                <v-icon class="contact-icon purple--text darken-1" x-large>mdi-login</v-icon>
                <br/>
                <div class="subtitle my-5">Have account? please
                    <v-btn class="ml-2 white--text" outlined :to="{name:'login'}">Login</v-btn>
                </div>
            </div>
        </v-col>
        <v-col sm="6" cols="12" class="px-7 py-3 hv-sm-100 d-flex">
            <v-card class="ma-auto" elevation="0" :width="$vuetify.breakpoint.smAndUp ? '70%' : '85%'">
                <v-form ref="form" class="text-center">
                    <div class="headline secondary--text font-weight-bold my-2">Sign Up</div>
                    <v-text-field v-model="form.name"
                                  label="Username*"
                                  class="my-5"
                                  required
                                  :rules="rules.requiredRules"
                    >
                    </v-text-field>
                    <v-text-field v-model="form.email"
                                  label="Email*"
                                  type="email"
                                  class="my-5"
                                  required
                                  :rules="rules.emailRules"
                    >
                    </v-text-field>
                    <v-text-field v-model="form.password"
                                  label="Password*"
                                  type="password"
                                  class="my-5"
                                  required
                                  :rules="rules.requiredRules"
                    >
                    </v-text-field>
                    <v-btn class="purple darken-1 white--text my-3" @click="register">register</v-btn>
                    <v-alert
                            dense
                            outlined
                            color="error"
                            class="my-5"
                            dismissible
                            v-if="error"
                    >
                        {{error}}
                    </v-alert>
                                        <v-alert
                            dense
                            outlined
                            color="success"
                            class="my-5"
                            dismissible
                            v-if="success"
                    >
                        {{success}}
                    </v-alert>
                </v-form>
            </v-card>

        </v-col>
    </v-row>
</template>

<script>
    import firebase from "firebase";
    import axios from 'axios';

    export default {
        name: 'App',
        data: () => ({
            uid:'',
            form: {
                email: "",
                password: ""
            },
            error: null,
            success:null,
            rules: {
                requiredRules: [v => !!v || 'This field is required'],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
            }
        }),

        methods: {
            register() {
                this.error = null;
                if (this.$refs.form.validate()) {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(this.form.email, this.form.password)
                        .then(data => {
                            data.user
                                .updateProfile({
                                    displayName: this.form.name
                                })
                                .then(() => {
                                });
                    const user = firebase.auth().currentUser;
                    console.log(user)
                  axios.post(`https://api.jag.network/user/${user.uid}`,{email:this.form.email,name:this.form.name})
                  .then((response) => {
  axios.post(`https://api.jag.network/wallet/${user.uid}`,{address:"13XUm3U9NkQzdiH28YH5hsXd27b83cLGLaFf4PiCt4FxW3dFJXm"});
                  axios.post(`https://api.jag.network/payment/${user.uid}`,{});  
}, (error) => {
  console.log(error);
});                               
                  // send the signed in user a verification email
                  user.sendEmailVerification();
          this.success = "an email was sended to your email address, please confirm your registration"
                        })

                        .catch(err => {
                            this.error = err.message;
                        });
                }
            },
        },
    };
</script>
<style>
    .contact-icon {
        background: white;
        border-radius: 50%;
        padding: 10px;
        margin: 20px;
    }
</style>
