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
          v-model="age"
          placeholder="age"
          
          variant="outlined"></v-text-field>
  
        <v-text-field
          density="compact"
          v-model="location"
          placeholder="Experience"
          variant="outlined"></v-text-field>
  
        <v-text-field
          density="compact"
          v-model="contact"
          placeholder="contact"
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
          Add Patients
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
      visible: false,
      name: "",
      age: "",
      location: "",
      contact: "",
      

    }
  },
  methods: {
    login() {
      if (this.name == "") {
        this.message = "name cannot be blank"
        return
      }
      if (this.age== "") {
        this.message = "age cannot be blank"
        return
      }
      if (this.location == "") {
        this.message = "location cannot be blank"
        return
      }
      if (this.contact == "") {
        this.message = "contact cannot be blank"
        return
     
     }
      
      
    
      //user object
      let patient = {
        name: this.name,
        age: this.age,
        location: this.location,
        contact: this.contact,
    
    
      }


      // check if PATIENT ID exist
      let patientInfo:any = undefined
      
      onValue(ref(fireDb, '/patients'), (snapshot) => {
              snapshot.forEach((user) => {
                if(user.val().name==this.name){
                  patientInfo=user.val()

                }
              })
              if(patientInfo != undefined){
                this.message ="Pateint already registered"
                return;
              }else{
                //inserting user to firebase db
                push(ref(fireDb, "patients/"), patient)
                this.$router.push('/all-patients');

              }


          }, {
            onlyOnce: true
          });


    }
  },
})
</script>