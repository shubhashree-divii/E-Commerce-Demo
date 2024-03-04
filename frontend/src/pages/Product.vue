<!-- layouts/AppBar.vue -->
<template>
  <v-main class="bg-grey-lighten-2">
    <v-container>
      <v-row>
        <template
          v-for="(item, index) in Object.keys(categoryList)"
          :key="index"
        >
          <v-col class="mt-2" cols="12">
            <strong>{{ item }}</strong>
          </v-col>

          <v-col v-for="product in categoryList[item]">
            <ProductCard :productData="product" @add="addToCart" />
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-main>
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Product } from "@/services/Product";
import { Cart } from "@/services/Cart";
import ProductCard from "@/components/ProductCard.vue";
import LoaderVue from "@/components/LoaderVue.vue";
import Toast from "@/alert/alert";

const ProductService = new Product();
const CartService = new Cart();
const productList = ref([]);
const categoryList = ref({});
const loaderState = ref(false);

const getProducts = async () => {
  try {
    loaderState.value = true;
    const res = await ProductService.getProducts();
    if (res.data) {
      productList.value = res.data;
      categoryList.value = productList.value.reduce((final, current) => {
        if (final.hasOwnProperty(current.category)) {
          final[current.category].push(current);
        } else {
          final[current.category] = [current];
        }
        return final;
      }, {});
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const addToCart = async (value) => {
  try {
    let data = {
      productId: value._id,
      quantity: 1,
    };
    loaderState.value = true;
    const res = await CartService.addCart(data);
    if (res.data) {
      Toast.fire({ title: "Product added to Cart." });
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
onMounted(() => {
  getProducts();
});
</script>
