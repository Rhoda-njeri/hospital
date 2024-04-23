<template>
    <v-card
    class="mx-auto"
    max-width="500">
    <v-card-item class="bg-cyan-darken-1">
      <v-card-title>
        <span class="text-h5">{{ patient.name }}</span>
      </v-card-title>
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

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-first-name"
        prepend-icon="mdi-name"
        :title="'First Name: '+patient.first-name"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-middle-name"
        prepend-icon="mdi-name"
        :title="'Middle Name: '+patient.middle-name"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-last-name"
        prepend-icon="mdi-name"
        :title="'Last Name: '+patient.last-name"
      ></v-list-item>

      
      <v-list-item
        append-icon="mdi-age"
        prepend-icon="mdi-calendar"
        :title="'Age: '+patient.Age"
      ></v-list-item>
    

      <v-list-item
        append-icon="mdi-location"
        prepend-icon="mdi-loocation"
        :title="'Location: '+patient.location"
      ></v-list-item>
    

        <v-list-item
        append-icon="mdi-contact"
        prepend-icon="mdi-phone number"
        :title="'Contact: '+patient.contact"
      ></v-list-item>
    </v-list>

      


      </v-card>
</template>
<script lang="ts">

export default {
data: () => ({
    medicine: {} as any,
  }
), mounted() {
  this.fetchData();
}
, methods: {
  fetchData() {
    this.medicine = JSON.parse(localStorage.getItem('medicine') as string)
  }
}

};
</script>