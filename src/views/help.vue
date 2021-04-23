<template>
    <v-container>
        <v-row class="mx-0">
            <v-card width="100%">
                <v-col cols="12" class="pa-7 purple darken-1 align-items-center">

                    <div class="ma-auto text-center white--text">
                        <div class="text-h3 my-4">FAQ</div>
                    </div>
                </v-col>
            </v-card>
            <v-card class="faq-card">
                <v-expansion-panels accordion>
                    <v-expansion-panel
                            v-for="(item,i) in faq"
                            :key="i"
                    >
                        <v-expansion-panel-header>{{item.question}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div v-text="item.answer"></div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </v-row>
        <v-row class="position-relative mx-0 pa-7">
            <div class="container support-content">
            <img src="../assets/bg-footer.svg" class="bg-footer">
            <div class="support-body d-flex justify-center align-center text-center flex-wrap">
                <div class="flex-1 ma-2">
                    <div class="text-lg-h5 text-h6 font-weight-bold">Please feel free to reach out to us at</div>
                    <h4>info@jagindustrials.com</h4>
                </div>
                <div class="flex-1 ma-2">
                    <v-btn color="red darken-3" class="white--text" href="https://www.jag.network/contact">Contact Support</v-btn>
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
            faq: [
                {question: 'question 1?', answer: 'answer 1'},
                {question: 'question 2?', answer: 'answer 2'},
                {question: 'question 3?', answer: 'answer 3'},
                {question: 'question 4?', answer: 'answer 4'},
                {question: 'question 5?', answer: 'answer 5'},
                {question: 'question 6?', answer: 'answer 6'},
            ]
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
        top: -43%;
        right: 1%;
        transform: rotate(71deg);
        max-width: 100%;
        height: auto;
    }

    .support-content {
        border: 2px solid #ce0504;
        margin-top: 50px;
        border-radius: 76px 6px 76px 6px;
        background-color: #f5f5f5;
        overflow: hidden !important;
        box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;
        padding-top: 1.5rem !important;
        padding-bottom: 1.5rem !important;
    }

    .flex-1 {
        flex: 1 1 0%;
    }

</style>