<template>
  <div class="pa-4 text-center">
    <v-dialog width="50%" scrollable v-model="customerComponentModel">
      <template v-slot:default="{ customerComponentModel }">
        <v-card :title="productData._id ? 'Edit Product' : 'Add Product'">
          <v-divider class="mt-3"></v-divider>

          <v-card-text>
            <v-form fast-fail @submit.prevent>
              <v-text-field
                v-model="name"
                label="Enter Product Name"
              ></v-text-field>

              <v-text-field
                v-model="description"
                type="text"
                label="Enter description"
              ></v-text-field>

              <v-text-field
                v-model="price"
                type="text"
                label="Enter price"
              ></v-text-field>

              <v-text-field
                v-model="category"
                type="text"
                label="Enter category"
              ></v-text-field>

              <v-text-field
                v-model="image"
                type="text"
                label="Enter Image"
              ></v-text-field>

              <v-btn
                class="mt-2"
                type="submit"
                block
                @click="productData._id ? editProducts() : addProducts()"
                >{{ productData._id ? "Edit" : "Add" }}</v-btn
              >

              <v-btn class="mt-2" @click="$emit('close')" block>Cancel</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Product } from "@/services/Product";
import { onUpdated } from "vue";
import LoaderVue from "@/components/LoaderVue.vue";
import Toast from "@/alert/alert";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  productData: {
    type: Object,
    default: {},
  },
});
// const emit = defineEmits()
const emit = defineEmits(["update:modelValue", "add", "close"]);
const customerComponentModel = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    console.log(value);
    emit("update:modelValue", {
      value,
    });
  },
});

// const isActive = ref(false);
const name = ref("");
const description = ref("");
const price = ref("");
const category = ref("");
const image = ref("");
const loaderState = ref(false);
const ProductService = new Product();

const addProducts = async () => {
  try {
    loaderState.value = true;
    let data = {
      name: name.value,
      description: description.value,
      price: price.value,
      category: category.value,
      image: image.value,
    };
    const res = await ProductService.addProducts(data);
    if (res.status == 201) {
      Toast.fire({ title: "Product added Successfully." });
      emit("update:modelValue", false);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const editProducts = async () => {
  try {
    loaderState.value = true;
    let data = {
      name: name.value,
      description: description.value,
      price: price.value,
      category: category.value,
      image: image.value,
    };

    const res = await ProductService.editProducts({
      id: props.productData._id,
      payload: data,
    });
    if (res.status == 200) {
      Toast.fire({ title: "Product updated Successfully." });
      emit("close");
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
onUpdated(() => {
  if (props.productData) {
    name.value = props.productData.name;
    description.value = props.productData.description;
    price.value = props.productData.price;
    category.value = props.productData.category;
    image.value = props.productData.image;
  }
});
</script>
