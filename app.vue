<script setup>
import { useLoginStore } from "@/store/login"
import ScrollToTop from '@core/components/ScrollToTop.vue'
import initCore from '@core/initCore'
import {
  initConfigStore,
  useConfigStore,
} from '@core/stores/config'
import { hexToRgb } from '@layouts/utils'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
const lStore = useLoginStore()
// async function getUser(){
// }

// watch(getUser)
const router = useRouter()
const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()

const configStore = useConfigStore()

const { isMobile } = useDevice()

if (isMobile)
configStore.appContentLayoutNav = 'vertical'
// intercepter

onMounted(async()=>{
  await lStore.fetchLoggedInUser()

})
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <NuxtLayout >
        <NuxtPage />
        <NuxtLoadingIndicator color="rgb(var(--v-theme-primary))" />
      </NuxtLayout>

      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
