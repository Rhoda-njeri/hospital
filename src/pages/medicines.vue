<template>
    <v-data-table-virtual
      :headers="headers"
      :items="medicines"
      height="400"
      item-value="name"
    ></v-data-table-virtual>
    <v-dialog
        v-model="dialog"
        max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            class="text-none font-weight-regular"
            prepend-icon="mdi-account-plus"
            text="Add medicine"
            variant="tonal"
            v-bind="activatorProps"
          ></v-btn>
        </template>
  
        <v-card
          prepend-icon="mdi-account-plus"
          title="Medicine Details">
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
                  label="Expiry date"
                  required
                  v-model="expiryDate"
                  variant="outlined"
                ></v-text-field>
              </v-col>
  
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                  label="Disease"
                  variant="outlined"
                  v-model="disease"
                  required
                ></v-text-field>
              </v-col>
  
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                  label="Cost of Medicine"
                  required
                  v-model="cost"
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
              text="Save Medicine"
              variant="tonal"
              :loading="loading"
              @click="saveMedicine"
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
        {title: 'Names', align: 'start', key: 'names'},
        {title: 'Expiry date', align: 'end', key: 'expiry date'},
        {title: 'Disease', align: 'end', key: 'Disease'},
        {title: 'Cost of medicine', align: 'end', key: 'cost of medicine'},
      ],
        message: "",
        name: "",
        expiryDate: "",
        disease: "",
        cost: "",
        medicines: [] as any,
    }),
  
    mounted() {
      this.fetchMedicines();
    }
    , methods: {
      fetchMedicines() {
        onValue(ref(fireDb, '/medicines'), (snapshot) => {
          snapshot.forEach((medicine) => {
            console.log(medicine.val().idNumber)
            this.medicine.push({
              name: medicine.val().name,
              expiryDate:medicine.val().expiryDate,
              disease: medicine.val().disease,
              costofMedicine: medicine.val().costofMedicine,
            } as any)
          })
        })
      },
      saveMedicine() {
        if (this.name == "") {
          this.message = "name cannot be blank"
          return
        }
        if (this.expiryDate == "") {
          this.message = "expiry date cannot be blank"
          return
        }
        if (this.disease== "") {
          this.message = "disease cannot be blank"
          return
       }
  
       if (this.cost== "") {
          this.message = "cost of medicine cannot be blank"
          return
       }
        
       this.loading=true
      
        //user object
        let medicine = {
          name: this.name,
          expiryDate: this.expiryDate,
          disease: this.disease,
          cost: this.cost,
        }
  
  
        // check if MEDICINEID exist
        let medicineInfo:any = undefined
        
        onValue(ref(fireDb, '/medicines'), (snapshot) => {
                snapshot.forEach((user) => {
                  if(user.val().name==this.name){
                    medicineInfo=user.val()
  
                  }
                })
                if(medicineInfo != undefined){
                  this.message ="Medicine already registered"
                  return;
                }else{
                  //inserting user to firebase db
                  push(ref(fireDb, "medicines/"), medicine)
                  this.loading=false
                  this.dialog=false
  
                }
  
  
            }, {
              onlyOnce: true
            });
  
  
      }
    },
  }
  </script>
  