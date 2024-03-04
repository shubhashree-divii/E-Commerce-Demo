<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router";
import { globalRouter } from "./router/globalRouter";

const router = useRouter();
globalRouter.router = router;
  //
</script>
