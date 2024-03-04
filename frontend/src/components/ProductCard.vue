<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <v-img height="250" :src="productData.image" cover></v-img>

    <v-card-item>
      <v-card-title>{{ productData.name }}</v-card-title>
      <div>Price: ₹ {{ productData.price }}</div>

      <div>
        {{ productData.description }}
      </div>
    </v-card-item>
    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions>
      <v-btn
        v-if="props.isAdmin"
        color="deep-purple-lighten-2"
        variant="text"
        @click="$emit('delete', productData._id)"
      >
        Delete
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="props.isAdmin"
        color="deep-purple-lighten-2"
        variant="text"
        @click="$emit('edit', productData)"
      >
        Edit
      </v-btn>

      <v-btn
        v-else
        color="deep-purple-lighten-2"
        variant="text"
        @click="$emit('add', productData)"
      >
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
const loading = ref(false);
const props = defineProps({
  productData: {
    type: Object,
    default: {},
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["add", "delete", "edit"]);
</script>
