<template>
    <div>
        <v-container>
            <v-row>
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
                    <div class="mt-5">
                        <v-btn
                                rounded
                                color="primary darken-1"
                                dark
                        >
                            join today
                        </v-btn>

                    </div>
                </v-col>
                <v-col sm="6" cols="12" class="d-flex">
                    <v-img src="./../assets/chartt.png" class="ml-md-auto"></v-img>
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
                                height="500px"
                                :src="url"
                                loading="lazy"
                                sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
                        />
                    </v-container>
                    <div class="text-center my-5">
                        <v-btn x-large rounded color="white">Sign up</v-btn>
                    </div>
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