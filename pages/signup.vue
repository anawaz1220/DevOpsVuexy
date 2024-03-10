<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol md="8" class="d-none d-md-flex">
      <div class="position-relative  rounded-lg w-100 ma-8 me-0">
        <!-- <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div> -->

        <VImg class="auth-footer-mask" :src="image" />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <!-- <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" /> -->

          <h4 class="text-h4 mb-1">
            Welcome to
            <span class="text-capitalize">{{ themeConfig.app.title }}</span
            >! 👋🏻
          </h4>

          <p class="mb-0">Please create your account and start the adventure</p>
         
        </VCardText>
        <VCardText>
          <VForm ref="refForm" @submit.prevent="userSignup">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  append-inner-icon="tabler-mail"
                  autofocus
                  label="Email"
                  type="email"
                  placeholder="email"
                  :rules="[emailValidator]"
                />
              </VCol>
              <!-- full name -->
              <VCol cols="12">
                <AppTextField
                  v-model="name"
                  autofocus
                  append-inner-icon="tabler-user"
                  label="Full Name"
                  type="text"
                  placeholder="Full Name"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  :rules="[passwordValidator]"
                />
                
                  <AppSelect
                  class="mt-6"
                    v-model="usertype"
                    :items="items"
                    label="USER-TYPE"
                    placeholder="Select Type"
                    :rules="[requiredValidator]"
                  />
                
                <!-- <VCol cols="12">
                  {{ selectedRole }}
                  <AppSelect
                  v-model="selectedRole"
                    :items="roles"
                    label="ROLES"
                    placeholder="Select your Role"
                    @change="handleRoleSelect"
                  />
                </VCol> -->

                <VBtn class="mt-7" block type="submit" :disabled="lStore.userLoading" :loading="lStore.userLoading"> Register </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center text-base">
                <span>Already have an account</span>

                <a class="text-primary ms-2" href="/"> LogIn </a>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />

                <!-- <span class="mx-4">or</span> -->

                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
<script setup>
import image from '@/assets/images/signup-img.png';
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png";
import authV2MaskDark from "@images/pages/misc-mask-dark.png";
import authV2MaskLight from "@images/pages/misc-mask-light.png";
import { themeConfig } from "@themeConfig";
// import logo from "@/assets/images/favicon.ico";
import { useLoginStore } from "@/store/login";
import { useRouter } from 'vue-router';
const router = useRouter();
definePageMeta({
  layout: "blank",
});
const isPasswordVisible = ref(false)
const selectedRole =ref("")
  const name=ref("")
  const email =ref("")
  const password =ref("")
  const role =ref([])
  const refForm =ref('')
  const usertype = ref("")
  const handleRoleSelect = (item) => {
    console.log("selected role", item);
    role.value.push(item);
};
// const lStore = useLoginStore()
const items = ["Client", "Employee", "Contact_person"];
const roles = ["admin", "admin"];
const lStore = useLoginStore()
const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
// api call registering user
async function userSignup() {
  await refForm.value?.validate();

if (refForm?.value?.errors?.length) {
  console.log ('error@172')
  return;
}
  console.log(email.value, name.value, password.value, usertype.value, 'signup');
  const payload = {
    email: email.value,
    name: name.value,
    password: password.value,
    user_type: usertype.value,
    // roles: role.value
  };

  await lStore.registerUser(payload);
}


</script>
<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
