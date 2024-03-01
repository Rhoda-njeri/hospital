<template>
    <v-data-table-virtual
      :headers="headers"
      :items="patients"
      height="400"
      item-value="name"
    ></v-data-table-virtual>
    <v-btn
            block
            color="blue"
            to="/add-patients"
            variant="tonal"
            >
            Add Patient
          </v-btn>
  </template>
  
  <script lang="ts">
  import {fireDb} from '@/utils/constants';
  import {ref, onValue} from "firebase/database";
  
  export default {
    data: () => ({
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
  