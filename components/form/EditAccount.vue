<template>
  <div>
    <v-row>
    <v-col cols="12" sm="6">
  <AppSelect 
  v-model="status"
  :items="statusList"
  label="SELECT CLIENT*"
  placeholder="The Renovator" />
    </v-col>

<v-col cols="12" sm="6">
  <AppTextField
  label="Account Title"
  placeholder="Enter Account Title"
  v-model="title"
  />
</v-col>
    </v-row>

    <div class="d-flex justify-end mt-8">
          <VCardActions>
            <VSpacer />
            <VBtn
              color="error"
              variant="outlined"
              @click="closeDialog()"
            >
              close
            </VBtn>
            <VBtn
              color="primary"
              variant="elevated"
              :loading="loading"
              @click="updateAccount()"
            >
              submit
            </VBtn>
            <VSpacer />
          </VCardActions>
        </div>

  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/store/account';
const accoutStore=useAccountStore()
const props=defineProps({
  accountToEdit:{type:Object,default:null}
})
const emits=defineEmits(['closeDialog'])

const loading=ref(false)
const title=ref('')
const status=ref(true)
const statusList=[
    {
     title:'Active',
     value:true
    },
    {
     title:'InActive',
     value:false

  }
]


function closeDialog(){
  emits('closeDialog')
}

async function  updateAccount(){
  let item=props.accountToEdit
  loading.value=true
  await accoutStore.updateAccount(item.id,{title:title.value,isActive:status.value})
  loading.value=false
  await accoutStore.fetchAllAccounts()
  closeDialog()
}

watch(()=>
props.accountToEdit,
(newValue:any,oldValue)=>{
if(!!!newValue)return 
title.value=newValue.title
},
{deep:true,immediate:true}
)
</script>

<style scoped>

</style>
