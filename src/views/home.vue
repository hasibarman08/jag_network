<template>
    <div>
        <v-container>
            <v-row class="my-7 py-7">
                <v-col sm="6" cols="12" class="d-flex justify-center flex-column">
                    <div class="primary--text text-lg-h3 text-sm-h4 text-h5 ">
                        Join JAG.<br>
                        Start Earning Today.
                    </div>
                    <div class="subtitle-1 my-7">
                        Join the JAG Network by installing a simple device in your home or office to become part of a
                        low-power wide-area network (LPWAN) that can provide your city with miles of coverage for
                        billions
                        of devices. When your hotspot is used you earn the Helium (HNT) cryptocurrency.
                    </div>
                    <div>
                        <v-btn
                                rounded
                                color="primary darken-1"
                                dark
                                large
                                href="https://www.jag.network/apply"
                        >
                            join today
                        </v-btn>
                    </div>

                </v-col>
                <v-col sm="6" cols="12" class="d-flex align-center justify-content-center">
                    <v-img src="./../assets/chartt.png" max-height="300px" contain></v-img>
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid class="primary">
            <v-row>
                <v-col cols="12">
                    <div class="white--text text-lg-h4 text-h5 text-uppercase text-center my-5">
                        How it works
                    </div>
                    <v-container>
                        <iframe
                                v-if="media.video"
                                class="video"
                                width="100%"
                                height="100%"
                                style="min-height: 350px"
                                :src="url"
                                loading="lazy"
                                sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
                        ></iframe>
                    </v-container>
                    <div class="text-center my-5">
                        <v-btn large rounded color="white" href="https://www.jag.network/apply">Sign up</v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div class="primary--text text-lg-h4 text-h5 text-uppercase text-center my-5">
                        OUR PROCESS
                    </div>
                    <v-row class="mt-7">
                        <v-col sm="6" lg="4" cols="12" class="my-2">
                            <v-card height="100%">
                                <v-icon color="purple" large class="ca-icon">mdi-calendar</v-icon>
                                <div class="primary--text text-uppercase text-h5 text-center font-weight-bold">
                                    SCHEDULE
                                </div>
                                <v-card-text>
                                    <div class="subtitle-1">
                                        Fill out our intro questionnaire and we’ll work with you to find a time to come
                                        install
                                        the hotspot at no cost to you. INSTALL
                                        Our certified techs will come to you and install the hotspot in under 30 minutes
                                        while
                                        following COVID protocols. This small device takes
                                    </div>
                                </v-card-text>
                            </v-card>

                        </v-col>
                        <v-col sm="6" lg="4" cols="12" class="my-2">
                            <v-card height="100%">
                                <v-icon color="purple" large class="ca-icon">mdi-desktop-mac-dashboard</v-icon>
                                <div class="primary--text text-uppercase text-h5 text-center font-weight-bold">
                                    INSTALL
                                </div>
                                <v-card-text>
                                    <div class="subtitle-1">
                                        Our certified techs will come to you and install the hotspot in under 30 minutes
                                        while
                                        following COVID protocols. This small device takes about the same energy as a
                                        single
                                        5W
                                        LED light bulb and uses minimal internet bandwidth.
                                    </div>
                                </v-card-text>

                            </v-card>
                        </v-col>
                        <v-col sm="6" lg="4" cols="12" class="my-2">
                            <v-card height="100%">

                                <v-icon color="purple" large class="ca-icon">mdi-currency-usd</v-icon>
                                <div class="primary--text text-uppercase text-h5 text-center font-weight-bold">
                                    EARN
                                </div>
                                <v-card-text>
                                    <div class="subtitle-1">
                                        You are now a part of the Helium People’s Network and will be rewarded when
                                        devices
                                        send
                                        data across your network. Sit back and earn!
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <div class="text-center my-5">
                        <v-btn large rounded dark color="purple darken-1">Schedule Now</v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <div class="position-relative video-container">
            <v-row>
                <v-col cols="12">
                    <div class="white--text text-lg-h4 text-h5 text-uppercase text-center my-5">
                        Building the Global IoT Wireless Network
                    </div>
                </v-col>
                <v-container>
                    <v-row class="my-5">
                        <v-col cols="12" sm="6">
                            <v-card height="100%" color="transparent" max-width="350px" class="ma-auto">
                                <v-img :src="require('../assets/logo.png')" height="100px" width="100px"
                                       class="ma-auto"></v-img>
                                <v-card-text>
                                    <div class="text-h6 text-center white--text">
                                        Learn more about Helium (HNT) and the world's fastest-growing
                                        wireless network ever
                                    </div>
                                </v-card-text>
                                <div class="text-center mt-4">
                                    <v-btn large rounded dark color="primary darken-1">Helium.com</v-btn>
                                </div>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" class="border-left-2">
                            <v-card height="100%" color="transparent" max-width="350px" class="ma-auto">
                                <v-img :src="require('../assets/logo.png')" height="100px" width="100px"
                                       class="ma-auto"></v-img>
                                <v-card-text>
                                    <div class="text-h6 text-center white--text">
                                        Visit our FAQ's section for an in-depth look at becoming a member of the JAG
                                        Network
                                    </div>
                                </v-card-text>
                                <div class="text-center mt-4">
                                    <v-btn large rounded dark color="primary darken-1" :to="{name:'help'}">FAQ's</v-btn>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-row>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" class="text-center">
                    <div class=" text-lg-h4 text-h5 text-uppercase text-center my-4">
                        Need more info?
                    </div>
                    <v-btn large rounded dark color="secondary darken-1" class="my-4"
                           href="https://www.jag.network/contact">CONTACT US
                    </v-btn>
                    <p>info@jagindustrials.com</p>
                </v-col>
            </v-row>
        </v-container>
    </div>

</template>

<script>
    import {mapGetters} from "vuex";
    import firebase from "firebase/app";

    export default {
        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user"
            })
        },
        data() {
            return {
                url: '',
                videos: [
                    {
                        // reg: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/i,
                        // reg: /^.*(?:(?:v|vi|be|videos|embed)\/(?!videoseries)|(?:v|ci)=)([\w-]{11})/i,
                        /* eslint-disable no-useless-escape */
                        reg: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/i,
                        url: 'https://www.youtube.com/embed/$5',
                        params: {
                            'picture-in-picture': 1,
                            accelerometer: 1,
                            gyroscope: 1
                        }
                    },
                    {
                        reg: /^.*vimeo.com\/(\d+)($|\/|\b)/i,
                        url: 'https://player.vimeo.com/video/$1',
                        params: {
                            title: 0,
                            byline: 0,
                            portrait: 0
                        }
                    },
                    {
                        reg: /^.*(?:\/video|dai.ly)\/([A-Za-z0-9]+)([^#\&\?]*).*/i,
                        url: 'https://www.dailymotion.com/embed/video/$1',
                        params: {
                            autoplay: 0
                        }
                    },
                    {
                        reg: /^.*coub.com\/(?:embed|view)\/([A-Za-z0-9]+)([^#\&\?]*).*/i,
                        url: 'https://coub.com/embed/$1',
                        params: {
                            autoplay: 0
                        }
                    }
                    // {
                    //     reg: /^.*twitch.tv\/videos\/(\d+)($|\/|\b)/i,
                    //     url: 'https://player.twitch.tv/?autoplay=false&video=v$1',
                    //     params: {
                    //         autoplay: false
                    //     },
                    //     callback: function () {
                    //         return 'https://player.twitch.tv/?video=v$1';
                    //     }
                    // }
                ],
                media: {
                    video: {
                        url: 'https://www.youtube.com/watch?v=QcOXgJNcZz0'
                    },
                }

            }
        },
        mounted() {
            this.parse()
        },

        methods: {
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.replace({
                            name: "home"
                        });
                    });
            },
            parse() {
                if (this.media.video) {
                    for (let i = 0; i < this.videos.length; i++) {
                        const v = this.videos[i]
                        const m = v.reg.exec(this.media.video.url)
                        if (m) {
                            this.url = this.media.video.url.replace(v.reg, v.url)
                            return
                        }
                    }
                }
            }
        }
    };
</script>
<style>
    .ca-icon {
        position: absolute;
        top: -20px;
        left: calc(50% - 30px);
        background: white;
        box-shadow: 0px -3px 7px -1px #c1c1c1;
        border-radius: 50% !important;
        padding: 10px;
    }

    .video-container {
        min-height: 500px;
        position: relative;
        background-image: url("../assets/download.jpg");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
</style>