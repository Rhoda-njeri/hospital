<template>
    <v-data-table-virtual
      :headers="headers"
      :items="medicines"
      height="400"
      item-value="name"
    > <template v-slot:item.action="{ item }">

<v-icon size="small" @click="editMedicine(item.raw)">mdi-pencil</v-icon>
<v-icon size="small" @click="deleteMedicine(item.raw)">mdi-delete</v-icon>
<v-icon size="small" @click="showMedicine(item.raw)">mdi-eye</v-icon>
</template>
</v-data-table-virtual>
<v-dialog
    <v-dialog
        v-model="dialog"
        max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            class="text-none font-weight-regular"
            prepend-icon="mdi-medical-bag"
            text="Add medicine"
            variant="tonal"
            v-bind="activatorProps"
          ></v-btn>
        </template>
  
        <v-card
          prepend-icon="mdi-medical-bag"
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
                  v-model="expiry"
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
                  label="Medicine cost"
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
        {title: 'Names', align: 'start', key: 'name'},
        {title: 'Expiry date', align: 'end', key: 'expiry'},
        {title: 'Disease', align: 'end', key: 'disease'},
        {title: 'Medicine cost', align: 'end', key: 'cost'},
        {title: 'Action', align: 'end', key: 'action'},
      ],
        message: "",
        name: "",
        expiry: "",
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
            this.medicines.push({
              name: medicine.val().name,
              expiry:medicine.val().expiry,
              disease: medicine.val().disease,
              cost: medicine.val().cost,
            } as any)
          })
        })
      },
      saveMedicine() {
        if (this.name == "") {
          this.message = "Name cannot be blank"
          return
        }
        if (this.expiry == "") {
          this.message = "Expiry date cannot be blank"
          return
        }
        if (this.disease== "") {
          this.message = "disease cannot be blank"
          return
       }
  
       if (this.cost== "") {
          this.message = "medicine cost cannot be blank"
          return
       }
        
       this.loading=true
      
        //user object
        let medicine = {
          name: this.name,
          expiry: this.expiry,
          disease: this.disease,
          cost: this.cost,
        }
  
  
        // check if MEDICINE exist
        let medicineInfo:any = undefined
        
        onValue(ref(fireDb, '/medicines'), (snapshot) => {
                snapshot.forEach((medicine) => {
                  if(medicine.val().name==this.name){
                    medicineInfo=medicine.val()
  
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
          },
          editMedicine(data: object) {
      console.log(data)
    },
    deleteMedicine(data: object) {
      console.log(data)
    },
      showMedicine(data: object) {
      console.log(data)

      }
    },
  }

  </script>
  