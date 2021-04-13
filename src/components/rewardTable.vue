<template>
  <v-container>
    <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#474DFF"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Track Hotspot
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey darken-1">
          Track Hotspot
        </v-card-title>
<v-card-text>

  <div>
          <v-text-field
            v-model="message"
            :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
            :prepend-icon="icon"
            filled
            clearable
            label="Enter Hotspot Addresse"
            type="text"
            @click:append-outer=hotspotDet(message,start,today)
          ></v-text-field>
  </div>
          </v-card-text>
      </v-card>
    </v-dialog>
  </div>

      <v-row>
        <h1> Hotspots </h1>
        </v-row>
        <v-row>
      <div
    v-ripple="{ center: true }"
    class="text-center elevation-2 pa-12 headline"
  >
<v-card-text>
    <p>Hotspot Name</p>
  <h1> {{ hotspotDetails.data.name }} </h1>
  <p> address : </p>
  <h5> {{ hotspotDetails.data.address }}  </h5>
<p> Status  {{ hotspotDetails.data.status.online }} </p>
<p> Owner: {{ hotspotDetails.data.owner }} </p>

<iframe :src=mapurl width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style="border: 1px solid black"></iframe>

<p> Total Reward for the hotspot in the last 3 Months  : </p>
<h2 class="yellow--text darken-4">{{ hotspotTotal.data.sum }} </h2> </v-card-text>
      </div>
      </v-row>
    <v-row class="text-center">
            <v-col cols="12">
        <base-material-card
          color="success"
          title="Satellite Map"
          class="px-5 py-3"
        >
          <v-card-text class="px-0 pb-0">
            <v-sheet>

            </v-sheet>
          </v-card-text>
        </base-material-card>
      </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          lg="6"
        >
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
          <p>Date in ISO format: <strong>{{ date }}</strong></p>
        </v-col>
  
        <v-col
          cols="12"
          lg="6"
        >
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Date (read only text field)"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <p>Date in ISO format: <strong>{{ date }}</strong></p>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    setup() {
        
    },
    data() {
    return {
      dialog: false,
      hotspotDetails: [],
      hotspotTotal: [],
      url: '',
      mapurl: "",
      start: "",
      today: "",
    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    }
  },
  mounted(){
    var start = new Date();
    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var m2 = today.getMonth()-2; 
var yyyy = today.getFullYear();
if(dd<10) {dd='0'+dd;} 
if(mm<10) {mm='0'+mm;} 
if(m2<10) {m2='0'+m2;} 
this.today = yyyy+'-'+mm+'-'+dd;
this.start = yyyy+'-'+m2+'-'+dd;
    //this.hotspotDet("112PR1PFQ6aqgzh1weE9MdPeA2YRkxgmrVBH6KYbneExHWMfaMVV",this.start,this.today);
  },

    computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
  },

  
   watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },

 
  methods: {
    formatDate (date){
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>