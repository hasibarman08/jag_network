<template>
      <v-card>
        <v-card-title class="headline grey darken-1">
          Track Account Rewards
        </v-card-title>
<v-card-text>

  <div>
          <v-text-field
            v-model="message"
            :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
            :prepend-icon="icon"
            filled
            clearable
            label="Enter Account Address"
            type="text"
            @click:append-outer=accountActivity(message)
          ></v-text-field>
  </div>
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
            <v-text-field
              v-model="calories"
              type="number"
              label="Less than"
            ></v-text-field>
          </td>
          <td colspan="4"></td>
        </tr>
      </template>
      
    </v-data-table>
  </div>
</v-card>
</template>

<script>
import axios from 'axios';
export default {  
    mounted(){
    this.accountActivity('14TrAqKbynntDRFvRsFzY4RqKHM8nHi7uxyVEPjfLuBT5Gzm4ND');
    }, 
  data () {
    return {
      search: '',
      calories: '',
      activity: [],
    }
  },     

  computed: {
    headers () {
      return [
        {
          text: 'hash',
          align: 'start',
          sortable: false,
          value: 'hash',
        },
        {
          text: 'type',
          value: 'type',
          filter: value => {
            if (!this.calories) return true

            return value < parseInt(this.calories)
          },
        },
        { text: 'Time', value: 'time' },
        { text: 'payer', value: 'payer' },
        { text: 'owner', value: 'owner' },
        { text: 'amout', value: 'fee' },
      ]
    },
  },
  methods: {
          accountActivity(address) {
              axios.get(`https://api.helium.io/v1/accounts/${address}/activity?cursor=eyJibG9jayI6NzY0MDAwLCJhbmNob3JfYmxvY2siOjc2NDAwMH0`, {
          headers: { 'accept': 'application/json'}}).then((resp)=>{
        this.activity = resp.data;
  })},
    filterOnlyCapsText (value, search) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
  },
}
</script>
