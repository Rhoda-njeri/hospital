<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-card prepend-icon="mdi-account">
          <template v-slot:title>0</template>
          <v-card-text>Doctors</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card prepend-icon="mdi-account">
          <template v-slot:title>0</template>
          <v-card-text>Nurses</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
       <v-card prepend-icon="mdi-medical-bag">
          <template v-slot:title>0</template>
          <v-card-text>Medicine</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card prepend-icon="mdi-account">
          <template v-slot:title>0</template>
          <v-card-text>Patients</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card prepend-icon="mdi-account">
          <template v-slot:title>0</template>
          <v-card-text>All Users</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">

export default {

};
</script>
<style>
/* Your styles go here */
</style>
