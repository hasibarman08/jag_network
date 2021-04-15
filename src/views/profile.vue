<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="pa-3 purple darken-1">
                    <div class="d-flex justify-space-between align-center">
                        <div class="text-h5 font-weight-bold white--text">Account</div>
                        <v-dialog
                                v-model="dialog"
                                width="500"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        outlined
                                        dark
                                        small
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    Track Address
                                </v-btn>
                            </template>

                            <v-card>
                                <v-card-title class="headline purple darken-1 white--text">
                                    Track Address
                                </v-card-title>
                                <v-card-text class="pa-3">
                                    <div>
                                        <v-text-field
                                                v-model="message"
                                                :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
                                                color="#474DFF"
                                                filled
                                                clearable
                                                label="Enter Addresses"
                                                type="text"
                                                @click:append-outer=accountInfo(message)
                                        ></v-text-field>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </div>
                </v-card>
            </v-col>
            <v-col md="3" cols="12">
                <v-card
                        class="my-2 border-left-1"
                >
                    <div>
                        <div>
                            <v-card-title
                                    class="text-h6"
                            >
                                Account Address
                            </v-card-title>

                            <v-card-subtitle>
                                {{account.data.address}}
                            </v-card-subtitle>
                        </div>
                    </div>
                </v-card>
                <v-card
                        class="my-2 border-left-2"
                >
                    <div>
                        <div>
                            <v-card-title
                                    class="text-h6"
                            >
                                Account block
                            </v-card-title>

                            <v-card-subtitle>
                                {{ account.data.block }}
                            </v-card-subtitle>
                        </div>
                    </div>
                </v-card>
                <v-card
                        class="my-2 border-left-4"
                >
                    <div>
                        <div>
                            <v-card-subtitle class="pb-0">
                                Wallet Balance
                            </v-card-subtitle>
                            <v-card-title
                                    class="text-h6 gold_4--text"
                            >
                                {{ (account.data.balance/100000000).toFixed(2) }} HNT
                            </v-card-title>
                        </div>
                    </div>
                </v-card>
                <v-card
                        class="my-2"
                >
                    <div class="pa-4 text-center">
                        <v-btn
                                tile
                                dark
                                color="purple darken-1"
                                @click=saveAccount(account.data.address)
                        >
                            <v-icon left>
                                mdi-content-save
                            </v-icon>
                            Save
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
            <v-col md="9" cols="12" class="my-2">
                <v-card>
                    <v-card-title>Owned hotspot
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                        ></v-text-field>
                    </v-card-title>
                    <div class="pa-2">
                        <v-data-table
                                :headers="headers"
                                :items="hotspotaccount.data"
                                item-key="name"
                                class="elevation-1"
                                :search="search"
                                :custom-filter="filterOnlyCapsText"
                        >
                            <template v-slot:body.append>
                            </template>
                        </v-data-table>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import firebase from "firebase/app";
    import {mapGetters} from "vuex";

    export default {
        setup() {

        },
        data() {
            return {
                dialog: false,
                account: [],
                search: '',
                calories: '',
                hotspotaccount: [],
                props: ['uid'],
                address: '',
                message:''
            }
        },
        computed: {
            ...mapGetters({
                user: "user",
            }),
            headers() {
                return [
                    {
                        text: 'Hotspot Name',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {
                        text: 'status',
                        value: 'status.online',
                        filter: value => {
                            if (!this.calories) return true

                            return value < parseInt(this.calories)
                        },
                    },
                    {text: 'location', value: 'geocode.short_state'},
                    {text: 'return', value: 'reward_scale'},
                ]
            },
        },

        mounted() {
            //this.getuid();
            this.accountInfo("13e9FspopfcB9QR745AzmqTQ3fXhzBBGpaYeSQ17VciGNcCk9x2");
            axios.get(`https://api.jag.network/user/wallet/${this.user.data.uid}`, {
                headers: {'accept': 'application/json'}
            }).then((resp) => {
                try {
                    this.accountInfo(resp.data[0].address);
                } catch (err) {

                    console.log('empty profile')
                }
            })


        },
        methods: {
            getuid() {
                this.uid = firebase.auth().currentUser.uid
            },
            accountInfo(address) {
                this.dialog = false,
                    axios.get(`https://api.helium.io/v1/accounts/${address}/activity`, {
                        headers: {'accept': 'application/json'}
                    }).then((resp) => {
                        this.activity = resp.data;
                    })
                axios.get(`https://api.helium.io/v1/accounts/${address}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.account = resp.data;

                })
                axios.get(`https://api.helium.io/v1/accounts/${address}/hotspots`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.hotspotaccount = resp.data;

                })
            },
            saveAccount(address) {
                let payload = {address: address};
                let res = axios.put(`https://api.jag.network/wallet/${this.user.data.uid}`, payload);
                let data = res.data;
            },

            filterOnlyCapsText(value, search, item) {
                return value != null &&
                    search != null &&
                    typeof value === 'string' &&
                    value.toString().toLocaleUpperCase().indexOf(search) !== -1
            },
        }
    }
</script>
