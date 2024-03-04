<template>
  <div class="vl-parent" v-if="loading">
    <loading
      v-model:active="isLoading"
      :is-full-page="true"
      loader="spinner"
      color="#007bff"
      background-color="#000000"
      :opacity="0.2"
    />
  </div>
</template>
<script setup>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { computed } from "vue";
const props = defineProps({
  loading: {
    default: false,
    type: Boolean,
  },
});
const isLoading = computed(() => props.loading);
</script>
