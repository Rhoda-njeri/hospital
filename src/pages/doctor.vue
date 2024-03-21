<template>
  <v-card
    class="mx-auto"
    max-width="500">
    <v-card-item class="bg-cyan-darken-1">
      <v-card-title>
        <span class="text-h5">{{ doctor.name }}</span>
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
      <v-list-item
        append-icon="mdi-qualification"
        prepend-icon="mdi-library" 
        title="qualification"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-experience"
        prepend-icon="mdi-calendar"
        title="experience"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-salaryamount"
        prepend-icon="mdi-cash"
        title="salaryamount"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-idnumber"
        prepend-icon="mdi-numeric"
        title="idnumber"
      ></v-list-item>

    <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-employmentdate"
        prepend-icon="mdi-calendar"
       :title="data.employmentdate"
      ></v-list-item>
    </v-list>
   

  </v-card>
</template>
<script lang="ts">

export default {
  data: () => ({
      doctor: {} as any,
    }
  ), mounted() {
    this.fetchData();
  }
  , methods: {
    fetchData() {
      this.doctor = JSON.parse(localStorage.getItem('doctor') as string)
    }
  }

};
</script>
