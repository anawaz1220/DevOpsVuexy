<template>
 
  <div class="px-sm-4" v-if="!!clientDetails">
    <v-row >
      <v-col cols="12" sm="6" >
       <AppTextField
       disabled
       v-model="clientDetails.name"
       label="Name"
       />
      </v-col>
      <v-col cols="12" sm="6" >
        <AppTextField
       disabled
       v-model="clientDetails.email"
       label="Email"
       />
      </v-col>
    </v-row>
          
          <v-row>
    <v-col cols="12" sm="6" >
       <AppTextField
       disabled
       v-model="clientDetails.contact"
       label="Contact"
       />
      </v-col>
      <v-col cols="12" sm="6" >
        <AppTextField
       disabled
       v-model="clientDetails.address"
       label="Address"
       />
      </v-col>
          </v-row>

          <v-row>
      <v-col cols="12" sm="6" >
        <AppTextField
       disabled
       v-model="clientDetails.contact"
       label="Contact"
       />
      </v-col>
      <v-col cols="12" sm="6" >
        <AppTextField
       disabled
       v-model="clientDetails.city"
       label="City"
       />
      </v-col>
        </v-row>

   
          <v-row>
      <v-col cols="12" sm="6" >
       <AppTextField
       disabled
       v-model="clientDetails.user_type"
       label="User Type"
       />
      </v-col>
      <v-col cols="12" sm="6" >
        <AppTextField
       disabled
       v-model="clientDetails.contact_person"
       label="Contact Person"
       />
      </v-col>
        </v-row>

    
    <v-row>
      <v-col cols="12" sm="4" >
        <span class="text-h5">
          Verified:
        </span>
        <v-chip class="ml-2 " :color="clientDetails?.is_verified==true?'primary':'error'" variant="flat" >
          {{clientDetails?.is_verified==true?'yes ✅':'No ❌'}}
    </v-chip>
    </v-col>
        </v-row>

        <!-- client accounts table   -->
        <p class="text-h4 mt-16 text-primary">Client Accounts</p>

        <v-table>
    <thead>
      <tr>
        <th class="text-left text-h4">
          #
        </th>
        <th class="text-left text-h4">
          Title
        </th>
        <th class="text-left text-h4">
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
        <td>{{i+1}}</td>
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
