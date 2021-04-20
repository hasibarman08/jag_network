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
                                        <div class="subtitle-1"><b class="white--text">257.74</b> <span
                                                class="subtitle-2">HNT</span></div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col lg="3" md="6" cols="12" class="pa-1">
                                <v-card color="purple darken-1" dark class="text-center">
                                    <v-card-text>
                                        <div class="subtitle-2">Yesterday</div>
                                        <div class="subtitle-1"><b class="white--text">157.74</b> <span
                                                class="subtitle-2">HNT</span></div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col lg="3" md="6" cols="12" class="pa-1">
                                <v-card color="purple darken-1" dark class="text-center">
                                    <v-card-text>
                                        <div class="subtitle-2">7 days Average</div>
                                        <div class="subtitle-1"><b class="white--text">357.74</b> <span
                                                class="subtitle-2">HNT</span></div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col lg="3" md="6" cols="12" class="pa-1">
                                <v-card color="purple darken-1" dark class="text-center">
                                    <v-card-text>
                                        <div class="subtitle-2">30 day average</div>
                                        <div class="subtitle-1"><b class="white--text">257.74</b> <span
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
                                        <v-icon>mdi-currency-usd</v-icon> 12.78
                                    </div>
                                    <div class="success--text d-flex align-center justify-center">
                                        <v-icon color="success">mdi-arrow-up-bold</v-icon>
                                        <div>4.24%</div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col lg="3" md="6" cols="12" class="pa-1">
                            <v-card class="text-center">
                                <v-card-text>
                                    <div class="text-uppercase">Coingeko</div>
                                    <div class="text-h6">
                                        <v-icon>mdi-currency-usd</v-icon> 12.78
                                    </div>
                                    <div class="success--text d-flex align-center justify-center">
                                        <v-icon color="success">mdi-arrow-up-bold</v-icon>
                                        <div>4.24%</div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col lg="3" md="6" cols="12" class="pa-1">
                            <v-card class="text-center">
                                <v-card-text>
                                    <div class="text-uppercase">binance us</div>
                                    <div class="text-h6">
                                        <v-icon>mdi-currency-usd</v-icon> 12.78
                                    </div>
                                    <div class="success--text d-flex align-center justify-center">
                                        <v-icon color="success">mdi-arrow-up-bold</v-icon>
                                        <div>4.24%</div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col lg="3" md="6" cols="12" class="pa-1">
                            <v-card class="text-center">
                                <v-card-text>
                                    <div >mBTC</div>
                                    <div class="text-h6">
                                        <v-icon>mdi-currency-usd</v-icon> 12.78
                                    </div>
                                    <div class="error--text d-flex align-center justify-center">
                                        <v-icon color="error">mdi-arrow-down-bold</v-icon>
                                        <div>-4.24%</div>
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
                                378.12 HNT
                            </div>
                            <div><small>$42343.343/BTC 0.0343434324</small></div>
                        </div>
                        <div class="text-right mb-3"><small>432432jh234234kjh42k34hkj3h4kj2h34jkj234jk234</small></div>
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

    export default {
        data() {
            return {

                series: [{
                    name: 'Reward',
                    data: [
                        100,
                        105,
                        203,
                        98,
                        45,
                        345,
                        77,
                        99,
                        33,
                        40,
                        100,
                        105,
                        203,
                        98,
                        45,
                        345,
                        77,
                        99,
                        33,
                        40,
                        100,
                        105,
                        203,
                        98,
                        45,
                        345,
                        77,
                        99,
                        33,
                        40,
                        34
                    ]
                }],
                series2: [{
                    name: 'Reward',
                    data: [
                        5000,
                        500,
                        700,
                        900,
                        980,
                        1100,
                        1300,
                        1500,
                        1700,
                        1800,
                        2000,
                        2100,
                        2400,
                        2700,
                        3000,
                        3400,
                        4000,
                        4100,
                        4200,
                        4300,
                        4400,
                        4500,
                        4600,
                        4700,
                        4900,
                        5100,
                        5300,
                        5400,
                        6000,
                        400,
                        600
                    ]
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
                            '2021/1/1',
                            '2021/1/2',
                            '2021/1/3',
                            '2021/1/4',
                            '2021/1/5',
                            '2021/1/6',
                            '2021/1/7',
                            '2021/1/8',
                            '2021/1/9',
                            '2021/1/10',
                            '2021/1/11',
                            '2021/1/12',
                            '2021/1/13',
                            '2021/1/14',
                            '2021/1/15',
                            '2021/1/16',
                            '2021/1/17',
                            '2021/1/18',
                            '2021/1/19',
                            '2021/1/20',
                            '2021/1/21',
                            '2021/1/22',
                            '2021/1/23',
                            '2021/1/24',
                            '2021/1/25',
                            '2021/1/26',
                            '2021/1/27',
                            '2021/1/28',
                            '2021/1/29',
                            '2021/1/30',
                            '2021/1/31',
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
                        categories: [
                            '2021/1/1',
                            '2021/1/2',
                            '2021/1/3',
                            '2021/1/4',
                            '2021/1/5',
                            '2021/1/6',
                            '2021/1/7',
                            '2021/1/8',
                            '2021/1/9',
                            '2021/1/10',
                            '2021/1/11',
                            '2021/1/12',
                            '2021/1/13',
                            '2021/1/14',
                            '2021/1/15',
                            '2021/1/16',
                            '2021/1/17',
                            '2021/1/18',
                            '2021/1/19',
                            '2021/1/20',
                            '2021/1/21',
                            '2021/1/22',
                            '2021/1/23',
                            '2021/1/24',
                            '2021/1/25',
                            '2021/1/26',
                            '2021/1/27',
                            '2021/1/28',
                            '2021/1/29',
                            '2021/1/30',
                            '2021/1/31',
                        ],
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
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user"
            })
        }
    };
</script>