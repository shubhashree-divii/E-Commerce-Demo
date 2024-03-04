<!-- layouts/AppBar.vue -->
<template>
  <v-main class="bg-grey-lighten-2">
    <v-container>
      <v-row>
        <template v-for="(item, index) in cartProducts" :key="index">
          <v-col class="mt-2" cols="12"> </v-col>

          <v-col>
            <CartCard :cartData="item" @delete="getCart" />
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-main>
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import LoaderVue from "@/components/LoaderVue.vue";
//   import { Product } from "@/services/Product";
import { Cart } from "@/services/Cart";
import CartCard from "@/components/CartCard.vue";
import { Product } from "@/services/Product";

//   const ProductService = new Product();
const CartService = new Cart();
const ProductService = new Product();
const cartList = ref([]);
const productList = ref([]);
const loaderState = ref(false);

const getCart = async () => {
  try {
    loaderState.value = true;
    const res = await CartService.getCart();
    if (res.status == 200) {
      cartList.value = res.data.products;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const cartProducts = computed(() => {
  return cartList.value.map((item) => {
    item.details = productList.value.find((product) => {
      return item.productId == product._id;
    });
    return item;
  });
});
const getProducts = async () => {
  try {
    loaderState.value = true;
    const res = await ProductService.getProducts();
    if (res.data) {
      productList.value = res.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
onMounted(() => {
  getCart();
  getProducts();
});
</script>
