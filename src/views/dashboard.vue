<template>
    <div class="light">
        <v-container>
                                            <v-col v-if="loading===false" cols="12"> <v-alert  type="error">
       DASHBOARD IS LOADING
    </v-alert></v-col>
                        <v-col cols="12">
                <v-card class="pa-3 purple darken-1">
                    <div class="d-flex justify-space-between align-center">
                        <div class="text-sm-h5 text-xs-h6 font-weight-bold white--text">Welcome to Helium Hotspot Manager!</div>
<!--                        <v-dialog
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
                        </v-dialog>-->
                        <div class="text-sm-h5 text-xs-h6 font-weight-bold white--text">
        <v-select
        dark
          :items="hots"
          label="Leased Hotspot"
          dense
          v-model="hname"
          @input=getHotspot(hname)
        ></v-select>

        </div>
                    </div>
                </v-card>
            </v-col>
                                                        <v-col v-if="loading===false" cols="12"> <v-alert  type="warning">
       You will start earning rewards on {{hname}} (30 days after install) 
    </v-alert></v-col>
                       <!-- <v-row >
             <v-col md="6" cols="12">
               <h1></h1>
 </v-col>v-else
            </v-row>-->
            <v-row  class="my-4">
                <v-col md="6" cols="12">
                    <div class="d-flex align-center">
                        <v-icon class="mr-1">mdi-chart-box</v-icon>
                        30 Day Reward
                    </div>
                    <v-card class="my-2 pa-4">
                        <apexchart type="bar" height="350" :options="chartOptions1" :series="series"></apexchart>
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
<!--                  <div class="d-flex align-center py-4">
                        <v-icon class="mr-1">mdi-chart-bell-curve-cumulative</v-icon>
                        HNT Price
                    </div>
                    <v-row class="mx-0">
                        <v-col lg="3" md="6" cols="12" class="pa-1">
                            <v-card class="text-center">
                                <v-card-text>
                                    <div class="text-uppercase">Oracle</div>
                                    <div class="text-h6">
                                        <v-icon>mdi-currency-usd</v-icon> {{(oracleprice.data.price/100000000 ).toFixed(2)}}
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>-->
                </v-col>
                <v-col md="6" cols="12">
                    <div class="d-flex align-center">
                        <v-icon class="mr-1">mdi-currency-usd-circle-outline</v-icon>
                        Wallet Rewards
                    </div>
                    <v-card class="my-2 pa-4">
                        <div class="d-flex justify-space-between">
                            <div class="text-h5">
                                <v-icon class="mr-1" large>mdi-currency-usd-circle-outline</v-icon>
                                {{sums.toFixed(2)}} HNT
                            </div>

                        </div>
                        <div class="text-right mb-3"><small>{{haddress}}</small></div>
                        <apexchart type="area" height="350" :options="chartOptions2" :series="series2"></apexchart>
                    </v-card>
                </v-col>
                <v-col md="6" cols="12">
                </v-col>
            </v-row>
        </v-container>
    </div>

</template>

<script>
    import {mapGetters} from "vuex";
    import VueCookies from 'vue-cookies';
    import axios from 'axios';


    export default {
        data() {
            return {
                uid:this.$cookies.get('uid'),
                haddress :'',
                oracleprice: '',
                sums:0,
                yesterday:0,
                loading:false,
                week:0,
                arr:{},
                hname:'',
                today:0,
                commission:20,
                hots:[],
                series: [{
                    name: 'Reward',
                    data: this.$cookies.get('series')
                }],
                series2: [{
                    name: 'Reward',
                    data:  this.$cookies.get('series2')
                }],
                chartOptions1: {
                    chart: {
                        height: 450,
                        type: 'bar',
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: 1
                    },

                    grid: {
                        row: {
                            colors: ['#fff', '#f2f2f2']
                        },
                    },
                    xaxis: {
                        labels: {
                            rotate: -75
                        },
                        categories: [
                        ],
                        tickPlacement: 'on',
                        tickAmount: 15
                    },
                    yaxis: {
                        title: {
                            text: 'Reward',
                        },
                        tickAmount: 10
                    },
                    colors: ['#8e24aa'],
                    fill: {
                        type: 'gradient',
                        gradient: {
                            type: 'vertical',
                            opacityFrom: 0.7,
                            opacityTo: 0.5,
                        }
                    }
                },
                chartOptions2: {
                    chart: {
                        height: 450,
                        type: 'area',
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: 2
                    },
                    markers: {
                        size: 3,
                        hover: {
                            size: 5
                        }
                    },

                    grid: {
                        row: {
                            colors: ['#fff', '#f2f2f2']
                        },
                        xaxis: {
                            lines: {
                                show: true
                            }
                        },
                        yaxis: {
                            lines: {
                                show: true
                            }
                        },
                    },
                    xaxis: {
                        labels: {
                            rotate: -75
                        },
                        categories:  [ ],

                        
                        tickPlacement: 'on',
                    },
                    yaxis: {
                        title: {
                            text: 'Reward',
                        },
                        tickAmount: 10
                    },
                    colors: ['#8e24aa'],
                    fill: {
                        type: 'gradient',
                        gradient: {
                            opacityFrom: 0.6,
                            opacityTo: 0.8,
                        }
                    }
                },

            }
        },
        computed: {
            
            ...mapGetters({
                user: "user"
            })
            
        },
        beforeMount() {
            this.loading=false,
            this.getuid(),
            this.getOracleValue(),
            this.getdata(this.haddress),
            this.getHotspotName(),
            this.arraymanipulation(this.arr),
            this.dataCard(this.haddress)
        },

        methods: {
            getdata(haddress) {
                this.loading=false
                var i
                var arr = []
                var sum=0
                for (i = 1; i < 30; i++) {
                    var date = new Date();
                    date.setDate(date.getDate() - i);
                    var ends = new Date();
                    var a = i+1
                    ends.setDate(ends.getDate() - a);
                    var newdate=date.toISOString().slice(0,10)
                    var end =ends.toISOString().slice(0,10)   
                    this.chartOptions2.xaxis.categories.push(newdate.replaceAll("-", "/") );
                    this.chartOptions1.xaxis.categories.push(newdate.replaceAll("-", "/") );
                    axios.get(`https://api.helium.io/v1/hotspots/${haddress}/rewards/sum?max_time=${newdate}&min_time=${end}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    var res = resp.data.data.sum
                    arr.push((res/1000000000000/100*this.commission).toFixed(2))
                }) 
                }
                this.arr = arr
            },
                    getHotspotName(){
                            var i;
                                axios.get(`https://api.jag.network/user/hotspot/${this.uid}`, {
                        headers: {'accept': 'application/json'}
                    }).then((resp) => {
                        this.hotspotAll = resp.data;
                    for (i = 0; i < this.hotspotAll.length; i++) {
                                axios.get(`https://api.helium.io/v1/hotspots/${this.hotspotAll[i].Haddress}`, {
                        headers: {'accept': 'application/json'}
                    }).then((resp) => {
                        this.hots.push(resp.data.data.name)
                    })
                    }})

        },
            arraymanipulation(arr) {
                arr.reverse()
                this.chartOptions1.xaxis.categories.reverse()
                this.chartOptions2.xaxis.categories.reverse()
                        this.series = [{
          data: arr
        }]      ,                  this.series2 = [{
          data: arr
        }]
        this.loading=true
                this.$cookies.set('series', this.series)
                        this.$cookies.set('series2', this.series2)
                        this.$router.push({path: "/dashboard"});
            },
            dataCard(haddress){
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
                    this.yesterday = (resp.data.data.sum/1000000000000).toFixed(2)/100*this.commission
                })
                                        axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}/rewards/sum?min_time=${week.toISOString().slice(0,10)}&max_time=${today.toISOString().slice(0,10)}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.week = (resp.data.data.sum/1000000000000).toFixed(2)/100*this.commission
                })
                                                        axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}/rewards/sum?min_time=${today.toISOString().slice(0,10)}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.today = (resp.data.data.sum/1000000000000).toFixed(2)/100*this.commission
                })
                                        axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}/rewards/sum?min_time=${month.toISOString().slice(0,10)}&max_time=${today.toISOString().slice(0,10)}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.sums = (resp.data.data.sum/1000000000000).toFixed(2)/100*this.commission
                })
            },
                                    getOracleValue() {
                axios.get(`https://api.helium.io/v1/oracle/prices/current`, {
                    headers: {
                        'accept': 'application/json'
                    },
                }).then((resp) => {
                    this.oracleprice = resp.data;
                })
            },
                        getHotspot(hname){ 
                axios.get(`https://api.helium.io/v1/hotspots/name/${hname}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
                                this.haddress = resp.data.data[0].address
        this.dataCard(this.haddress)
        this.getdata(this.haddress)
        this.arraymanipulation(this.arr)      }
          )},
                    

                        getuid() {
                            this.$cookies.set('uid', this.user.data.uid)
                //this.uid = this.user.data.uid
                            axios.get(`https://api.jag.network/user/hotspot/${this.uid}`, {
                headers: {'accept': 'application/json'}
            }).then((resp) => {
                this.haddress = resp.data[0].Haddress
                                                axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}`, {
                        headers: {'accept': 'application/json'}
                    }).then((resp) => {
                        this.hname = resp.data.data.name
                    })
                
                
            })
            },
        }
    };
</script>