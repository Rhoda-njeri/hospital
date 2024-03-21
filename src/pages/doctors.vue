<template>
  <v-data-table
    :headers="headers"
    :items="doctors"
    height="400"
    item-value="name">
    <template v-slot:[`item.action`]="{ item }">
      <v-icon size="small" @click="editDoctor(item)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deleteDoctor(item)">mdi-delete</v-icon>
      <v-icon size="small" @click="showDoctor(item)">mdi-eye</v-icon>
    </template>
  </v-data-table>
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
            sm="6">
            <v-text-field
              label="Qualification"
              required
              v-model="qualification"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Experience"
              variant="outlined"
              v-model="experience"
              required></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
            sm="6">
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
            sm="6">
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
          :text="actionEdit?'Update Doctor':'Save Doctor'"
          variant="tonal"
          :loading="loading"
          @click="saveDoctor"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="dialog_confirm_delete"
    max-width="600">
    <v-card
      prepend-icon="mdi-doctor"
      title="Confirm">
      <v-card-text>
        Are you sure to delete {{a}} with {{b}} earning {{c}}
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
          @click="continueDeleteDoctor"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">
import {push, ref, onValue, update, remove } from "firebase/database"
import {fireDb} from "@/utils/constants"

export default {
  data: () => ({
    dialog: false,
    dialog_confirm_delete:false,
    id_to_delete:"",
    a:"",
    b:"",
    c:"",
    nameToDelete:"",
    loading: false,
    actionEdit:false,
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
    editId:"",
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
        this.doctors=[]
        snapshot.forEach((doctor) => {
          this.doctors.push({
            id: doctor.key,
            name: doctor.val().name,
            qualification: doctor.val().qualification,
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

      this.loading = true

      //user object
      let doctor = {
        name: this.name,
        qualification: this.qualification,
        experience: this.experience,
        employmentDate: this.employmentDate,
        idNumber: this.idNumber,
        salaryAmount: this.salaryAmount
      }

      if(this.actionEdit){
        update(ref(fireDb, '/doctors/'+this.editId),doctor)
        this.closeDialog()
        return
      }
      // check if DOCTOR ID exist
      let doctorInfo: any = undefined

      onValue(ref(fireDb, '/doctors'), (snapshot) => {
        snapshot.forEach((user) => {
          if (user.val().name == this.name) {
            doctorInfo = user.val()

          }
        })
        if (doctorInfo != undefined) {
          this.message = "Doctor already registered"
          return;
        } else {
          //inserting user to firebase db
          push(ref(fireDb, "doctors/"), doctor)
          this.loading = false
          this.dialog = false

        }

      }, {
        onlyOnce: true
      });
    },
    editDoctor(data: any) {
      this.actionEdit=true
      this.dialog=true
      this.name=data.name
      this.qualification=data.qualification
      this.experience=data.experience
      this.salaryAmount=data.salaryAmount
      this.idNumber=data.idNumber
      this.employmentDate=data.employmentDate
      this.editId=data.id
    },
    closeDialog(){
      this.dialog = false
      this.actionEdit=false
      this.loading=false
      
    this.name=''
    this.qualification=''
    this.idNumber=''
    this.experience=''
    this.salaryAmount=''
    this.employmentDate=''
    
    },
    deleteDoctor(data: any) {

      this.dialog_confirm_delete=true
      this.id_to_delete=data.id
      this.a=data.name
      this.b=data.qualification
      this.c=data.salaryAmount
      this.nameToDelete=data.name

    },
    continueDeleteDoctor(){
      remove(ref(fireDb, '/doctors/' + this.id_to_delete))
      this.dialog_confirm_delete=false

    },
    showDoctor(data: any) {
      localStorage.setItem('doctor',data)
      this.$router.push('/doctor')
    }

  },
}

</script>
