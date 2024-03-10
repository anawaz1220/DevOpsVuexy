<template>
    <div class="bread-crumb d-flex justify-end">
        <v-breadcrumbs :items="BreadcrumbsData">
          <template v-slot:title="{ item }">
            <router-link :to="item?.link">
              {{ item.title }}
            </router-link>
          </template>
          <template v-slot:prepend>
            <v-icon icon="tabler-home"></v-icon>
          </template>
          <template v-slot:divider>
            <v-icon icon="tabler-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
      </div>
      <VCard>
        <v-card-text>
          <div class=" py-5 d-flex justify-space-between flex-wrap">
            <h3 class="mt-2">ALL MATERIAL RATES</h3>
            <v-btn @click="openAddRates">Add Material Rate</v-btn>
          </div>
          <div class="d-flex justify-space-between flex-wrap ">
          <span class="d-flex gap-3 ">
            <AppSelect
          :items="items"  
          style="inline-size: 7rem;" 
        :rules="[requiredValidator]"

        />
          </span >
            <span class="search">
              <AppTextField
        style="inline-size: 15rem;"
          placeholder="Search here"
          append-inner-icon="tabler-search"
        />
            </span>
        </div>
          <VDataTable :headers="headers" :items="data" class="mt-3">
            <!-- removing default paginatiions -->
            <template #bottom>
            
          </template>
          <!-- =========== -->
           <!-- Actions -->
        <template #item.actions="{ item }">
         
            <IconBtn @click="openEditDialog">
                <VIcon icon="tabler-edit" />
            </IconBtn>
         
        </template>
          </VDataTable>
          <!-- pagination -->
          <div class="d-flex justify-end mt-4">
          <VPagination
          v-model="currentPage"
          :length="5"
          rounded="circle"
        />
      </div>
        </v-card-text>
        </VCard> 
<!-- dialog -->

        <VDialog
        v-model="AddRates"
        max-width="500px"
      >
        <VCard>
          <v-card-text>
          <div class="d-flex justify-space-between mb-3">
              <h4 class="mt-1">ADD MATERIAL RATES</h4>
             <v-avatar size="25" ><VIcon icon="tabler-x" color="error" @click="closeAddRates"></VIcon></v-avatar>
          </div>
          <hr>
             
    <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
      <AppTextField
      label="SELECT MATERIAL *"
      placeholder="select material"
      :rules="[requiredValidator]"

    />
    <AppTextField
      label=" SELECT ACCOUNT  *"
      placeholder="Select acc"
      :rules="[requiredValidator]"

    />
    </div>
    <AppTextField
    class="mt-3"
      label=" RATE  *"
      placeholder="rate"
      :rules="[requiredValidator]"

    />
          </v-card-text>
    <div class="d-flex justify-end">
          <VCardActions>
            <VSpacer />
    
            <VBtn
              color="error"
              variant="outlined"
              @click="closeAddRates"
            >
              Close
            </VBtn>
    
            <VBtn
              color="primary"
              variant="elevated"
              @click="deleteItemConfirm"
            >
              Submit
            </VBtn>
    
            <VSpacer />
          </VCardActions>
      </div>
        </VCard>
      </VDialog>
</template>
<script setup>
// breadcrumbs
const BreadcrumbsData = [
  {
    title: "Dashboard",
    disabled: false,
    link: "/",
  },
  {
    title: "View Materials Rates",
    disabled: true,
    link: "/ViewMaterialRates",
  },
];
import { useMaterialsStore } from "@/store/material";
const mStore = useMaterialsStore();
async function getMaterials(){
    mStore.fetchAllMaterials()
}
// definePageMeta({
//   middleware: 'auth'
// })
// getMaterials()
import { VDataTable } from 'vuetify/labs/VDataTable';
  // import data from '@/views/demos/forms/tables/data-table/datatable'
  // actions
  const AddRates = ref(false)
const  openAddRates =( ) => {
  AddRates.value = true;
}
const closeAddRates = () => {
  AddRates.value = false;
}
  // paginatioin
  const currentPage = ref(1)
  
  const headers = [
    {
      title: 'ID',
      sortable: false,
      key: 'id',
    },
    {
      title: 'Materials',
      key: 'fullName',
    },
    {
      title: 'ACCOUNT',
      key: 'accountNo',
    },
    {
      title: ' RATE',
      key: 'email',
    },
    
    
    {
      title: 'Actions',
      key: 'actions',
    },
  ]
 
  const data = [
      {
          id:'1',
          fullName:"Jhon Doe",
          accountNo:'123457',
          email:'jhon@gmail.com',
          contact:'03334234234',
  
  
      }
  ]
  
  // small select betwenn show and entries
  const items = [
    'Foo',
    'Bar',
    'Fizz',
    'Buzz',
  ]
//   edit dialog select
const edit = ['Foo', 'Bar', 'Fizz', 'Buzz']
</script>
