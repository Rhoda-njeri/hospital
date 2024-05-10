<template>
    <v-card
      class="mx-auto"
      max-width="500">
      <v-card-item class="bg-cyan-darken-1">
        <v-card-title>
          </v-card-title>
          <span class="text-h5"> {{ patient.first_name }} {{patient.middle_name }} {{ patient.last_name }}</span>
           
          <v-dialog
          v-model="dialog"
              max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-medical-bag"
        text="Add Treatment Details"
        variant="tonal"
        v-bind="activatorProps"
        item-value="name"></v-btn>
    </template>
    <v-card
      prepend-icon="mdi-patient"
      title="Treatment Details">
      <v-card-text>
        <v-row dense>
          <v-col
            cols="12"
            md="4"
            sm="6">
            <v-text-field
              label="Cost"
              v-model="cost"
              required
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
            sm="6">
            <v-text-field
              label="Date of Treatment"
              required
              v-model="date"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Recommendation"
              variant="outlined"
              v-model="recommendation"
              required></v-text-field>
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
          @click="dialog=false"
        ></v-btn>

        <v-btn
          color="primary"
          text="Add Treatment"
          variant="tonal"
          :loading="loading"
          @click="saveTreatmentDetails"></v-btn>
      </v-card-actions>
    </v-card>
          </v-dialog>

      </v-card-item>
      <v-list>
    
        <v-list-item
          append-icon="mdi-age"
          prepend-icon="mdi-calendar"
          :title="'Age: '+patient.age"
        ></v-list-item>
  
      <v-divider inset></v-divider>

      <v-list-item
          append-icon="mdi-location"
          prepend-icon="mdi-map-marker"
          :title="'Location: '+patient.location"
        ></v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
          append-icon="mdi-contact"
          prepend-icon="mdi-cellphone"
          :title="'Contact: '+patient.contact"
        ></v-list-item>
    </v-list>
        <v-divider inset></v-divider>
    </v-card>
<v-data-table
  :headers="headers"
  :items="treatment_details"
  height="400"
  item-value="name">
        <template v-slot:[`item.action`]="{ item }">
          <v-icon size="small" @click="editTreatmentDetails(item)">mdi-pencil</v-icon>
          <v-icon size="small" @click="deleteTreatmentDetails(item)">mdi-delete</v-icon>
      </template>

</v-data-table>

<v-dialog
v-model="dialog"
max-width="600">
<template v-slot:activator="{ props: activatorProps }">
  <v-btn
    class="text-none font-weight-regular"
    prepend-icon="mdi-medical-bag"
    text="Add treatment_details"
    variant="tonal"
    v-bind="activatorProps"
  ></v-btn>
</template>
<v-card
  prepend-icon="mdi-medical-bag"
  title="TreatmentDetails">
  <v-card-text>
    <v-row dense>
      <v-col
        cols="12"
        md="4"
        sm="6">
        <v-text-field
          label="Cost"
          v-model="cost"
          required
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="4"
        sm="6">
        <v-text-field
          label="Date"
          required
          v-model="date"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-text-field
          label="Recommendation"
          variant="outlined"
          v-model="recommendation"
          required></v-text-field>
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
      :text="action_edit?'Update TreatmentDetails':'SaveTreatmentDetails'"
      variant="tonal"
      :loading="loading"
      @click="saveTreatmentDetails"
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
        Are you sure to delete this record?
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
          @click="continueDeleteTreatmentDetails"
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
        dialog:false,
        cost: '',
        date: '',
        action_edit:true,
        message:'',
        editId:'',
        dialog_confirm_delete:false,
        id_to_delete:'',
        name_to_delete: "",
        treatment_details:[] as any,
        headers: [
              {title: 'Cost', align: 'end', key: 'cost'},
              {title: 'Date', align: 'end', key: 'date'},
              {title: 'Recommendation', align: 'end', key: 'recommendation'},
              {title: 'Action', align: 'end', key: 'action'}
        ],
        recommendation: "", 
        patient: {} as any,
        loading:false,

      }
    ), mounted() {
      this.fetchData();
      this.fetchTreatmentDetails();
    }
    , methods: {
      fetchTreatmentDetails() {
        onValue(ref(fireDb, "treatments/"+this.patient.contact ), (snapshot) => {
          this.treatment_details = []
          snapshot.forEach((treatment_detail) => {
            this.treatment_details.push({
              id: treatment_detail.key,
              cost: treatment_detail.val().cost,
              date: treatment_detail.val().date,
              recommendation: treatment_detail.val().recommendation,
           
            } as any)
          })
        })
      },
      saveTreatmentDetails(){
        if (this.cost == "") {
          this.message = "cost cannot be blank"
          return
        }
        if (this.date == "") {
          this.message = "date cannot be blank"
          return
        }
        if (this.recommendation == "") {
          this.message = "recommendation cannot be blank"
          return
        }
      
  
        this.loading = true
  
        //user object
        let treatment_detail = {
          cost: this.cost,
          date: this.date,
          recommendation: this.recommendation,
        }
  
     if (this.action_edit) {
          update(ref(fireDb, 'treatments/' +this.patient.contact+'/'+ this.editId), treatment_detail)
          this.closeDialog()
          return
        }
   
            //inserting user to firebase db
            push(ref(fireDb, "treatments/"+this.patient.contact), treatment_detail)
            this.loading = false
            this.dialog = false
        

      
      },
      continueDeleteTreatmentDetails() {
        remove(ref(fireDb, 'treatments/' +this.patient.contact+'/'+ this.id_to_delete))
        this.dialog_confirm_delete = false
      },
      fetchData() {
        this.patient = JSON.parse(localStorage.getItem('patient') as string)
      },

      editTreatmentDetails(data: any) {                                 
        this.cost = data.cost
        this.date = data.date
        this.recommendation= data.recommendation
        this.action_edit = true
        this.editId = data.id
        this.dialog = true
    },
    closeDialog() {
      this.cost = ''
      this.date = ''
      this.recommendation = '' 
      this.dialog = false
      this.action_edit = false
      this.loading = false
      },
      deleteTreatmentDetails(data: any){
        this.dialog_confirm_delete = true
        this.id_to_delete = data.id


    }}
  
  }
  </script>
  