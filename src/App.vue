<template>
  <v-layout>
    <v-navigation-drawer
      permanent class="main-navigation"
      :rail="rail"
      @click="rail = false">
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          prepend-avatar="https://t3.ftcdn.net/jpg/00/45/20/70/240_F_45207005_oWfbp8uUsuEV74nNLbGS4HyrybFXQek4.jpg"
          :title="name"
          :subtitle="role"/>
      </template>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          v-for="link in links"
          :to="link.value"
          :key="link.value"
          :prepend-icon="link.icon"
          :title="link.title"
          :value="link.value"/>
      </v-list>
      <template v-slot:append>
        <div class="pa-4">
          <v-btn :loading="logoutLoad" block @click="logout" size="small" color="button">
            <v-icon v-if="rail" left>mdi-power</v-icon>
            <span v-if="!rail">Logout</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main style="margin: 5px;">
      <default-bar
        @changeTheme="changeTheme"
        @open="toggleDrawer"/>
      <router-view/>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import DefaultBar from '@/components/AppBar.vue';
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import {useTheme} from "vuetify";
import {setupApp} from "@/helper/firebaseHandler";

const rail = ref(false);
const theme = useTheme()
const router = useRouter();
const name = 'John Doe';
const role = 'Admin';
const logoutLoad = ref(false);

function toggleDrawer() {
  rail.value = !rail.value;
}

setupApp()

interface NavLink {
  title: string;
  icon: string;
  value: string;
}

let links: NavLink[] = []

links.push({title: 'Dashboard', icon: 'mdi  mdi-home', value: '/'})
links.push({title: 'Doctors', icon: 'mdi mdi-doctor ', value: '/doctors'})
links.push({title: 'Nurses', icon: 'mdi mdi-mother-nurse ', value: '/nurses'})
links.push({title: 'Medicines', icon: 'mdi mdi-medical-bag ', value: '/medicines'})
links.push({title: 'Patients', icon: 'mdi mdi-wheelchair', value: '/patients'})

function logout() {
  logoutLoad.value = true
  // signOut();
  router.push('/login');
}

function changeTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'

}
</script>
