<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-card prepend-icon="mdi-doctor">
            <template v-slot:title>{{ data }}</template>
            <v-card-text>Doctors</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>

        </v-row>
    </v-container>
  </template>
  <script lang="ts">
  
  export default {
    data: () => ({
        doctor: {},
        data:"",
      }
    ), mounted() {
      this.fetchData();
    }
    , methods: {
      fetchData() {
      this.doctor=localStorage.getItem('doctor') as {}
      this.data = JSON.stringify(this.doctor)
      }
    }
  
  };
  </script>
  <style>
  /* Your styles go here */
  </style>
  