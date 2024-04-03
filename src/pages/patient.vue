<template>
    <v-card
      class="mx-auto"
      max-width="500">
      <v-card-item class="bg-cyan-darken-1">
        <v-card-title>
          </v-card-title>
          <span class="text-h5"> {{ patient.first_name }} {{patient.middle_name }} {{ patient.last_name }}</span>

        <template v-slot:append>
          <v-defaults-provider
            :defaults="{
              VBtn: {
                variant: 'text',
                density: 'comfortable',
              }
            }">
          </v-defaults-provider>
        </template>
      </v-card-item>
      <v-list>
    
        <v-list-item
          append-icon="mdi-age"
          prepend-icon="mdi-calendar"
          :title="'Age: '+patient.age"
        ></v-list-item>
  
      <v-divider inset></v-divider>

      <v-list-item
          append-icon="mdi-location"
          prepend-icon="mdi-map-marker"
          :title="'Location: '+patient.location"
        ></v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
          append-icon="mdi-contact"
          prepend-icon="mdi-cellphone"
          :title="'Contact: '+patient.contact"
        ></v-list-item>
    </v-list>

        <v-divider inset></v-divider>
  
    </v-card>
    <v-data-table
      :headers="headers"
      :items="patients"
      height="400"
      item-value="name">
      <template v-slot:[`item.action`]="{ item }">
        <v-icon size="small" @click="editPatient(item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="deletePatient(item)">mdi-delete</v-icon>
        <v-icon size="small" @click="showPatient(item)">mdi-eye</v-icon>
      </template>
    </v-data-table>
  </template>

  <script lang="ts">
  
  export default {
    data: () => ({
        patient: {} as any,
        headers:    [   {title: 'Disease', align: 'start', key: 'disease'},
        {title: 'Cost', align: 'end', key: 'cost'},
        {title: 'Date of Treatment', align: 'end', key: 'date of treatment'},
      ],
      }
    ), mounted() {
      this.fetchData();
    }
    , methods: {
      fetchData() {
        this.patient = JSON.parse(localStorage.getItem('patient') as string)

      }
    }
  
  };
  </script>
  