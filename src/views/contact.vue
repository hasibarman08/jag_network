<template>
    <v-container class="my-7">
        <v-card class="ma-auto">
            <v-row class="mx-0">
                <v-col sm="4" cols="12" class="purple darken-1 pa-7 d-flex align-items-center rounded-left-xs">
                    <div class="ma-auto text-center white--text">
                        <v-icon class="contact-icon purple--text darken-1" large>mdi-newspaper-variant</v-icon>
                        <br/>
                        <span class="text-h6">Please fill your contact information.</span>
                    </div>
                </v-col>
                <v-col sm="8" cols="12" class="px-7 py-3">
                    <v-form ref="form">
                        <div class="headline secondary--text font-weight-bold my-2">Contact Information</div>
                        <v-row>
                            <v-col sm="6" cols="12">
                                <v-text-field v-model="contact.name"
                                              label="Name*"
                                              required
                                              disabled
                                              :rules="rules.requiredRules"
                                              hide-details
                                >
                                </v-text-field>
                            </v-col>
                            <v-col sm="6" cols="12">
                                <v-text-field v-model="contact.email"
                                              label="Email*"
                                              type="email"
                                              disabled
                                              required
                                              :rules="rules.emailRules"
                                              hide-details
                                >
                                </v-text-field>
                            </v-col>
                            <v-col sm="6" cols="12">
                                <v-text-field v-model="contact.phone"
                                              label="Phone"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col sm="6" cols="12">
                                <v-text-field v-model="contact.paypal_address"
                                              label="PayPal email"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>


                        <v-text-field v-model="contact.eth_address"
                                      label="ETH address"
                        >
                        </v-text-field>
                        <v-text-field v-model="contact.btc_address"
                                      label="BTC address"
                        >
                        </v-text-field>

                        <v-text-field v-model="contact.zelle_address"
                                      label="Zelle"
                        >
                        </v-text-field>
                        <v-textarea v-model="contact.hnt_address"
                                    label="HNT address"
                                    auto-grow
                                    rows="1"
                                    row-height="15"
                        >
                        </v-textarea>
                        {{info.Antenna}}
                        <v-btn class="purple darken-1 white--text my-3 float-right" @click="save">Save</v-btn>

                    </v-form>

                </v-col>

            </v-row>
        </v-card>
    </v-container>

</template>

<script>
    import axios from 'axios';
    import {mapGetters} from "vuex";

    export default {
        name: 'App',
        data: () => ({
            info: {},
            contact: {},
            rules: {
                requiredRules: [v => !!v || 'This field is required'],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
            }
        }),
        computed: {
            ...mapGetters({
                user: "user",
            }),
        },

        beforeMount() {
            this.getuid();
            this.contact.name = this.user.data.displayName,
                this.contact.email = this.user.data.email

        },
        methods: {
            getuid() {
                this.uid = this.user.data.uid
                axios.get(`https://api.jag.network/user/payment/${this.uid}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    try {
                        console.log(resp.data[0]),
                            this.info = resp.data[0],
                            this.populateField(resp.data[0])
                    } catch (err) {
                        console.log('empty profile')
                    }
                })

            },
            populateField(arr) {
                console.log(arr.paypal);
                this.contact.paypal_address = arr.paypal
                try {
                    this.contact.paypal_address = arr.paypal
                } catch (err) {
                    console.log('empty value')
                }
                try {
                    this.contact.zelle_address = arr.zelle
                } catch (err) {
                    console.log('empty value')
                }
                try {
                    this.contact.btc_address = arr.BTC
                } catch (err) {
                    console.log('empty value')
                }
                try {
                    this.contact.eth_address = arr.ETH
                } catch (err) {
                    console.log('empty value')
                }
                try {
                    this.contact.hnt_address = arr.HNT
                } catch (err) {
                    console.log('empty value')
                }
                try {
                    this.contact.phone = arr.Mobile
                } catch (err) {
                    console.log('empty value')
                }
            },
            save() {
                if (this.$refs.form.validate()) {
                    console.log(this.contact);
                    let payload = {
                        hnt: this.contact.hnt_address,
                        paypal: this.contact.paypal_address,
                        zelle: this.contact.zelle_address,
                        mobile: this.contact.phone,
                        btc: this.contact.btc_address,
                        eth: this.contact.eth_address
                    };
                    axios.put(`https://api.jag.network/payment/${this.uid}`, payload), {headers: {'Content-Type': 'application/json'}};

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