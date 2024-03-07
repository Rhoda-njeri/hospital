<template>
    <div>
     
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg">
  
        <v-text-field
          density="compact"
          v-model="name"
          placeholder="Name"
          variant="outlined"></v-text-field>
        <v-text-field
          density="compact"
          v-model="qualification"
          placeholder="Qualifications"
           variant="outlined"></v-text-field>
  
        <v-text-field
          density="compact"
          v-model="experience"
          placeholder="Experience"
          variant="outlined"></v-text-field>
  
        <v-text-field
          density="compact"
          v-model="salaryamount"
          placeholder="Salaryamount"
          variant="outlined"></v-text-field>

          <v-text-field
          density="compact"
          v-model="idNumber"
          placeholder="Id number"
          variant="outlined"></v-text-field>
  
  
        <v-text-field
          density="compact"
          v-model="employmentdate"
          placeholder="Employmentdate"
          prepend-inner-icon="mdi-calendar-outline"
          variant="outlined"></v-text-field>

        <a
          class="text-caption text-decoration-none text-red"
          href="#"
          rel="noopener noreferrer"
          target="_blank">{{ message }}</a>
        <v-btn
          block
          class="mb-8"
          color="green"
          size="large"
          @click="login"
          variant="tonal">
          Add Doctors
        </v-btn>
    
      </v-card>
    </div>
  </template>

<script lang="ts">
import {push, ref, onValue} from "firebase/database"
import {fireDb} from "@/utils/constants"
import {defineComponent} from 'vue';


export default defineComponent({
  data() {
    return {
      message: "",
      name: "",
      qualification: "",
      idNumber: "",
      experience: "",
      salaryamount: "",
      employmentdate: "",
    
    }
  },
  methods: {
    login() {
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
      if (this.salaryamount == "") {
        this.message = "salaryamount cannot be blank"
        return
     }

     if (this.employmentdate == "") {
        this.message = "employmentdate cannot be blank"
        return
     }
      

     if (this.idNumber == "") {
        this.message = "idNumber cannot be blank"
        return
     }
      
    
      //user object
      let doctor = {
        name: this.name,
        qualification: this.qualification,
        experience: this.experience,
        employmentdate: this.employmentdate,
        idNumber: this.idNumber,
        salaryamount: this.salaryamount
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
                this.$router.push('/all-doctors');

              }


          }, {
            onlyOnce: true
          });


    }
  },
})
</script>