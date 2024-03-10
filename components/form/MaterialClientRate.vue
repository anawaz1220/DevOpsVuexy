<template>
  <div>
    <VCard>
        <v-row class="mb-3">
        <v-col cols="12" sm="6">
          <AppSelect
                  v-model="form.clientId"
                  label="Select Client"
                  placeholder="Select Client"
                  :rules="[requiredValidator]"
                  :items="clients"
                />
        </v-col>

        <v-col cols="12" sm="6">
          <AppTextField
          v-model="form.rate"
          label="Client Rate"
          placeholder=" slab weight"
          :rules="[requiredValidator]"
          />
        </v-col>
    </v-row>

       <div class="d-flex justify-end">
          <VCardActions>
            <VSpacer />
            <VBtn
              color="error"
              variant="outlined"
              @click="emits('closeDialog')"
            >
              Close
            </VBtn>
    
            <VBtn
              color="primary"
              variant="elevated"
              @click="addClientRate()"
              :loading="loading"
            >
              Submit
            </VBtn>
    
            <VSpacer />
          </VCardActions>
      </div>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from '@/store/client';
import { useMaterialsStore } from '@/store/material';

const props=defineProps({
  materialId:{type:String,default:""}
})
const emits=defineEmits(['closeDialog'])

const loading=ref(false)
const clientStore=useClientStore()
const materialStore =useMaterialsStore()
const form=ref({
  clientId:"",
  rate:''
}
)
const clients=computed(()=>{
  let arr:any=[]
  clientStore.allClients.forEach((client:any,index)=>{
    arr.push({
      title:client.name,
      value:client.id
    })
  })
  return arr
})

async function addClientRate(){
  loading.value=true
const [res,error]=await materialStore.addClientRate({
  materialId:props.materialId,
  clientId:form.value.clientId,
  rate:form.value.rate
})
  loading.value=false

if(!!res){
  emits('closeDialog')
}

}

onMounted(async()=>{
  await clientStore.fetchAllClients()
})
</script>

<style scoped>

</style>
