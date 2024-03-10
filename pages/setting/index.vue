<template>
    <v-row>
        <v-col lg="4" md="4" sm="12" cols="12">

   
  <v-card class="px-3 py-3" >
    <c-card-text>
        <v-card-title>
          <h3 style="font-weight: 400; border-bottom: 1px solid black;" class="pb-2">Profile Settings</h3>
        </v-card-title>
        <v-tabs v-model="currentTab" direction="vertical"
          class="d-flex flex-column v-tabs-pill"  >
          <VTab
            v-for="tab in alltabs"
            :key="tab.id"
            :value="tab.id"
          >
            {{ tab?.title }}
          </VTab>
        </v-tabs>
       

    </c-card-text>
  </v-card>
</v-col>
<v-col lg="8" md="8" sm="12" cols="12">
    <v-card>
    <v-card-text>
        <span v-if="currentTab==1">
<password />
        </span>
        <span v-if="currentTab == 2">
   <hst />
        
</span>
    </v-card-text>
</v-card>

</v-col>


</v-row>

</template>
<script setup>
import { ref } from "vue";
const currentTab = ref(1)
const alltabs = ([
    {
        id:'1',
        title:'password'
    },
    {
        id:'2',
        title:'Surcharge/HST'
    },
    {
        id:'3',
        title:'Ticket Issue'
    }

])
watch(updTab);

function updTab() {
  currentTab.value = 1;
}
</script>
