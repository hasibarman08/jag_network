<template>
  <v-container>
    <div class="text-right">
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
            label="Enter Hotspot Address"
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
                <br/> <br/> <br/>
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
<h2 style="color:#0ACF83;">{{ hotspotTotal.data.total.toFixed(2) }} HNT</h2> </v-card-text>
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
    </v-container>
</template>

<script>
import axios from 'axios';
import firebase from "firebase/app";
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
    //this.getuid();
                            axios.get(`https://api.jag.network/user/hotspot/${this.uid}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        this.hotspotDet(resp.data[0].address,this.start,this.today);
  })
  this.hotspotDet('112Nve5h14TW7VvrqJgafP6ubwUrE5QcbB87G3udojRwxvquM1xW',this.start,this.today);
  },
  methods: {
        getuid() {
      this.uid = firebase.auth().currentUser.uid
      },
    hotspotDet(address,start,today) {
      this.dialog = false,
              axios.get(`https://api.helium.io/v1/hotspots/${address}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        this.hotspotDetails = resp.data;
  })
      axios.get(`https://api.helium.io/v1/hotspots/${address}/rewards/sum?max_time=${today}&min_time=${start}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        this.hotspotTotal = resp.data;
         this.mapurl =['https://www.openstreetmap.org/export/embed.html?bbox='+ this.hotspotDetails.data.lng + '%2C' + this.hotspotDetails.data.lat + '%2C'+ this.hotspotDetails.data.lng + '%2C' + this.hotspotDetails.data.lat + '&layer=mapnik&marker='+ this.hotspotDetails.data.lat+'%2C'+ this.hotspotDetails.data.lng].join('');
      })
    },

  },
      saveHotspot(address) {
    let payload = { haddress: address };
    let res = axios.put(`https://api.jag.network/hotspot/${this.uid}`, payload);
    let data = res.data;
    },
}
</script>