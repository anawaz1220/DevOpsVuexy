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
            <h3 class="mt-3">ALL  LOCATIONS</h3>
            <div class="d-flex gap-3"><v-btn @click="openAddlocation">ADD LOCATION</v-btn>
              <v-btn @click="openAddcategory">ADD CATEGORY</v-btn>
            </div>
            
          </div>
          <div class="d-flex justify-space-between flex-wrap ">
          <span class="d-flex gap-3 ">
            <AppSelect
          :items="items"  
          style="inline-size: 7rem;" 
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
        <!-- ==================== -->
         <!--add location dialog   -->
        <VDialog
        v-model="Addlocation"
        max-width="500px"
      >
        <VCard>
          <v-card-text>
          <div class="d-flex justify-space-between mb-3">
              <h4 class="mt-1">ADD LOCATION</h4>
             <v-avatar size="25" ><VIcon icon="tabler-x" color="error" @click="closeAddlocation"></VIcon></v-avatar>
          </div>
          <hr>
              <AppSelect
              class="mt-3"
      :items="edit"
      label="SELECT CATEGORY *"
      placeholder="GFL"
      :rules="[requiredValidator]"

    />
    <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
      <AppTextField
      label="NAME *"
      placeholder="name"
      :rules="[requiredValidator]"

    />
    <AppTextField
      label="ADDRESS *"
      placeholder="address"
      :rules="[requiredValidator]"

    />
    </div>
    <AppTextarea
    class="mt-3"
    v-model="textareaValue"
    clearable
    clear-icon="tabler-circle-x"
    label="ADDRESS *"
    placeholder="address"
    :rules="[requiredValidator]"

  />
          </v-card-text>
    <div class="d-flex justify-end">
          <VCardActions class="mb-3">
            <VSpacer />
    
            <VBtn
              color="error"
              variant="outlined"
              @click="closeAddlocation"
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
      <!-- ================== -->
      <!-- add category dialog -->
      <VDialog
        v-model="Addcategory"
        max-width="500px"
      >
        <VCard>
          <v-card-text>
          <div class="d-flex justify-space-between mb-3">
              <h4 class="mt-1">ADD CATEGORY</h4>
             <v-avatar size="25" ><VIcon icon="tabler-x" color="error" @click="closeAddcategory"></VIcon></v-avatar>
          </div>
          <hr>
              
    
      <AppTextField
      class="mt-3"
      label="NAME *"
      placeholder="name"
      :rules="[requiredValidator]"

    />
          </v-card-text>
    <div class="d-flex justify-end">
          <VCardActions class="mb-3">
            <VSpacer />
    
            <VBtn
              color="error"
              variant="outlined"
              @click="closeAddcategory"
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
// definePageMeta({
//   middleware: 'auth'
// })
// breadcrumbs
const BreadcrumbsData = [
  {
    title: "Dashboard",
    disabled: false,
    link: "/",
  },
  {
    title: "Outbound Locations",
    disabled: true,
    link: "/OutBoundsLocation",
  },
];
import { useMaterialsStore } from "@/store/material";
const mStore = useMaterialsStore();
async function getMaterials(){
    mStore.fetchAllMaterials()
}
// getMaterials()
import { VDataTable } from 'vuetify/labs/VDataTable';
  // import data from '@/views/demos/forms/tables/data-table/datatable'
  // actions
  const textareaValue = ref('This is clearable text.')
  // add location dialog 
  const Addlocation = ref(false)
const  openAddlocation =( ) => {
  Addlocation.value = true;
}
const closeAddlocation = () => {
  Addlocation.value = false;
}
// add category dialog
const Addcategory = ref(false)
const  openAddcategory =( ) => {
  Addcategory.value = true;
}
const closeAddcategory = () => {
  Addcategory.value = false;
}

  // paginatioin
  const currentPage = ref(1)
  
  const headers = [
    {
      title: '#',
      sortable: false,
      key: 'id',
    },
    {
      title: 'CATEGORY',
      key: 'category',
    },
    {
      title: 'NAME',
      key: 'name',
    },
    {
      title: 'ADDRESS',
      key: 'address',
    },
    
    {
      title: 'CONTACT',
      key: 'contact',
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
