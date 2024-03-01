<template>
  <v-data-table-virtual
    :headers="headers"
    :items="doctors"
    height="400"
    item-value="name"
  ></v-data-table-virtual>
  <v-btn
          block
          color="blue"
          to="/add-doctors"
          variant="tonal"
          >
          Add Doctor
        </v-btn>
</template>

<script lang="ts">
import {fireDb} from '@/utils/constants';
import {ref, onValue} from "firebase/database";

export default {
  data: () => ({
    headers: [
      {title: 'Names', align: 'start', key: 'name'},
      {title: 'Qualifications', align: 'end', key: 'qualification'},
      {title: 'Experience', align: 'end', key: 'experience'},
      {title: 'Salaryamount', align: 'end', key: 'salaryamount'},
      {title: 'Id Number', align: 'end', key: 'idNumber'},
      {title: 'Employment Date', align: 'end', key: 'employmentDate'},
    ],
    doctors: [] as any,
  }),

  mounted() {

    this.fetchDoctors();
  }
  , methods: {
    fetchDoctors() {
      onValue(ref(fireDb, '/doctors'), (snapshot) => {
        snapshot.forEach((doctor) => {
          console.log(doctor.val().idNumber)
          this.doctors.push({
            name: doctor.val().name,
            qualification:doctor.val().qualification,
            experience: doctor.val().experience,
            salaryamount: doctor.val().salaryamount,
            idNumber: doctor.val().idNumber,
            employmentDate: doctor.val().employmentdate,
          } as any)
        })
      })
    }
  }
}
</script>
