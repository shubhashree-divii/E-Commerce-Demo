<template>
  <div class="pa-4 text-center">
    <v-btn @click="isActive = true">Login</v-btn>
    <v-dialog width="50%" scrollable v-model="isActive">
      <template v-slot:default="{ isActive }">
        <v-card title="Login">
          <v-divider class="mt-3"></v-divider>

          <v-card-text>
            <v-form fast-fail @submit.prevent>
              <v-text-field
                v-model="userName"
                label="Enter User Name"
              ></v-text-field>

              <v-text-field
                v-model="password"
                type="password"
                label="Enter Password"
              ></v-text-field>

              <v-btn class="mt-2" type="submit" block @click="login"
                >Login</v-btn
              >
              <v-btn class="mt-2" type="submit" block>Sign Up</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
    <LoaderVue :loading="loaderState" />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Auth } from "@/services/Auth";
import LoaderVue from "@/components/LoaderVue.vue";
import Toast from "@/alert/alert";

const isActive = ref(false);
const userName = ref("");
const password = ref("");
const loaderState = ref(false);
const AuthService = new Auth();

const login = async () => {
  try {
    loaderState.value = true;
    let data = {
      email: userName.value,
      password: password.value,
    };
    const res = await AuthService.login(data);
    if (res.status == 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      console.log("true");
      Toast.fire({ title: res });
      isActive.value = false;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
</script>
