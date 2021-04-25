<template>
    <div class="light">
        <v-container>
            <v-card>
                <v-card-title class="py-7">
                    Welcome to Helium Hotspot Manager!
                </v-card-title>
            </v-card>
            <v-row class="my-4">
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
                    <div class="d-flex align-center py-4">
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
                    </v-row>
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
                                {{sums}} HNT
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
    import axios from 'axios';
    export default {
        data() {
            return {
                uid:'',
                haddress :'',
                oracleprice: '',
                sums:0,
                yesterday:0,
                week:0,
                today:0,
                series: [{
                    name: 'Reward',
                    data: [

                    ]
                }],
                series2: [{
                    name: 'Reward',
                    data:  []
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
            this.getuid(),
            this.getOracleValue(),
            this.getdata()
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
                    this.week = (resp.data.data.sum/1000000000000).toFixed(2)/100*20
                })
                                                        axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}/rewards/sum?min_time=${today.toISOString().slice(0,10)}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.today = (resp.data.data.sum/1000000000000).toFixed(2)/100*20
                })
                                        axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}/rewards/sum?min_time=${month.toISOString().slice(0,10)}&max_time=${today.toISOString().slice(0,10)}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    this.sums = (resp.data.data.sum/1000000000000).toFixed(2)/100*20
                })
        },

        methods: {
            getdata() {
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
                    axios.get(`https://api.helium.io/v1/hotspots/${this.haddress}/rewards/sum?max_time=${newdate}&min_time=${end}`, {
                    headers: {'accept': 'application/json'}
                }).then((resp) => {
                    var res = resp.data.data.sum/100000000
                    arr.push(res.toFixed(2))
                }) 
                }
                arr.reverse()
                this.chartOptions1.xaxis.categories.reverse()
                this.chartOptions2.xaxis.categories.reverse()
                        this.series = [{
          data: arr
        }]      ,                  this.series2 = [{
          data: arr
        }]
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

                        getuid() {
                this.uid = this.user.data.uid
                            axios.get(`https://api.jag.network/user/hotspot/${this.uid}`, {
                headers: {'accept': 'application/json'}
            }).then((resp) => {
                this.haddress = resp.data[0].Haddress
            })
            },
        }
    };
</script>