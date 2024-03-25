<template>
  <v-data-table
    :headers="headers"
    :items="medicines"
    height="400"
    item-value="name">
    <template v-slot:[`item.action`]="{ item }">
      <v-icon size="small" @click="editMedicine(item)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deleteMedicine(item)">mdi-delete</v-icon>
      <v-icon size="small" @click="showMedicine(item)">mdi-eye</v-icon>
    </template>
  </v-data-table>
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
            sm="6">
            <v-text-field
              label="Expiry date"
              required
              v-model="expiry"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Disease"
              variant="outlined"
              v-model="disease"
              required></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
            sm="6">
            <v-text-field
              label="Cost"
              required
              v-model="cost"
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
          :text="actionEdit?'Update Medicine':'Save Medicine'"
          variant="tonal"
          :loading="loading"
          @click="saveMedicine"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
<v-dialog
    v-model="dialog_confirm_delete"
    max-width="600">
    <v-card
      prepend-icon="mdi-medical-bag"
      title="Confirm">
      <v-card-text>
        Are you sure to delete {{a}} expiring  {{b }} curing {{c}}
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
          @click="continueDeleteNurse"
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
    dialog_confirm_delete:false,
    id_to_delete:"",
    a:"",
    b:"",
    c:"",
    loading: false,
    actionEdit: false,
    headers: [
      {title: 'Name', align: 'start', key: 'name'},
      {title: 'Expiry date', align: 'end', key: 'expiry'},
      {title: 'Disease', align: 'end', key: 'disease'},
      {title: 'Cost', align: 'end', key: 'cost'},
      {title: 'Action', align: 'end', key: 'action'},

    ],
    message: "",
    name: "",
    editId: "",
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
        this.medicines = []
        snapshot.forEach((medicine) => {
          this.medicines.push({
            id: medicine.key,
           name: medicine.val().name,
            expiry: medicine.val().expiry,
            disease: medicine.val().disease,
            cost: medicine.val().cost,
          } as any)
        })
      })
    },
    saveMedicine() {
      if (this.name == "") {
        this.message = "name cannot be blank"
        return
      }
      if (this.expiry == "") {
        this.message = "Expiry Datecannot be blank"
        return
      }
      if (this.disease == "") {
        this.message = "disease cannot be blank"
        return
      }
      if (this.cost == "") {
        this.message = "cost cannot be blank"
        return
      }


      this.loading = true

      //user object
      let medicine = {
        name: this.name,
        expiry: this.expiry,
        disease: this.disease,
        cost: this.cost,

      }

      if (this.actionEdit) {
        update(ref(fireDb, '/medicines/' + this.editId), medicine)
        this.closeDialog()
        return
      }
      // check if Medicine ID exist
      let medicineInfo: any = undefined

      onValue(ref(fireDb, '/medicines'), (snapshot) => {
        snapshot.forEach((user) => {
          if (user.val().name == this.name) {
            medicineInfo = user.val()

          }
        })
        if (medicineInfo != undefined) {
          this.message = "medicine already registered"
          return;
        } else {
          //inserting user to firebase db
          push(ref(fireDb, "medicines/"), medicine)
          this.loading = false
          this.dialog = false

        }

      }, {
        onlyOnce: true
      });
    },
    editMedicine(data: any) {
      this.actionEdit = true
      this.dialog = true
      this.name = data.name
      this.expiry = data.expiry
      this.disease = data.disease
      this.cost = data.cost
      this.editId = data.id
    },
    closeDialog() {
      this.dialog = false
      this.actionEdit = false
      this.loading = false

      this.name = ''
      this.expiry = ''
      this.disease = ''
      this.cost = ''
      

    },

     deleteMedicine(data: any) {


this.dialog_confirm_delete=true
this.id_to_delete=data.id
this.a=data.name
this.b=data.expiry
this.c=data.disease

},
continueDeleteMedicine(){
remove(ref(fireDb, '/medicines/' + this.id_to_delete))
this.dialog_confirm_delete=false

    },
    
    showMedicine(data: any) { 
      localStorage.setItem('medicine', JSON.stringify(data))
      this.$router.push('/medicine')
      
    },

  }

}

</script>
