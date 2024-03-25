<template>
      <v-card
      class="mx-auto"
      max-width="500">
      <v-card-item class="bg-cyan-darken-1">
        <v-card-title>
          <span class="text-h5">{{ medicine.name }}</span>
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
          append-icon="mdi-expiryDate"
          prepend-icon="mdi-calendar"
          :title="'ExpiryDate: '+medicine.expiry"
        ></v-list-item>
  
        <v-divider inset></v-divider>
  
        <v-list-item
          append-icon="mdi-disease"
          prepend-icon="mdi-medical-bag"
          :title="'Medicine for: '+medicine.disease"
        ></v-list-item>
  
        <v-divider inset></v-divider>
  
        <v-list-item
          append-icon="mdi-cost"
          prepend-icon="mdi-cash"
          :title="'Cost: '+medicine.cost"
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
