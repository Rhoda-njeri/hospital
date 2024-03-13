<template>
  <v-data-table-virtual
    :headers="headers"
    :items="doctors"
    height="400"
    item-value="name">
    <template v-slot:item.action="{ item }">

      <v-icon size="small" @click="editDoctor(item.raw)">mdi-pencil</v-icon>
<v-icon size="small" @click="deleteDoctor(item.raw)">mdi-delete</v-icon>
<v-icon size="small" @click="showDoctor(item.raw)">mdi-eye</v-icon>
</template>
</v-data-table-virtual>
  <v-dialog
      v-model="dialog"
      max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-doctor"
          text="Add doctor"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="mdi-doctor"
        title="Doctor Details">
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6">
              <v-text-field
                label="Name"
                v-model="name"
                required        
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Qualification"
                required
                v-model="qualification"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Experience"
                variant="outlined"
                v-model="experience"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Salary Amount"
                required
                v-model="salaryAmount"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Id Number*"
                required
                v-model="idNumber"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6">

              <v-text-field
                label="Employment Date*"
                required
                v-model="employmentDate"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-decoration-none text-red">{{message}}</small>
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
            text="Save Doctor"
            variant="tonal"
            :loading="loading"
            @click="saveDoctor"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {push, ref, onValue} from "firebase/database"
import {fireDb} from "@/utils/constants"

export default {
  data: () => ({
    dialog:false,
    loading:false,
    headers: [
      {title: 'Names', align: 'start', key: 'name'},
      {title: 'Qualifications', align: 'end', key: 'qualification'},
      {title: 'Experience', align: 'end', key: 'experience'},
      {title: 'Salary Amount', align: 'end', key: 'salaryAmount'},
      {title: 'Id Number', align: 'end', key: 'idNumber'},
      {title: 'Employment Date', align: 'end', key: 'employmentDate'},
      {title: 'Action', align: 'end', key: 'action'},
    ],
      message: "",
      name: "",
      qualification: "",
      idNumber: "",
      experience: "",
      salaryAmount: "",
      employmentDate: "",
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
            salaryAmount: doctor.val().salaryAmount,
            idNumber: doctor.val().idNumber,
            employmentDate: doctor.val().employmentDate,
          } as any)
        })
      })
    },
    saveDoctor() {
      if (this.name == "") {
        this.message = "name cannot be blank"
        return
      }
      if (this.qualification == "") {
        this.message = "qualification cannot be blank"
        return
      }
      if (this.experience == "") {
        this.message = "experience cannot be blank"
        return
      }
      if (this.salaryAmount == "") {
        this.message = "salary amount cannot be blank"
        return
     }

     if (this.employmentDate == "") {
        this.message = "employmentdate cannot be blank"
        return
     }
      

     if (this.idNumber == "") {
        this.message = "Id number cannot be blank"
        return
     }
      
     this.loading=true
    
      //user object
      let doctor = {
        name: this.name,
        qualification: this.qualification,
        experience: this.experience,
        employmentDate: this.employmentDate,
        idNumber: this.idNumber,
        salaryAmount: this.salaryAmount
      }


      // check if DOCTOR ID exist
      let doctorInfo:any = undefined
      
      onValue(ref(fireDb, '/doctors'), (snapshot) => {
              snapshot.forEach((user) => {
                if(user.val().name==this.name){
                  doctorInfo=user.val()

                }
              })
              if(doctorInfo != undefined){
                this.message ="Doctor already registered"
                return;
              }else{
                //inserting user to firebase db
                push(ref(fireDb, "doctors/"), doctor)
                this.loading=false
                this.dialog=false

              }


          }, {
            onlyOnce: true
          });
        },
    editDoctor(data: object) {
      console.log(data)
    },
    deleteDoctor(data: object) {
      console.log(data)
    },
    showDoctor(data: object) {
      console.log(data)

</script>
    }

  },
}
  
</script>
