<template>
  <v-container>
                <v-row >
        <h1> Enter your Contact Information </h1>
        <br/> <br/> <br/>
        </v-row>
          <v-card>
    <v-row align="center"
      justify="center">
      <v-col>
        <v-textarea
          label="Name"
          auto-grow
          outlined
          rows="1"
          row-height="15"
        ></v-textarea>                <v-textarea
          label="email"
          auto-grow
          outlined
          rows="1"
          row-height="15"
        ></v-textarea>
      </v-col>

    </v-row>
        <v-row>
        <v-textarea
          label="ETH address"
          auto-grow
          outlined
          rows="1"
          row-height="15"
        ></v-textarea>
                <v-textarea
          label="BTC address"
          auto-grow
          outlined
          rows="1"
          row-height="15"
        ></v-textarea>
                <v-textarea
          label="HNT address"
          auto-grow
          outlined
          rows="1"
          row-height="15"
        ></v-textarea>
    </v-row>
    <v-btn

      color="success"
      class="mr-4"
      @click="validate"
    >
      Save
    </v-btn></v-card>
  </v-container>

</template>

<script>

export default {
  name: 'App',
  data: () => ({
    dialog: true,
  }),

methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
};
</script>