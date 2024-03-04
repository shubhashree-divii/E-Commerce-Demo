<template>
 
  <div class="inner-body-content-area pad-53">
    <HeaderVue/>
    <Sidebar/>
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import HeaderVue from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>
