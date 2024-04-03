<template>
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
  <v-dialog
    v-model="dialog"
    max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-wheel-chair"
        text="Add Patient"
        variant="tonal"
        v-bind="activatorProps"
      ></v-btn>
    </template>
      <v-card
      prepend-icon="mdi-wheel-chair"
      title="Patient Details">
      <v-card-text>
        <v-row dense>
          <v-col
            cols="12"
            md="4"
            sm="6">
            <v-text-field
              label="First Name"
              v-model="first_name"
              required
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
            sm="6">
            <v-text-field
              label="Middle Name"
              required
              v-model="middle_name"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Last Name"
              variant="outlined"
              v-model="last_name"
              required></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
            sm="6">
            <v-text-field
              label="Age"
              required
              v-model="age"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6">
            <v-text-field
              label="Location"
              required
              v-model="location"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
            sm="6">

            <v-text-field
              label="Contact"
              required
              v-model="contact"
              variant="outlined"
            ></v-text-field>
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
          @click="closeDialog"
        ></v-btn>

        <v-btn
          color="primary"
          :text="actionEdit?'Update Patient':'Save Patient'"
          variant="tonal"
          :loading="loading"
          @click="savePatient"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="dialog_confirm_delete"
    max-width="600">
    <v-card
      prepend-icon="mdi-patient"
      title="Confirm">
      <v-card-text>
        Are you sure to delete {{ a }} with contact {{ b }} located at {{ c }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Cancel"
          variant="plain"
          @click="dialog_confirm_delete=false"
        ></v-btn>

        <v-btn
          color="primary"
          text="Delete"
          variant="tonal"
          :loading="loading"
          @click="continueDeletePatient"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </template>
<script lang="ts">
import {push, ref, onValue, update, remove} from "firebase/database"
import {fireDb} from "@/utils/constants"

export default {
  data: () => ({
    dialog: false,
    dialog_confirm_delete: false,
    id_to_delete: "",
    editContact:  "",
    a: "",
    b: "",
    c: "",
    nameToDelete: "",
    loading: false,
    actionEdit: false,
    headers: [
      {title: 'First Name', align: 'start', key: 'first_name'},
      {title: 'Middle Name', align: 'end', key: 'middle_name'},
      {title: 'Last Name', align: 'end', key: 'last_name'},
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
    patients: [] as any,
  }),

  mounted() {
    this.fetchPatients();
  }
  , methods: {
    fetchPatients() {
      onValue(ref(fireDb, '/patients'), (snapshot) => {

        this.patients = []
        snapshot.forEach((patient) => {
          this.patients.push({
            id: patient.key,
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
        this.message = "first_name cannot be blank"
        return
      }
      if (this.middle_name == "") {
        this.message = "middle_Name cannot be blank"
        return
      }
      if (this.last_name == "") {
        this.message = "last_name cannot be blank"
        return
      }
      if (this.age == "") {
        this.message = "age cannot be blank"
        return
      }

      if (this.location== "") {
        this.message = "location cannot be blank"
        return
      }


      if (this.contact == "") {
        this.message = "contact cannot be blank"
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
      }

      if (this.actionEdit) {
        update(ref(fireDb, '/patients/' + this.editContact), patient)
        this.closeDialog()
        return
      }
      // check if Patient ID exist
      let patientInfo: any = undefined

      onValue(ref(fireDb, '/patients'), (snapshot) => {
        snapshot.forEach((user) => {
          if (user.val().contact == this.contact) {
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
    editPatient(data: any) {                                 
      this.first_name = data.first_name
      this.middle_name = data.middle_name
      this.last_name = data.last_name
      this.age = data.age
      this.location = data.location
      this.contact = data.contact
      this.editContact = data.Contact
      this.actionEdit = true
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.actionEdit = false
      this.loading = false

      this.first_name = ''
      this.middle_name = ''
      this.last_name = ''
      this.age = ''
      this.location = ''
      this.contact = ''

    },

    deletePatient(data: any) {

      this.dialog_confirm_delete = true
      this.id_to_delete = data.id
      this.a = data.first_name
      this.b = data.contact
      this.c = data.location
      this.nameToDelete = data.first_name + " "+data.middle_name + " " + data.last_name

    },
    continueDeletePatient() {
      remove(ref(fireDb, '/patients/' + this.id_to_delete))
      this.dialog_confirm_delete = false
    },

    showPatient(data: any) {
      localStorage.setItem('patient', JSON.stringify(data))
      this.$router.push('/patient')
    }

  },
}

</script>

  
