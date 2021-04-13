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
            v-model="message2"
            :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
            :prepend-icon="icon"
            filled
            clearable
            label="Enter Hotspot Address"
            type="text"
            @click:append-outer=accountActivity(message2,start,today)
          ></v-text-field>
  </div>
          </v-card-text>
      </v-card>
    </v-dialog>
  </div>
            <v-row>
        <h1> Rewards Hotspot </h1>
                <br/> <br/> <br/>
        </v-row>
      <v-card>
<v-card-text>

  <div>
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
                label="Start Date"
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
                label="End Date"
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
  </div>
  <div class="text-center">
        <v-btn
      tile
      color="#0ACF83"
      @click=accountActivity(message2,start,today)
    > 
      <v-icon left>
        mdi-content-save
      </v-icon>
      Show rewards
    </v-btn>
    </div>
 <h3> total reward in 3 months </h3><h3 style="color:#0ACF83;">  {{ hotspotTotal.data.total.toFixed(2) }}  </h3>
            </v-card-text>

  <div>
    <v-data-table
      :headers="headers"
      :items="activity.data"
      item-key="hash"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText">
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:body.append>
        <tr>
          <td></td>
          <td>
          </td>
          <td colspan="1"></td>
        </tr>
      </template>
      
    </v-data-table>
  </div>
</v-card>
    </v-container>
    
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {

  mounted(){
    var week = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    var start = new Date();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+2; 
    var m2 = today.getMonth()-2; 
    var yyyy = today.getFullYear();
    if(dd<10) {dd='0'+dd;} 
    if(mm<10) {mm='0'+mm;} 
    if(m2<10) {m2='0'+m2;} 
this.today = yyyy+'-'+mm+'-'+dd;
this.start = yyyy+'-'+m2+'-'+dd;
    this.accountActivity('112iR9AJMpB7hN4o4H6jDYkYstXaorWGKnDt6VTAvC8Fzan2skuT',this.start,this.today);
  },
    data() {
    return {
      accountTotal: [],
      hotspotTotal: [],
      rewards: [],
      search: '',
      activity: [],
      
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Hash',
          align: 'start',
          sortable: false,
          value: 'hash',
        },
          
        { text: 'Time', value: 'timestamp', dataType: "Date"  },
        { text: 'Gateway', value: 'gateway' },
        { text: 'Account', value: 'account' },
        { text: 'Amout', value: 'amount'},
      ]
    },
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

    rewardaccount(address,start,today) {
              axios.get(`https://api.helium.io/v1/accounts/${address}/rewards/sum?max_time=${today}&min_time=${start}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        this.accountTotal = resp.data;
  })
      axios.get(`https://api.helium.io/v1/accounts/${address}/rewards?max_time=${today}&min_time=${start}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        this.rewards = resp.data;
        
      })
    },
    accountActivity(address,start,today) {
      var cursor = [];
              axios.get(`https://api.helium.io/v1/hotspots/${address}/rewards?max_time=${today}&min_time=${start}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        axios.get(`https://api.helium.io/v1/hotspots/${address}/rewards?max_time=${today}&min_time=${start}&cursor=${resp.data.cursor}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
                resp.data.data.forEach((item) => item.amount = parseInt(item.amount)/100000000 );
                this.activity = resp.data;
        })
        })
        console.log(`https://api.helium.io/v1/hotspots/${address}/rewards?max_time=${today}&min_time=${start}`)
                      axios.get(`https://api.helium.io/v1/hotspots/${address}/rewards/sum?max_time=${today}&min_time=${start}`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        this.hotspotTotal = resp.data;
        })

    },
    filterOnlyCapsText (value, search) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
        formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

  }
}
</script>
