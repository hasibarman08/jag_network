<template>
    <v-row class="ma-0">
        <v-col sm="6" cols="12" class="purple darken-1 pa-7 d-flex align-items-center hv-sm-100">
            <div class="ma-auto text-center white--text">
                <v-icon class="contact-icon purple--text darken-1" x-large>mdi-login</v-icon>
                <br/>
                <div class="subtitle my-5">Don't have account? please
                    <v-btn class="ml-2 white--text" outlined>Sign Up</v-btn>
                </div>
                <span class="my-5">
                    <v-btn rounded text class="lime--text text-capitalize" link><u>Forget password?</u></v-btn>
                </span>
            </div>
        </v-col>
        <v-col sm="6" cols="12" class="px-7 py-3 hv-sm-100 d-flex">
            <v-card class="ma-auto" elevation="0" :width="$vuetify.breakpoint.smAndUp ? '70%' : '85%'">
                <v-form ref="form" class="text-center">
                    <div class="headline secondary--text font-weight-bold my-2">Login</div>
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
                    <v-btn class="purple darken-1 white--text my-3" @click="login">login</v-btn>
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
                </v-form>
            </v-card>

        </v-col>
    </v-row>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: 'App',
        data: () => ({
            form: {
                email: "",
                password: ""
            },
            error: null,
            rules: {
                requiredRules: [v => !!v || 'This field is required'],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
            }
        }),

        methods: {
            login() {
                this.error=null;
                if (this.$refs.form.validate()) {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(this.form.email, this.form.password)
                        .then((data) => {
                            this.$router.replace({name: "account"});
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