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
        :title="'Qualification: '+doctor.qualification"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-experience"
        prepend-icon="mdi-calendar"
        :title="'Experience: '+doctor.experience"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-salaryamount"
        prepend-icon="mdi-cash"
        :title="'SalaryAmount: '+doctor.salaryAmount"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-idnumber"
        prepend-icon="mdi-numeric"
        :title="'IdNumber: '+doctor.idNumber"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-employmentdate"
        prepend-icon="mdi-calendar"
        :title="doctor.employmentDate"
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
