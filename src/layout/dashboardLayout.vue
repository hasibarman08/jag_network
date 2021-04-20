<template>
    <v-app>
        <app-header></app-header>
        <v-main>
            <router-view></router-view>
        </v-main>
        <v-row class="secondary align-items-center justify-content-center" style="max-height: 25px;z-index: 2">
            <v-col cols="12" class="text-center pa-0">
                <small class="white--text">JAG Network @ Powered by JAG Industrials 2021</small>
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
    import AppHeader from "../components/app-header";

    export default {
        components: {AppHeader}
    }
</script>