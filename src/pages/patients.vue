<template>
    <v-data-table-virtual
      :headers="headers"
      :items="patients"
      height="400"
      item-value="name"
    ></v-data-table-virtual>
    <v-dialog
      v-model="dialog"
      max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Add-Patients"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Patient Details">
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6">
              <v-text-field
                label="First name*"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Middle name"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Last name*"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Contact*"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Location*"
                type="location"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6">

              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                variant="outlined"
                required
              ></v-select>
            </v-col>


            <small class="text-caption text-decoration-none text-red">{{message}}</small>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import {fireDb} from '@/utils/constants';
  import {ref, onValue} from "firebase/database";
  
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {title: 'Names', align: 'start', key: 'name'},
        {title: 'Age', align: 'end', key: 'age'},
        {title: 'Location', align: 'end', key: 'location'},
        {title: 'Contact', align: 'end', key: 'contact'},
        
      ],
      patients: [] as any,
    }),
  
    mounted() {
  
      this.fetchPatients();
    }
    , methods: {
      fetchPatients() {
        onValue(ref(fireDb, '/patients'), (snapshot) => {
          snapshot.forEach((patient) => {
            console.log(patient.val().contact)
            this.patients.push({
              name: patient.val().name,
              age:patient.val().age,
              location: patient.val().location,
              contact: patient.val().contact,
            } as any)
          })
        })
      }
    }
  }
  </script>
  