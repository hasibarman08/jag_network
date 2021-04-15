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
          Track Address
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey darken-1">
          Track Address
        </v-card-title>
<v-card-text>
  <div>
          <v-text-field
            v-model="message"
            :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
            :prepend-icon="icon"
            color="#474DFF"
            filled
            clearable
            label="Enter Addresses"
            type="text"
            @click:append-outer=accountInfo(message)
          ></v-text-field>
  </div>
          </v-card-text>
      </v-card>
    </v-dialog>
  </div>
        <v-row>
        <h1> Account </h1> {{ address }}
                <br/> <br/> <br/>
        </v-row>
      <div
    v-ripple="{ center: true }"
    class="text-center elevation-2 pa-12 headline"
  >
<p> Account Address </p>
<h5>{{ account.data.address }} </h5>
<h3 style="color:#0ACF83;"> {{ (account.data.balance/100000000).toFixed(2) }} HNT </h3>
<p> Wallet Balance </p>
<p> Account block {{ account.data.block }} </p>
 </div>
      <div class="text-right">
    <v-btn
      tile
      color="success"
      @click=saveAccount(account.data.address)
    > 
      <v-icon left>
        mdi-content-save
      </v-icon>
      Save
    </v-btn>
      </div>
 <p> Owned hotspot: </p>  
    <div>
      <v-data-table
        :headers="headers"
        :items="hotspotaccount.data"
        item-key="name"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search (UPPER CASE ONLY)"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:body.append>
        </template>
      </v-data-table>
    </div>
<!-- <div v-ripple="{ center: true }"
    class="text-center elevation-2 pa-12 headline">
   <ul v-for="item in hotspotaccount.data" :key="item.owner">
    <v-card v-if="item.owner == account.data.address">
      <v-card-text> 
        <h3 style="color:#0ACF83;">{{ item.name }} </h3>
                <p v-if="item.status.online == 'online'" style="color:#0ACF83;" >{{ item.status.online }} </p>
                <p v-else style="color:#FF0000;">{{ item.status.online }} </p>
        <p>{{ item.address }} </p>
        <p v-if="item.reward_scale == null">reward scale: not set </p>
        <p v-else>reward scale: {{ item.reward_scale.toFixed(2) }} </p>
        </v-card-text> 
        </v-card>
  </ul>
 </div> -->
    </v-container>
</template>

<script>
import axios from 'axios';
import firebase from "firebase/app";
import { mapGetters } from "vuex";
export default {
    setup() {
        
    },
    data() {
    return {
      dialog: false,
      account: [],
      search: '',
      calories: '',
      hotspotaccount: [],
      props: ['uid'],
      address: ''
    }
  },
  computed: {
        ...mapGetters({
      user: "user",
    }),
    headers () {
      return [
        {
          text: 'Hotspot Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'status',
          value: 'status.online',
          filter: value => {
            if (!this.calories) return true

            return value < parseInt(this.calories)
          },
        },
        { text: 'location', value: 'geocode.short_state' },
        { text: 'return', value: 'reward_scale' },
      ]
    },
  },

  mounted(){
    //this.getuid();
    this.accountInfo("13e9FspopfcB9QR745AzmqTQ3fXhzBBGpaYeSQ17VciGNcCk9x2");
    axios.get(`https://api.jag.network/user/wallet/${this.user.data.uid}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
                try {
        this.accountInfo(resp.data[0].address);}
catch(err) {
  
  console.log('empty profile')
}
  })


    
  },
  methods: {
    getuid() {
      this.uid = firebase.auth().currentUser.uid
      },
    accountInfo(address) {
      this.dialog = false,
              axios.get(`https://api.helium.io/v1/accounts/${address}/activity`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        this.activity = resp.data;
  })
      axios.get(`https://api.helium.io/v1/accounts/${address}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        this.account = resp.data;
        
      })
          axios.get(`https://api.helium.io/v1/accounts/${address}/hotspots`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        this.hotspotaccount = resp.data;
        
      })
    },
    saveAccount(address) {
    let payload = { address: address };
    let res = axios.put(`https://api.jag.network/wallet/${this.user.data.uid}`, payload);
    let data = res.data;
    },

    filterOnlyCapsText (value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
  }
}
</script>
