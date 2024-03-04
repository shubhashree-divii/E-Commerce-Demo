<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <v-img height="250" :src="cartData.details.image" cover></v-img>

    <v-card-item>
      <v-card-title>{{ cartData.details.name }}</v-card-title>
      <div>Price: ₹ {{ cartData.details.price }}</div>

      <div>Quantity: {{ cartData.quantity }}</div>
    </v-card-item>
    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        variant="text"
        @click="deleteCart(cartData)"
      >
        Remove From Cart
      </v-btn>
      <v-spacer></v-spacer>
      <div>Total: ₹ {{ cartData.details.price * cartData.quantity }}</div>
    </v-card-actions>
  </v-card>
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Cart } from "@/services/Cart";
import LoaderVue from "@/components/LoaderVue.vue";
import Toast from "@/alert/alert";
const loading = ref(false);
const loaderState = ref(false);
const props = defineProps({
  cartData: {
    type: Object,
    default: {},
  },
});
const CartService = new Cart();
const emit = defineEmits(["delete"]);

const deleteCart = async (item) => {
  try {
    let data = {
      productId: item.productId,
    };
    loaderState.value = true;
    const res = await CartService.removeFromCart(data);
    if (res.status == 200) {
      Toast.fire({ title: "Delete from Cart" });
      emit("delete");
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
</script>
