<template>
    <v-container class="my-7">
        <v-card max-width="750px" class="ma-auto">
            <v-row class="mx-0">
                <v-col sm="4" cols="12" class="purple darken-1 pa-7 d-flex align-items-center rounded-left-xs">
                    <div class="ma-auto text-center white--text">
                         <v-icon class="contact-icon purple--text darken-1" large>mdi-newspaper-variant</v-icon><br/>
                        <span class="text-h6">Please fill your contact information.</span>
                    </div>
                </v-col>
                <v-col sm="8" cols="12" class="px-7 py-3">
                    <v-form ref="form">
                        <div class="headline secondary--text font-weight-bold my-2">Contact Information</div>
                        <v-text-field v-model="contact.name"
                                      label="Name*"
                                      required
                                      :rules="rules.requiredRules"
                        >
                        </v-text-field>
                        <v-text-field v-model="contact.email"
                                      label="Email*"
                                      type="email"
                                      required
                                      :rules="rules.emailRules"
                        >
                        </v-text-field>
                        <v-text-field v-model="contact.phone"
                                      label="Phone"
                        >
                        </v-text-field>
                        <v-text-field v-model="contact.email"
                                      label="ETH address"
                        >
                        </v-text-field>
                        <v-text-field v-model="contact.email"
                                      label="BTC address"
                        >
                        </v-text-field>
                        <v-text-field v-model="contact.email"
                                      label="HNT address"
                        >
                        </v-text-field>
                        <v-btn class="purple darken-1 white--text my-3 float-right" @click="save">Save</v-btn>
                    </v-form>

                </v-col>

            </v-row>
        </v-card>
    </v-container>

</template>

<script>

    export default {
        name: 'App',
        data: () => ({
            dialog: true,
            contact: {},
            rules: {
                requiredRules: [v => !!v || 'This field is required'],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
            }
        }),

        methods: {
            save() {
                if (this.$refs.form.validate()) {
                    console.log(this.contact);
                    // this.$refs.form.reset();
                    // this.$refs.form.resetValidation()
                }
            },
        },
    };
</script>
<style>
    .contact-icon{
        background: white;
        border-radius: 50%;
        padding: 10px;
        margin: 20px;
    }
</style>