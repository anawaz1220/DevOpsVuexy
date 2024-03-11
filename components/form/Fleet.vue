<template>
  <div>
       <VCard class="px-5 py-5">
        <div class="d-flex justify-space-between mb-3">
          <VCardTitle> EDIT TRUCK INFO </VCardTitle>
          <VAvatar rounded="lg"><VIcon
            icon="tabler-x"
            color="error"
            @click="closeTruckInfo"
          /></VAvatar>
        </div>
        <hr>
        
        <AppSelect
        v-if="!!!updateData?.id"
          v-model="clientId"
          class="mt-3"
          :items="getClients"
          label="SELECT CLIENT*"
          placeholder="The Renovator"
          item-title="name"
          item-value="id"
          return-object
        :rules="[requiredValidator]"
        />

        <!-- plate num and company -->
        <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
          <AppTextField
            v-model="truckPlateNo"
            label=" PLATE NUM*"
            placeholder=" plate num"
        :rules="[requiredValidator]"

          />
          <AppTextField
            v-model="truckCompany"
            label="COMPANY*"
            placeholder="company"
        :rules="[requiredValidator]"

          />
        </div>
        <!-- model  and color -->
        <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
          <AppTextField
            v-model="truckModel"
            label=" MODEL*"
            placeholder=" model"
        :rules="[requiredValidator]"

          />
          <AppTextField
            v-model="truckColor"
            label="COLOR"
            placeholder="color"

          />
        </div>
        <!-- Tare weight  and vin num -->
        <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
          <AppTextField
            v-model="truckWeight"
            label=" TARE WEIGHT*"
            placeholder="0"
        :rules="[requiredValidator]"

          />
          <AppTextField
            v-model="truckVin"
            label="VIN NUM"
            placeholder="vin num"
          />
        </div>
        <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
          <AppTextField
            v-model="truckUnit"
            label="UNIT"
            placeholder="unit"
          />
          <AppTextField
            v-model="truckDescription"
            label="DESCRIPTION"
            placeholder="Truck Description"
          />
        </div>
        <div class="d-flex justify-end mt-4">
          <VCardActions>
            <VSpacer />
            <VBtn
              color="error"
              variant="outlined"
              @click="closeTruckInfo"
            >
              close
            </VBtn>
            <VBtn
              color="primary"
              variant="elevated"
              :loading="loading"
              @click="saveTruckinfo()"
            >
              submit
            </VBtn>
            <VSpacer />
          </VCardActions>
        </div>
      </VCard>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from "@/store/client";
import { useTruckStore } from "@/store/truck";

const props=defineProps({
  truckId:{type:String,default:''},
  clientId:{type:String,default:''}
})
const emits=defineEmits(['closeDialog'])

const cStore=useClientStore()
const tStore = useTruckStore()

const truckPlateNo = ref(null)
const truckCompany = ref(null)
const truckColor = ref(null)
const truckModel = ref(null)
const truckUnit = ref('KG')
const truckWeight:any = ref(null)
const truckVin = ref(null)
const truckDescription = ref(null)
const clientId = ref()
const loading=ref(false)
const getClients = computed(() => {
  // const clientNames = cStore.allClients.map(client => client.name);
  // console.log(clientNames);
  return cStore.allClients
  
  // return cStore.allClients;
})

const closeTruckInfo = () => {
  emits('closeDialog')
}

const updateData:any = computed(() =>{
  return tStore.TruckUpdate;
})

// edit truck
async function saveTruckinfo() {
  loading.value=true
  truckWeight.value = parseFloat(truckWeight.value)

  let payload = {
    client_id: clientId.value?.id??'',
    plate_no: truckPlateNo.value,
    model: truckModel.value,
    color: truckColor.value,
    company: truckCompany.value,
    vin_no: truckVin.value,
    tare_weight: truckWeight.value,
    unit: truckUnit.value,
    description: truckDescription.value,
  }
  console.log("sadfa",updateData.value?.id)
if(updateData.value?.id){
  delete payload.client_id
  await tStore.updateTruck(payload,updateData.value?.id)
}else{
    await tStore.FetchAddNewTruck(payload)
}

  emits('closeDialog')
  loading.value=false
  await tStore.fetchAllTrucks()
  await cStore.fetchAllClients()

}


watch(updateValues, updateData.value)
function updateValues(){
truckPlateNo.value = updateData.value?.plate_no;
truckCompany.value =updateData.value?.company;
truckModel.value = updateData.value?.model;
truckColor.value = updateData.value?.color;
truckWeight.value =updateData.value?.tare_weight;
truckVin.value = updateData.value?.vin_no;
truckUnit.value = updateData.value?.unit;
truckDescription.value = updateData.value?.description
}
</script>

<style scoped>

</style>
