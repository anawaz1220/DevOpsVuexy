<script setup>
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import misc404 from '@images/pages/404.png'
import miscMaskDark from '@images/pages/misc-mask-dark.png'
import miscMaskLight from '@images/pages/misc-mask-light.png'
import { useRouter } from "vue-router"
const router = useRouter();
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})


const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)


defineOptions({
  inheritAttrs: false,
})

const isDev = process.dev

const errToShow = computed(() => {
  const is404 = props.error?.statusCode === 404 || props.error.message?.includes('404')

  if (is404) {
    return {
      title: 'Error',
      description: 'Please Login First to access all modules',
    }
  }

  else if (isDev) {
    return {
      title: props.error?.statusMessage,
      description: props.error.message,
    }
  }

  return {
    title: 'Oops! Something went wrong.',
    description: 'We are working on it and we\'ll get it fixed as soon as we can',
  }
})

const handleError = () => {
  router.push("/");
}
</script>

<template>
  <!-- <NuxtLayout> -->
    <div class="d-flex flex-column align-center">
      <ErrorHeader
        :status-code="props.error.statusCode"
        :title="errToShow.title"
        :description="errToShow.description"
      />
        
      <VBtn
        class="mb-12 cursor-pointer"
        @click="handleError"
      >
        Back to Login
      </VBtn>

      <!-- 👉 Image -->
      <div class="misc-avatar w-100 text-center">
        <VImg
          :src="misc404"
          alt="Coming Soon"
          :max-width="200"
          class="mx-auto"
        />
      </div>

      <VImg
        :src="authThemeMask"
        class="misc-footer-img d-none d-md-block"
      />
    </div>
  <!-- </NuxtLayout> -->
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
