<template>
  <v-app-bar flat elevation="1">
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title>Good {{ greeting }}</v-app-bar-title>
    <v-btn class="text-none" stacked @click="changeTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
    <v-btn class="text-none" stacked>
      <v-badge content="1" color="error">
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
export default class AppBar extends Vue {
  greeting: string = (() => {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) {
      return "morning!";
    } else if (hour >= 12 && hour < 18) {
      return "afternoon!";
    } else {
      return "evening!";
    }
  })();
  toggleDrawer() {
    this.$emit('open');
  }
  changeTheme() {
    this.$emit('changeTheme');
  }

}
</script>
