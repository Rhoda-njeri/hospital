<template>
  <v-data-table-virtual
    :headers="headers"
    :items="nurses"
    height="400"
    item-value="name">
    <template v-slot:item.action="{ item }">

      <v-icon size="small" @click="editNurse(item.raw)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deleteNurse(item.raw)">mdi-delete</v-icon>
      <v-icon size="small" @click="showNurse(item.raw)">mdi-eye</v-icon>
    </template>
  </v-data-table-virtual>
  <v-dialog
  <
  v-model="dialog"
  max-width="600">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      class="text-none font-weight-regular"
      prepend-icon="mdi-mother-nurse"
      text="Add nurse"
      variant="tonal"
      v-bind="activatorProps"
    ></v-btn>
  </template>

  <v-card
    prepend-icon="mdi-mother-nurse"
    title="Nurse Details">
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
        text="Save Nurse"
        variant="tonal"
        :loading="loading"
        @click="saveNurse"
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
    nurses: [] as any,
  }),

  mounted() {
    this.fetchNurses();
  }
  , methods: {
    fetchNurses() {
      onValue(ref(fireDb, '/nurses'), (snapshot) => {
        snapshot.forEach((nurse) => {
          console.log(nurse.val().idNumber)
          this.nurses.push({
            name: nurse.val().name,
            qualification:nurse.val().qualification,
            experience: nurse.val().experience,
            salaryAmount: nurse.val().salaryAmount,
            idNumber: nurse.val().idNumber,
            employmentDate: nurse.val().employmentDate,
          } as any)
        })
      })
    },
    saveNurse() {
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
      let nurse = {
        name: this.name,
        qualification: this.qualification,
        experience: this.experience,
        employmentDate: this.employmentDate,
        idNumber: this.idNumber,
        salaryAmount: this.salaryAmount
      }


      // check if NURSE ID exist
      let nurseInfo:any = undefined

      onValue(ref(fireDb, '/nurses'), (snapshot) => {
        snapshot.forEach((user) => {
          if(user.val().name==this.name){
            nurseInfo=user.val()

          }
        })
        if(nurseInfo != undefined){
          this.message ="Nurse already registered"
          return;
        }else{
          //inserting user to firebase db
          push(ref(fireDb, "nurses/"), nurse)
          this.loading=false
          this.dialog=false

        }


      }, {
        onlyOnce: true
      });


    },
    editNurse(data: object){
      console.log(data)

    },
    deleteNurse(data: object) {
      console.log(data)
    },
    showNurse(data: object) {
      console.log(data)
    }

  },


}
</script>
