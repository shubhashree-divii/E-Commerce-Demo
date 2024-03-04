<!-- layouts/AppBar.vue -->
<template>
  <v-main class="bg-grey-lighten-2">
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          color="deep-purple-lighten-2"
          class="mt-2"
          @click="isActive = !isActive"
        >
          Add Product
        </v-btn>

        <template
          v-for="(item, index) in Object.keys(categoryList)"
          :key="index"
        >
          <v-col class="mt-2" cols="12">
            <strong>{{ item }}</strong>
          </v-col>

          <v-col v-for="product in categoryList[item]">
            <ProductCard
              :productData="product"
              :isAdmin="true"
              @add="getProducts"
              @delete="deleteProduct"
              @edit="editProduct"
            />
          </v-col>
        </template>
      </v-row>
      <ProductModal
        v-model="isActive"
        :productData="editProductData"
        @close="
          isActive = false;
          editProductData = {};
        "
      />
    </v-container>
  </v-main>
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Product } from "@/services/Product";
import { Cart } from "@/services/Cart";
import ProductCard from "@/components/ProductCard.vue";
import ProductModal from "@/components/ProductModal.vue";
import LoaderVue from "@/components/LoaderVue.vue";
import Toast from "@/alert/alert";

const ProductService = new Product();
const CartService = new Cart();
const productList = ref([]);
const categoryList = ref({});
const editProductData = ref({});
const isActive = ref(false);
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

const deleteProduct = async (value) => {
  try {
    loaderState.value = true;
    const res = await ProductService.deleteProduct(value);
    if (res.status == 200) {
      Toast.fire({ title: "Product deleted Successfully." });
      getProducts();
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const editProduct = (value) => {
  isActive.value = true;
  editProductData.value = value;
};
// const addProducts = async () => {
//   try {
//     loaderState.value = true;
//     let data = {
//       name: "Changed 2 ",
//       description: "Test description",
//       price: 10,
//       category: "tester",
//     };
//     const res = await ProductService.addProducts(data);
//     if (res.data) {
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     loaderState.value = false;
//   }
// };

onMounted(() => {
  getProducts();
});
</script>
