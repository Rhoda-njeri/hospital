<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
        >
          <v-list-item
            prepend-avatar="https://t3.ftcdn.net/jpg/00/45/20/70/240_F_45207005_oWfbp8uUsuEV74nNLbGS4HyrybFXQek4.jpg"
            title="Neema Hospital"
            nav
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Dashboard" to="/dashboard" value="/dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Add Doctors" to="/add-doctors" value="/all-doctors"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="All Doctors" to="/all-doctors" value="/all-doctors"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Users" to="/users" value="/users"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Profile" to="/profile" value="/users"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Add patients" to="/add-patients" value="/add-patients"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="All patients" to="/all-patients" value="/all-patients"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 250px">
        
        </v-main>
      </v-layout>
    </v-card>
  </template>
  <script lang="ts">
    export default {
      data () {
        return {
          drawer: true,
          rail: true,
        }
      },
    }
  </script>