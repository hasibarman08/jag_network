<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="pa-3 purple darken-1">
                    <div class="d-flex justify-space-between align-center">
                        <div class="text-sm-h5 text-xs-h6 font-weight-bold white--text">Rewards</div>
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
                                    Request Cashback
                                </v-btn>
                            </template>

                            <v-card>
                                <v-card-title class="headline purple darken-1 white--text">
                                    Request Cashback
                                </v-card-title>
                                <v-card-text class="pa-3">
                                    <div>
                                        <v-row >
                                        <v-text-field
                                                v-model="amount"
                                                color="#474DFF"
                                                filled
                                                
                                                clearable
                                                label="Enter amount"
                                                type="number"
                                        ></v-text-field>
                                                <v-select
                                                :items="items"
                                                label="Payment method"
                                                v-model="message"
                                                :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
                                                @click:append-outer=sendRequest(amount,message)
                                                ></v-select>
                                        </v-row>
                                    </div>
                                </v-card-text>
                                <p>MAX amount available for withdrawal {{  maxearn }} HNT</p>
                               <p> selected Payment Method {{message}} </p>
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
                                Installation Date
                            </v-card-title>

                            <v-card-subtitle>
                                               {{ hotspotDetails.data.timestamp_added.substring(0,10) }}
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
                               Earning Eligibility
                            </v-card-title>

                            <v-card-subtitle>
                                               {{ this.installation.toISOString().slice(0,10) }}
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
                                Total Reward for the hotspot after Commissions
                            </v-card-subtitle>
                            <v-card-title
                                    class="text-h6 gold_4--text"
                            >
                                {{  ((hotspotTotal.data.total/100) * 20).toFixed(2) }} HNT
                            </v-card-title>
                                                        <v-card-title
                                    class="text-h6 gold_4--text"
                            >
                            Price Now:  {{ (oracleprice.data.price/100000000).toFixed(2) }} $ /HNT
                            </v-card-title>

                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col md="8" cols="12" class="my-2">
                <v-card class="pa-2" style="height: 100%" min-height="300px">
                    <v-card-title> Transfer activity
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
                                :items="requestLog"
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
    import {mapGetters} from "vuex";

    export default {
        setup() {

        },
        data() {
            
            return {
                items: ['ETH', 'BTC', 'HNT', 'Zelle','PayPal','Venmo'],
                message:'',
                amount:0,
                dialog: false,
                hotspotDetails: [],
                hotspotTotal: [],
                url: '',
                mapurl: "",
                start: "",
                today: "",
                uid:"",
                oracleprice: null,
                installation:"",
                requestLog:{},
                maxearn:0
            }
            
        },
                computed: {
            ...mapGetters({
                user: "user",
            }),
            headers() {
                return [
                    {
                        text: 'Request Date',
                        align: 'start',
                        sortable: false,
                        value: 'entered',
                    },
                    {
                        text: 'status',
                        value: 'flag',
                        filter: value => {
                            if (!this.calories) return true

                            return value < parseInt(this.calories)
                        },
                    },
                    {text: 'payment method', value: 'payment'},
                    {text: 'amount', value: 'amount'},
                ]
            },
                    },
        beforeMount() {
            this.getuid();
            var start = new Date();
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var m2 = today.getMonth() - 2;
            var yyyy = today.getFullYear();
            var yyyy2 = today.getFullYear()-1;
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
            this.start = yyyy2 + '-' + m2 + '-' + dd;
            this.getRequest();
            this.getOracleValue();
        },

        methods: {
                        getOracleValue() {
                axios.get(`https://api.helium.io/v1/oracle/prices/current`, {
                    headers: {
                        'accept': 'application/json'
                    },
                }).then((resp) => {
                    this.oracleprice = resp.data;
                })
            },
            sendRequest(amount,message){
                console.log(this.message)
                axios.post(`https://api.jag.network/user/request/${this.uid}`,{payment:this.message,amount:this.amount})
                this.dialog = false
                this.getRequest()
            },
            getuid() {
                this.uid = this.user.data.uid
                            axios.get(`https://api.jag.network/user/hotspot/${this.uid}`, {
                headers: {'accept': 'application/json'}
            }).then((resp) => {
                this.hotspotDet(resp.data[0].Haddress, this.start, this.today);
            })
            },
            hotspotDet(address, start, today) {
                this.dialog = false,
                    axios.get(`https://api.helium.io/v1/hotspots/${address}`, {
                        headers: {'accept': 'application/json'}
                    }).then((resp) => {
                        this.hotspotDetails = resp.data;
                        var [year, month,day ]  = this.hotspotDetails.data.timestamp_added.substring(0,10).split("-")
                        this.installation =  new Date(year, month , day)
                axios.get(`https://api.helium.io/v1/hotspots/${address}/rewards/sum?min_time=${this.installation.toISOString().slice(0,10)}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.hotspotTotal = resp.data;
                    this.mapurl = ['https://www.openstreetmap.org/export/embed.html?bbox=' + this.hotspotDetails.data.lng + '%2C' + this.hotspotDetails.data.lat + '%2C' + this.hotspotDetails.data.lng + '%2C' + this.hotspotDetails.data.lat + '&layer=mapnik&marker=' + this.hotspotDetails.data.lat + '%2C' + this.hotspotDetails.data.lng].join('');
                    this.maxearn = ((this.hotspotTotal.data.total/100) * 20).toFixed(2) 
                     })
                })
            },
            getRequest() {
                    axios.get(`https://api.jag.network/user/request/${this.uid}`, {
                        headers: {'accept': 'application/json'}
                    }).then((resp) => {
                        this.requestLog = resp.data
                    })
            },
                        filterOnlyCapsText(value, search, item) {
                return value != null &&
                    search != null &&
                    typeof value === 'string' &&
                    value.toString().toLocaleUpperCase().indexOf(search) !== -1
            },

        saveHotspot(address) {
            let payload = {haddress: address};
            let res = axios.put(`https://api.jag.network/hotspot/${this.uid}`, payload);
            let data = res.data;
        }
    }
    }
</script>