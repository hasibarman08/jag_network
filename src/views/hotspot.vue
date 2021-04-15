<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="pa-3 purple darken-1">
                    <div class="d-flex justify-space-between align-center">
                        <div class="text-h5 font-weight-bold white--text">Hotspots</div>
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
                                    Track Hotspot
                                </v-btn>
                            </template>

                            <v-card>
                                <v-card-title class="headline purple darken-1 white--text">
                                    Track Hotspot
                                </v-card-title>
                                <v-card-text class="pa-3">

                                    <div>
                                        <v-text-field
                                                v-model="message"
                                                :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
                                                :prepend-icon="icon"
                                                filled
                                                clearable
                                                label="Enter Hotspot Address"
                                                type="text"
                                                @click:append-outer=hotspotDet(message,start,today)
                                        ></v-text-field>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </div>
                </v-card>
            </v-col>
            <v-col md="4" cols="12">
                <v-card
                        class="my-2 border-left-1"
                >
                    <div>
                        <div>
                            <v-card-title
                                    class="text-h6"
                            >
                                Hotspot Name
                            </v-card-title>

                            <v-card-subtitle>
                                {{ hotspotDetails.data.name }}
                                <span class="mx-3 gold_4--text">({{hotspotDetails.data.status.online}})</span>
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
                                Address
                            </v-card-title>

                            <v-card-subtitle>
                                {{ hotspotDetails.data.address }}
                            </v-card-subtitle>
                        </div>
                    </div>
                </v-card>
                <v-card
                        class="my-2 border-left-3"
                >
                    <div>
                        <div>
                            <v-card-title
                                    class="text-h6"
                            >
                                Owner
                            </v-card-title>

                            <v-card-subtitle>
                                {{ hotspotDetails.data.owner }}
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
                                Total Reward for the hotspot in the last 3 Months
                            </v-card-subtitle>
                            <v-card-title
                                    class="text-h6 gold_4--text"
                            >
                                {{ hotspotTotal.data.total.toFixed(2) }} HNT
                            </v-card-title>
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col md="8" cols="12" class="my-2">
                <v-card class="pa-2" style="height: 100%" min-height="300px">
                    <iframe :src=mapurl width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0"
                            marginwidth="0" style="border: 1px solid black"></iframe>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import firebase from "firebase/app";

    export default {
        setup() {

        },
        data() {
            return {
                dialog: false,
                hotspotDetails: [],
                hotspotTotal: [],
                url: '',
                mapurl: "",
                start: "",
                today: "",
            }
        },
        mounted() {
            var start = new Date();
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var m2 = today.getMonth() - 2;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            if (m2 < 10) {
                m2 = '0' + m2;
            }
            this.today = yyyy + '-' + mm + '-' + dd;
            this.start = yyyy + '-' + m2 + '-' + dd;
            //this.getuid();
            axios.get(`https://api.jag.network/user/hotspot/${this.uid}`, {
                headers: {'accept': 'application/json'}
            }).then((resp) => {
                this.hotspotDet(resp.data[0].address, this.start, this.today);
            })
            this.hotspotDet('112Nve5h14TW7VvrqJgafP6ubwUrE5QcbB87G3udojRwxvquM1xW', this.start, this.today);
        },
        methods: {
            getuid() {
                this.uid = firebase.auth().currentUser.uid
            },
            hotspotDet(address, start, today) {
                this.dialog = false,
                    axios.get(`https://api.helium.io/v1/hotspots/${address}`, {
                        headers: {'accept': 'application/json'}
                    }).then((resp) => {
                        this.hotspotDetails = resp.data;
                    })
                axios.get(`https://api.helium.io/v1/hotspots/${address}/rewards/sum?max_time=${today}&min_time=${start}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.hotspotTotal = resp.data;
                    this.mapurl = ['https://www.openstreetmap.org/export/embed.html?bbox=' + this.hotspotDetails.data.lng + '%2C' + this.hotspotDetails.data.lat + '%2C' + this.hotspotDetails.data.lng + '%2C' + this.hotspotDetails.data.lat + '&layer=mapnik&marker=' + this.hotspotDetails.data.lat + '%2C' + this.hotspotDetails.data.lng].join('');
                })
            },

        },
        saveHotspot(address) {
            let payload = {haddress: address};
            let res = axios.put(`https://api.jag.network/hotspot/${this.uid}`, payload);
            let data = res.data;
        },
    }
</script>
<style>
    .border-left-1 {
        border-left: 3px solid red !important;
    }

    .border-left-2 {
        border-left: 3px solid blue !important;
    }

    .border-left-3 {
        border-left: 3px solid green !important;
    }

    .border-left-4 {
        border-left: 3px solid orange !important;
    }
</style>