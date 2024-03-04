<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-app-bar-title>Application</v-app-bar-title>
    <template v-slot:append>
      <v-btn @click="$router.push('/cart')">Cart</v-btn>
      <Login />
    </template>
    
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <!--  -->
  </v-navigation-drawer>
</template>
<script setup>
import { ref } from "vue";
import Login from "@/components/Login.vue";
const isActive = ref(true);

const drawer = ref(null);
</script>
