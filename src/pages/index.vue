<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-card prepend-icon="mdi-doctor">
          <template v-slot:title>{{ doctors }}</template>
          <v-card-text>Doctors</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card prepend-icon="mdi-mother-nurse">
          <template v-slot:title>{{ nurses }}</template>
          <v-card-text>Nurses</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card prepend-icon="mdi-medical-bag">
          <template v-slot:title>{{ medicine }}</template>
          <v-card-text>Medicine</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card prepend-icon="mdi-wheelchair">
          <template v-slot:title>{{ patients }}</template>
          <v-card-text>Patients</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
 <v-col>
  <v-img src="https://images.rawpixel.com/image_350/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtMjA4YmF0Y2gxMi10ZWNoaS0wMS1hLmpwZw.jpg"></v-img>
 </v-col>
      </v-row>
  </v-container>
</template>
<script lang="ts">

import {onValue, push, ref} from "firebase/database";
import {fireDb} from "@/utils/constants";

export default {
  data: () => ({
      doctors: 0,
      nurses: 0,
      medicine: 0,
      patients: 0,

    }
  ), mounted() {
    this.fetchData();
  }
  , methods: {
    fetchData() {
      onValue(ref(fireDb, '/'), (snapshot) => {
        this.doctors = snapshot.child('doctors').size
        this.nurses = snapshot.child('nurses').size
        this.medicine = snapshot.child('medicines').size
        this.patients = snapshot.child('patients').size
      })
    }
  }

};
</script>
<style>
/* Your styles go here */
</style>
