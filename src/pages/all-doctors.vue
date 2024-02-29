<template>
  <v-data-table-virtual
    :headers="headers"
    :items="doctors"
    height="400"
    item-value="name"
  ></v-data-table-virtual>
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
      {title: 'Id Number', align: 'end', key: 'number'},
      {title: 'Employment Date', align: 'end', key: 'year'},
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
            name: 1,
            qualification: 2,
            experience: 3,
            salaryamount: doctor.val().salaryamount,
            idNumber: 'id',
            EmploymentDate: 6
          } as any)
        })
      })
    }
  }
}
</script>
