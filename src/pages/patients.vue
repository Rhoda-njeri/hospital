<template>
  <v-data-table
    :headers="headers"
    :items="patients"
    height="400"
    item-value="name">
    <template v-slot:[`item.action`]="{ item }">
      <v-icon size="small" @click="editPatient(item)">mdi-pencil</v-icon>
    <v-icon size="small" @click="deletePatient(item.id)">mdi-delete</v-icon>
    <v-icon size="small" @click="showPatient(item.id)">mdi-eye</v-icon>
  </template>
  </v-data-table>
  <v-dialog
    v-model="dialog"
    max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-wheelchair"
        text="Add patient"
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

          <v-select
            :items="['0-17', '18-29', '30-54', '54+']"
            label="Age"
            variant="outlined"
            required
            v-model="age"
          ></v-select>
      
          
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
</template>

<script lang="ts">
import {push, ref, onValue,update} from "firebase/database"
import {fireDb} from "@/utils/constants"

export default {
  data: () => ({
    dialog: false,
    loading: false,
    actionEdit:false,
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
    editId:"",
    age:"",
    location:"",
    contact: "",
    patients: [] as any,
  }),

  mounted() {
    this.fetchPatients();
  }
  , methods: {
    fetchPatients() {
      onValue(ref(fireDb, '/patients'), (snapshot) => {
        
        this.patients=[]
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
    saveMedicine() {
      if (this.first_name == "") {
        this.message = "First Name cannot be blank"
        return
      }
      if (this.middle_name == "") {
        this.message = "Middle Name cannot be blank"
        return
      }
      if (this.last_name== "") {
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

      if(this.actionEdit){
        update(ref(fireDb, '/medicines/'+this.editId),patient)
        this.closeDialog()
        return
      }
      // check if Patient ID exist
      let patientInfo: any = undefined

      onValue(ref(fireDb, '/patients'), (snapshot) => {
      snapshot.forEach((user) => {
        if (user.val().name == this.first_name) {
          patientInfo = user.val()

          }
        })
        if (patientInfo != undefined) {
          this.message = "patient already registered"
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
      this.actionEdit=true
      this.dialog=true
      this.first_name=data.first_name
      this.middle_name=data.middle_name
      this.last_name=data.last_name
      this.age=data.age
      this.location=data.location
      this.contact=data.contact
      this.editId=data.id                                                                                        
    },
    closeDialog(){
      this.dialog = false
      this.actionEdit=false
      this.loading=false
      
    this.first_name=''
    this.middle_name=''
    this.last_name=''
    this.age=''
      this.location=''
      this.contact=''
    
    
    },
    deletePatient(data: string) {
      ref(fireDb, '/patients/'+data.id).remove()
      console.log(data)
    },
    showPatient(data: string) {
      console.log(data)
    }

  },
}

</script>
