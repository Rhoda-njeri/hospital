<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://t3.ftcdn.net/jpg/00/45/20/70/240_F_45207005_oWfbp8uUsuEV74nNLbGS4HyrybFXQek4.jpg"
    ></v-img>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg">

      <v-text-field
        density="compact"
        v-model="fullname"
        placeholder="Full Name"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"></v-text-field>
      <v-text-field
        density="compact"
        v-model="email"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>

      <v-text-field
        density="compact"
        v-model="age"
        placeholder="Age"
        prepend-inner-icon="mdi-calendar"
        variant="outlined"></v-text-field>

      <v-text-field
        density="compact"
        v-model="location"
        placeholder="Location"
        prepend-inner-icon="mdi-pin"
        variant="outlined"></v-text-field>


      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        v-model="password"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        v-model="confirm_password"
        placeholder="Confirm your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>
      <a
        class="text-caption text-decoration-none text-red"
        href="#"
        rel="noopener noreferrer"
        target="_blank">{{ message }}</a>
      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        @click="login"
        variant="tonal">
        Register
      </v-btn>
      <v-card-text class="text-center">
        <RouterLink
          class="text-blue text-decoration-none"
          to="/login"
        >
          Have account Log in
          <v-icon icon="mdi-chevron-right"></v-icon>
        </RouterLink>
      </v-card-text>
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
      fullname: "",
      age: "",
      email: "",
      password: "",
      confirm_password: "",
      location: "",

    }
  },
  methods: {
    login() {
      if (this.fullname == "") {
        this.message = "fullname cannot be blank"
        return
      }
      if (this.age == "") {
        this.message = "age cannot be blank"
        return
      }
      if (parseInt(this.age) < 18) {
        this.message = "under 18 are not welcomed"
        return
      }    
      if (parseInt(this.age) > 50) {
        this.message = "over 50 are not welcomed"
        return
      }
      if (this.location == "") {
        this.message = "location cannot be blank"
        return
      }
      if (this.email == "") {
        this.message = "email cannot be blank"
        return
      }
      if (this.password == "") {
        this.message = "password cannot be blank"
        return
      }
      if (this.confirm_password == "") {
        this.message = "password cannot be blank "
        return
    
      
      }

      //user object
      let user = {
        fullname: this.fullname,
        email: this.email,
        password: this.password,
        age: this.age,
        location: this.location
      }


      // check if email exist
      let userInfo:any = undefined
      
      onValue(ref(fireDb, '/users'), (snapshot) => {
              snapshot.forEach((user) => {
                if(user.val().email==this.email){
                  userInfo=user.val()

                }
              })
              if(userInfo != undefined){
                this.message ="Email already taken"
                return;
              }else{
                //inserting user to firebase db
                push(ref(fireDb, "users/"), user)
                this.$router.push('/login');

              }


          }, {
            onlyOnce: true
          });


    }
  },
})
</script>
