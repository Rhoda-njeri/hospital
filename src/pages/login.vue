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
          v-model="email"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
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
          variant="tonal"
        >
          Log In
        </v-btn>
  
        <v-card-text class="text-center">
          <RouterLink
            class="text-blue text-decoration-none"
            to="/signup"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </RouterLink>
        </v-card-text>
      </v-card>
    </div>
  </template>
  <script  lang="ts">
  import { getMaxListeners } from 'events';
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
  
  
   export default defineComponent( {
    data() {
        return {
            message: "",
            visible: false,
            email: "",
            password: ""
        };
    },
    methods: {
        login() {
            if (this.email == "") {
                this.message = "email cannot be blank";
                return;
            }
            if (this.password == "") {
                this.message = "password cannot be blank";
                return;
            }
            if (this.email == "admin@gmail.com" && this.password == "password") {
                this.$router.push('/dashboard');
            }
            else {
                this.message = "invalid name or password";
            }
        }
    },
    components: { RouterLink }
})
  </script>
  
    
      
    
  
  
  
  