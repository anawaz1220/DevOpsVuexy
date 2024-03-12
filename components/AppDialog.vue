<template>
<VDialog :max-width="maxWidth" :width="width" v-model="input">
<VCard class="px-5 py-5">
  <div class="d-flex justify-space-between mb-3">
          <VCardTitle> {{label}} </VCardTitle>
          <VAvatar rounded="lg"><VIcon
            icon="tabler-x"
            color="error"
            @click="input=false"
          /></VAvatar>
        </div>
        <hr class="mb-6">

  <slot />
  
</VCard>
</VDialog>
</template>

<script setup lang="ts">

const props=defineProps({
  modelvalue:{type:Boolean,default:false},
  width:{type:String,default:''},
  maxWidth:{type:String,default:''},
  label:{type:String,default:''}
})

const emits=defineEmits(['closeDialog','update:modelValue'])

const input=computed({
  get(){
    return props.modelvalue
  },
  set(value){emits('update:modelValue',value)},
})

</script>

<style scoped>

</style>
