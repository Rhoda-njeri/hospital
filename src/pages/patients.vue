<template>
  <v-data-table-virtual
    :headers="headers"
    :items="patients"
    height="400"
    item-value="name"
  >
    <template v-slot:item.action="{ item }">

      <v-icon size="small" @click="editPatient(item.raw)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deletePatient(item.raw)">mdi-delete</v-icon>
      <v-icon size="small" @click="showPatient(item.raw)">mdi-eye</v-icon>
    </template>
  </v-data-table-virtual>
  <v-dialog
    v-model="dialog"
    max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-wheelchair"
        text="Add-Patients"
        variant="tonal"
        v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card
      prepend-icon="mdi-wheelchair"
      title="Patient Details">
      <v-card-text>
        <v-row dense>
          <v-col
            cols="12"
            md="4"
            sm="6">
            <v-text-field
              label="First name"
              required
              v-model="first_name"
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
              v-model="middle_name"
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
              v-model="last_name"
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
              v-model="contact"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              label="Location*"
              variant="outlined"
              required
              v-model="location"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
            sm="6">

            <v-select
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Age"
              variant="outlined"
              required
              v-model="age"
            ></v-select>
          </v-col>

          <small class="text-caption text-decoration-none text-red">{{ message }}</small>
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
          @click="savePatient"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {fireDb} from '@/utils/constants';
import {push, ref, onValue} from "firebase/database"

export default {
  data: () => ({
    dialog: false,
    loading: false,
    headers: [
      {title: 'First Name', align: 'start', key: 'first_name'},
      {title: 'Middle Name', align: 'start', key: 'middle_name'},
      {title: 'Last Name', align: 'start', key: 'last_name'},
      {title: 'Age', align: 'end', key: 'age'},
      {title: 'Location', align: 'end', key: 'location'},
      {title: 'Contact', align: 'end', key: 'contact'},
      {title: 'Action', align: 'end', key: 'action'},
    ],
    message: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    age: "",
    location: "",
    contact: "",
    action: "",
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
            first_name: patient.val().first_name,
            middle_name: patient.val().middle_name,
            last_name: patient.val().last_name,
            age: patient.val().age,
            location: patient.val().location,
            contact: patient.val().contact,
          } as any)
        })
      })
    },
    savePatient() {
      if (this.first_name == "") {
        this.message = "First Name cannot be blank"
        return
      }
      if (this.middle_name == "") {
        this.message = "Middle Name cannot be blank"
        return
      }
      if (this.last_name == "") {
        this.message = "Last Name cannot be blank"
        return
      }
      if (this.age == "") {
        this.message = "Age cannot be blank"
        return
      }

      if (this.location == "") {
        this.message = "Location cannot be blank"
        return
      }


      if (this.contact == "") {
        this.message = "Contact cannot be blank"
        return
      }


      this.loading = true

      //user object

      let patient = {
        first_name: this.first_name,
        middle_name: this.middle_name,
        last_name: this.last_name,
        age: this.age,
        location: this.location,
        contact: this.contact,
        action: this.action,
      }


      // check if PATIENTS ID exist
      let patientInfo: any = undefined

      onValue(ref(fireDb, '/patients'), (snapshot) => {
        snapshot.forEach((user) => {
          if (user.val().name == this.first_name) {
            patientInfo = user.val()

          }
        })
        if (patientInfo != undefined) {
          this.message = "Patient already registered"
          return;
        } else {
          //inserting user to firebase db
          push(ref(fireDb, "patients/"), patient)
          this.loading = false
          this.dialog = false

        }


      }, {
        onlyOnce: true
      });
    },
    editPatient(data: object) {
      console.log(data)
    },
    deletePatient(data: object) {
      console.log(data)

    },
    showPatient(data: object) {
      console.log(data)

    }
  },
}


</script>
