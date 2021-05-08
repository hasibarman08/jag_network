<template>
    <v-app-bar
            app
            class="white px-md-5"
            elevation="0"
            :height="$vuetify.breakpoint.mdAndUp ? '100px' : '70px'"
    >
        <v-container>
            <div class="d-none d-md-block">
                <v-row align="center">
                    <div class="d-flex align-center">
                        <router-link to="/">
                            <v-img
                                    alt="Logo"
                                    class="shrink mr-2"
                                    contain
                                    src="@/assets/logo.png"
                                    transition="scale-transition"
                                    width="95"
                            />
                        </router-link>
                        
                    </div>
                                            <div class="mr-2 subtitle-2">HNT Conversion Price:
                            <span class="gold_4--text darken-4 ml-2" @click="HNTopen()">
                               $ {{ (oracleprice.data.price/100000000).toFixed(2) }}
                            </span>
                        </div>
                    <v-spacer></v-spacer>
                    <div v-if="user.loggedIn">

                        <!--                    <span class="mr-2">Oracle Price: </span><span class="yellow&#45;&#45;text darken-4">{{ oracleprice.data.price/100000000 }} $ </span>-->
                        <router-link :to="'/dashboard'" class="menu-item">Dashboard</router-link>
                    <!--<<router-link :to="{name:'account'}" class="menu-item">Account</router-link>-->
                        <router-link :to="'/hotspot'" class="menu-item">Hotspot</router-link>
                        <!--<router-link :to="'/rewards'" class="menu-item">Rewards</router-link>-->
                        <router-link :to="'/contact'" class="menu-item">Your Profile</router-link>
                        <router-link :to="'/commissions'" class="menu-item">Rewards</router-link>
                        <!--<router-link :to="'/help'" class="menu-item">Help</router-link>-->
                    </div>
                    <v-btn
                            color="purple darken-1"
                            dark
                            outlined
                            rounded
                             v-else
                            :to="{name:'login'}"
                    >
                        Login
                    </v-btn>
                    <v-spacer v-if="user.loggedIn"></v-spacer>
                    <div class="text-right" v-if="user.loggedIn">

                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        color="purple darken-1"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                        rounded
                                >
                                    {{ user.data.displayName }}
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item dense
                                             @click.prevent="signOut"
                                >
                                    <v-list-item-title class="subtitle-2">Sign Out</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>

                </v-row>
            </div>

            <v-row align="center" class="d-md-none my-0 justify-space-between">
                <v-menu v-if="user.loggedIn"
                        left
                        bottom
                        offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <template>
                            <v-btn
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                            >
                                <v-icon>mdi-menu</v-icon>
                            </v-btn>
                        </template>

                    </template>

                    <v-list>
                        <v-list-item :to="'/dashboard'" dense
                        >
                            <v-list-item-title class="subtitle-2">Dashboard</v-list-item-title>
                        </v-list-item>
                     <!--   <v-list-item :to="{name:'account'}" dense
                        >
                            <v-list-item-title class="subtitle-2">Account</v-list-item-title>
                        </v-list-item>-->
                        <v-list-item :to="'/hotspot'" dense
                        >
                            <v-list-item-title class="subtitle-2">Hotspot</v-list-item-title>
                        </v-list-item>
                        <v-list-item :to="'/contact'" dense
                        >
                            <!--<v-list-item-title class="subtitle-2">Rewards</v-list-item-title>
                        </v-list-item>
                        <v-list-item :to="'/contact'" dense
                        >-->
                            <v-list-item-title class="subtitle-2">Your Profile</v-list-item-title>
                        </v-list-item>
                        <v-list-item :to="'/commissions'" dense
                        >
                            <v-list-item-title class="subtitle-2">Rewards</v-list-item-title>
                        </v-list-item>

                        <!--<v-list-item :to="'/help'" dense
                        >
                            <v-list-item-title class="subtitle-2">Help</v-list-item-title>
                        </v-list-item>-->
                    </v-list>
                </v-menu>
                <div class="d-flex align-center">
                    <router-link to="/">
                        <v-img
                                alt="Logo"
                                class="shrink mr-2"
                                contain
                                src="@/assets/logo.png"
                                transition="scale-transition"
                                width="65"
                        />
                    </router-link>
                </div>
                <div v-if="user.loggedIn" class="text-right">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="purple darken-1"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    rounded
                                    small
                                    max-width="50px"
                            >
                                <v-icon>mdi-account</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title class="subtitle-2 gold_4--text darken-4 text-center">
                                    Hi, {{ user.data.displayName }}
                                    <div class="mr-2 subtitle-2 black--text">HNT Conversion Price<span
                                            class="purple--text darken-4 ml-2" href="https://coinmarketcap.com/currencies/helium/">{{ (oracleprice.data.price/100000000).toFixed(2) }} $ </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item dense
                                         @click.prevent="signOut"
                            >
                                <v-list-item-title class="subtitle-2">Sign Out</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <v-btn href="/login"
                       color="purple darken-1"
                       dark
                       outlined
                       rounded
                       small v-else>
                    <span class="mr-2">Login</span>
                </v-btn>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
    import axios from 'axios';
    import {mapGetters} from "vuex";
    import firebase from "firebase/app";

    export default {
        name: "app-header",
        data: () => {
            return {
                oracleprice: null,
            }
        },
        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user",

            })
        },
        mounted() {
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
            HNTopen(){
                window.open("https://coinmarketcap.com/currencies/helium/", "_blank")

            },
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                         this.$cookies.remove('uid');
                        this.$router.replace({
                            name: "home"
                        });
                    });
            }

        }
    }
</script>

<style scoped lang="scss">
    .menu-item {
        text-decoration: none !important;
        padding: 5px 10px;
        color: var(--v-secondary-base);
        font-size: 14px;

        &:hover {
            color: var(--v-primary-base);
        }

        &.router-link-exact-active {
            color: var(--v-gold_4-base);
        }

        &:not(:last-child) {
            border-right: 1px solid var(--v-primary-base);
        }
    }
</style>