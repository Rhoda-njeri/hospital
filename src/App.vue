<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { setupApp } from './helper/firebaseHandler';

setupApp()
  //
</script>
