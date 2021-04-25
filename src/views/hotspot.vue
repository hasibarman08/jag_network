<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="pa-3 purple darken-1">
                    <div class="d-flex justify-space-between align-center">
                        <div class="text-sm-h5 text-xs-h6 font-weight-bold white--text">Hotspots</div>
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
                <!--
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
                </v-card> -->
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
                                {{ hotspotTotal.data.total.toFixed(2)/100*20 }} HNT
                            </v-card-title>
                        </div>
                    </div>
                </v-card>
                                <v-card
                        class="my-2 border-left-4"
                >
                <v-row>
                            <v-col lg="3" md="6" cols="12" class="pa-1">
                                <v-card color="purple darken-1" dark class="text-center">
                                    <v-card-text>
                                        <div class="subtitle-2">Today</div>
                                        <div class="subtitle-1"><b class="white--text">{{today.toFixed(2)}}</b> <span
                                                class="subtitle-2">HNT</span></div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col lg="3" md="6" cols="12" class="pa-1">
                                <v-card color="purple darken-1" dark class="text-center">
                                    <v-card-text>
                                        <div class="subtitle-2">Yesterday</div>
                                        <div class="subtitle-1"><b class="white--text">{{yesterday.toFixed(2)}}</b> <span
                                                class="subtitle-2">HNT</span></div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col lg="3" md="6" cols="12" class="pa-1">
                                <v-card color="purple darken-1" dark class="text-center">
                                    <v-card-text>
                                        <div class="subtitle-2">7 days earn</div>
                                        <div class="subtitle-1"><b class="white--text">{{week.toFixed(2)}}</b> <span
                                                class="subtitle-2">HNT</span></div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col lg="3" md="6" cols="12" class="pa-1">
                                <v-card color="purple darken-1" dark class="text-center">
                                    <v-card-text>
                                        <div class="subtitle-2">30 day earn</div>
                                        <div class="subtitle-1"><b class="white--text">{{sums.toFixed(2)}}</b> <span
                                                class="subtitle-2">HNT</span></div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                                                    </v-row>
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
import { mapGetters } from "vuex";

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
                today1: "",
                message:'',
                uid:'',
                 haddress :'',
                 today:0,
                sums:0,
                yesterday:0,
                week:0,
            }
        },
            computed: {
        ...mapGetters({
      user: "user",
    }),
    },
        beforeMount() {
            var start = new Date();
            var today1 = new Date();
            var dd = today1.getDate();
            var mm = today1.getMonth() + 1;
            var m2 = today1.getMonth() - 2;
            var yyyy = today1.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            if (m2 < 10) {
                m2 = '0' + m2;
            }
            this.today1 = yyyy + '-' + mm + '-' + dd;
            this.start = yyyy + '-' + m2 + '-' + dd;
            this.getuid();
            var today = new Date();
            var yesterday = new Date();
            var week = new Date();
            var month = new Date();
            yesterday.setDate(today.getDate() - 1);
            week.setDate(today.getDate() - 7);
            month.setDate(today.getDate() - 30);
                            axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}/rewards/sum?min_time=${yesterday.toISOString().slice(0,10)}&max_time=${today.toISOString().slice(0,10)}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.yesterday = (resp.data.data.sum/1000000000000).toFixed(2)/100*20
                })
                                        axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}/rewards/sum?min_time=${week.toISOString().slice(0,10)}&max_time=${today.toISOString().slice(0,10)}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.week = (resp.data.data.sum/1000000000000 ).toFixed(2)/100*20
                })
                                                        axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}/rewards/sum?min_time=${today.toISOString().slice(0,10)}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.today = (resp.data.data.sum/1000000000000 ).toFixed(2)/100*20
                })
                                        axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}/rewards/sum?min_time=${month.toISOString().slice(0,10)}&max_time=${today.toISOString().slice(0,10)}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.sums = (resp.data.data.sum/1000000000000 ).toFixed(2)/100*20
                })
        },
        methods: {
        getuid() {
                    this.uid = this.user.data.uid
axios.get(`https://api.jag.network/user/hotspot/${this.uid}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
                            try {
                                this.haddress = resp.data[0].Haddress
        this.hotspotDet(resp.data[0].Haddress,this.start,this.today1);}     
catch(err) {
  console.log('empty profile')
}
        
  })
      },
            hotspotDet(address, start, today) {
                this.dialog = false,
                    axios.get(`https://api.helium.io/v1/hotspots/${address}`, {
                        headers: {'accept': 'application/json'}
                    }).then((resp) => {
                        this.hotspotDetails = resp.data;
                    })
                axios.get(`https://api.helium.io/v1/hotspots/${address}/rewards/sum?min_time=${start}`, {
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
