<template>
    <v-container>
        <v-card>
            <v-toolbar
                    flat
                    color="purple darken-1"
                    dark
            >
                <div class="text-h4">FAQ</div>
            </v-toolbar>
            <v-tabs vertical active-class="purple--text" slider-color="purple darken-1">
                <v-tab v-for="(item,idx) in categories" :key="idx" >
                    {{item.name}}
                </v-tab>

                <v-tab-item v-for="(item,idx) in categories"  :key="idx">
                    <v-card flat min-height="300px" color="purple darken-1" tile>
                        <v-card-text class="pa-1">
                                <v-expansion-panels accordion>
                                    <v-expansion-panel
                                            v-for="(item,i) in item.faq"
                                            :key="i"
                                    >
                                        <v-expansion-panel-header class="subtitle-1 font-weight-bold">
                                            {{item.question}}
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="subtitle-2">
                                            <div v-text="item.answer"></div>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
        <v-row class="mx-0 pa-7">
            <div class="container support-content">
                <img src="../assets/bg-footer.svg" class="bg-footer" alt="">
                <div class="support-body d-flex justify-center align-center text-center flex-wrap">
                    <div class="flex-1 ma-2">
                        <div class="text-lg-h5 text-h6 font-weight-bold">Please feel free to reach out to us at</div>
                        <h4>info@jagindustrials.com</h4>
                    </div>
                    <div class="flex-1 ma-2">
                        <v-btn color="purple darken-1" class="white--text" href="https://www.jag.network/contact">
                            Contact
                            Support
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-row>

    </v-container>

</template>

<script>
    import firebase from "firebase";

    export default {
        name: 'App',
        data: () => ({
            currentTab: null,
            categories: [
                {
                    name: 'category 1',
                    faq: [
                        {
                            question: 'lorem ipsum dolor lodl fdsfd sdfdsf sdfsdf?',
                            answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores cumque cupiditate deserunt\n' +
                                '        distinctio earum harum molestias necessitatibus nihil obcaecati omnis ratione rerum saepe sapiente similique,\n' +
                                '        sit soluta veniam, voluptatibus.'
                        },
                        {question: 'question 2?', answer: 'answer 2'},
                        {question: 'question 3?', answer: 'answer 3'},
                        {question: 'question 4?', answer: 'answer 4'},
                        {question: 'question 5?', answer: 'answer 5'},
                        {question: 'question 6?', answer: 'answer 6'},
                    ]
                },
                {
                    name: 'category 2',
                    faq: [
                        {
                            question: 'lorem ipsum dolor lodl fdsfd sdfdsf sdfsdf?',
                            answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores cumque cupiditate deserunt\n' +
                                '        distinctio earum harum molestias necessitatibus nihil obcaecati omnis ratione rerum saepe sapiente similique,\n' +
                                '        sit soluta veniam, voluptatibus.'
                        },
                        {question: 'question 2?', answer: 'answer 2'},
                        {question: 'question 3?', answer: 'answer 3'},

                    ]
                },
                {
                    name: 'category 3',
                    faq: [
                        {
                            question: 'lorem ipsum dolor lodl fdsfd sdfdsf sdfsdf?',
                            answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores cumque cupiditate deserunt\n' +
                                '        distinctio earum harum molestias necessitatibus nihil obcaecati omnis ratione rerum saepe sapiente similique,\n' +
                                '        sit soluta veniam, voluptatibus.'
                        },

                    ]
                }
            ],

        }),

    };
</script>
<style>
    .faq-card {
        margin: auto;
        margin-top: -30px;
    }

    .bg-footer {
        position: absolute;
        width: 17%;
        top: -26%;
        right: 0;
        transform: rotate(51deg);
        max-width: 100%;
        height: auto;
    }

    .support-content {
        border: 2px solid #8e24aa;
        margin-top: 50px;
        border-radius: 76px 6px 76px 6px;
        background-color: #f5f5f5;
        overflow: hidden !important;
        box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;
        padding-top: 1.5rem !important;
        padding-bottom: 1.5rem !important;
        position: relative;
    }

    .flex-1 {
        flex: 1 1 0%;
    }

</style>