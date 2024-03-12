<template>
  <v-btn
  v-if="isAllowed"
    :prepend-icon="prependIcon"
    :append-icon="AppendIcon"
    :icon="icon"
    :stacked="stacked"
    :color="color"
    :variant="variant"
    :block="block"
    :size="size"
    :loading="loading"
    :rounded="rounded"
    :disabled="disabled"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store/login';
const loginStore =useLoginStore()

const isAllowed=ref(false)

const permissions=computed(()=>{
  return loginStore.permissions
})

type variant = "outlined" | "tonal" | "text" | "plain" | "elevated" | "flat";

const props = defineProps({
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  block: { type: Boolean, default: false },
  size: { type: String as PropType<any | variant>, default: "default" },
  icon: { type: Object as PropType<any>, default: false },
  prependIcon: { type: Object as PropType<any>, default: "" },
  AppendIcon: { type: Object as PropType<any>, default: "" },
  variant: { type: String as PropType<any | variant>, default: "elevated" },
  color: { type: String, default: "primary" },
  stacked: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  prefix: { type: String, default: "" },
  sufix: { type: String, default: "" },
  rounded: { type: String, default: "xs" },
  requiredPermission:{type:String, default:"" },
  disabled:{type:Boolean,default:false}
});

onMounted(()=>{
  if(!!!props.requiredPermission) return isAllowed.value=true
  
  if(permissions.value?.includes(props.requiredPermission)){
    isAllowed.value=true
  }
})
</script>

<style scoped></style>
