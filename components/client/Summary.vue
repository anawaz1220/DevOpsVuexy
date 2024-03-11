<template>
 
  <div>
    <p class="text-h3">Client Details</p>
    <v-row no-gutters>
      <v-col cols="12" sm="6" >
        <span class="text-h5">
        Name:
      </span>
       {{clientDetails?.name??""}}
      </v-col>
      <v-col cols="12" sm="6" >
        <span class="text-h5">
        Email:
      </span>
       {{clientDetails?.email??""}}
      </v-col>
    </v-row>
          
          <v-row>
    <v-col cols="12" sm="6" >
        <span class="text-h5">
        Contact:
      </span>
       {{clientDetails?.contact??""}}
      </v-col>
      <v-col cols="12" sm="6" >
        <span class="text-h5">
        Address:
      </span>
       {{clientDetails?.address??""}}
      </v-col>
          </v-row>

          <v-row>
      <v-col cols="12" sm="6" >
        <span class="text-h5">
        Contact:
      </span>
       {{clientDetails?.contact??""}}
      </v-col>
      <v-col cols="12" sm="6" >
        <span class="text-h5">
        City:
      </span>
       {{clientDetails?.city??""}}
      </v-col>
        </v-row>

   
          <v-row>
      <v-col cols="12" sm="6" >
        <span class="text-h5">
        User Type:
      </span>
       {{clientDetails?.user_type??""}}
      </v-col>
      <v-col cols="12" sm="6" >
        <span class="text-h5">
        Contact Person:
      </span>
       {{clientDetails?.contact_person??""}}
      </v-col>
        </v-row>

    
    <v-row>
      <v-col cols="12" sm="4" >
        <span class="text-h5">
          Verified:
        </span>
        <v-chip :color="clientDetails?.is_verified==true?'primary':'error'" variant="flat" >

          {{clientDetails?.is_verified==true?'Yes':'No'}}
    </v-chip>
    </v-col>
        </v-row>

        <!-- client accounts table   -->
        <p class="text-h4 mt-16 text-primary">Client Accounts</p>

        <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Title
        </th>
        <th class="text-left">
          Status
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
      :class="i % 2 != 0? 'bg-background ' : ''"
        v-for="item,i in clientAccounts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.status }}</td>
      </tr>
    </tbody>
  </v-table>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from '@/store/client';
import type { PropType } from 'vue';
const props=defineProps({
  clientId:{type:String as PropType<any>,default:""}
})
const route=useRoute()


const clientAccounts=[
  {
    name:"Alex",
    status:"Inactive"
  },
  {
    name:"Archie",
    status:"Inactive"
  },
  {
    name:"Noah",
    status:"Active"
  },
  {
    name:"Alex",
    status:"Inactive"
  },
  {
    name:"Archie",
    status:"Inactive"
  },
]

const clientStore=useClientStore()

const clientDetails:any=computed(()=>{
  return clientStore.clientSummary
})


onMounted(async()=>{
await clientStore.getClientSummary(props.clientId)
})
</script>

<style scoped>

</style>
