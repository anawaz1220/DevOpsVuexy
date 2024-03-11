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
          <div class=" py-5 d-flex justify-end">
            
            <InputBtn :requiredPermission="'add_employee'" @click="openAssgRole">Create Employee</InputBtn>
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
         
            <InputBtn 
            icon
             :color="'transparent'"
              :requiredPermission="'update_employee'"
               :variant="'flat'"
                 @click="openAssgRole"
                 >
                <VIcon icon="tabler-edit" />
            </InputBtn>
         
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
        <!-- =================== -->
        <!-- assign role dialog -->
        <VDialog
        v-model="AssgRole"
        max-width="500px"
      >
        <VCard>
          <v-card-text>
          <div class="d-flex justify-space-between mb-3">
              <h4 class="mt-1">ASSIGN ROLE</h4>
             <v-avatar size="25" ><VIcon icon="tabler-x" color="error" @click="closeAssgRole"></VIcon></v-avatar>
          </div>
          <hr>
              <AppSelect
              class="mt-3"
      :items="edit"
      label="SELECT ROLE *"
      placeholder=""
      :rules="[requiredValidator]"

    />
   
          </v-card-text>
    <div class="d-flex justify-end">
          <VCardActions>
            <VSpacer />
    
            <InputBtn
              :color="'error'"
              :variant="'outlined'"
              @click="closeAssgRole"
            >
              Close
            </InputBtn>
    
            <InputBtn
              :variant="'elevated'"
              @click="deleteItemConfirm"
            >
              Submit
            </InputBtn>
    
            <VSpacer />
          </VCardActions>
      </div>
        </VCard>
      </VDialog>
</template>
<script setup>
import InputBtn from "@/components/Input/Btn.vue"
import { VDataTable } from 'vuetify/labs/VDataTable';
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
    title: "View Employees",
    disabled: true,
    link: "/employees",
  },
];
const headers = [
  {
    title: '#',
    sortable: false,
    key: 'id',
  },
  {
    title: 'NAME',
    key: 'name',
  },
  {
    title: 'ROLE',
    key: 'role',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'CONTACT',
    key: 'contact',
  },
  {
    title: 'ACTION',
    key: 'actions',
  },
 
]

const data = [
  {
    id:'1',
    name:'Jhon Doe',
    role:'employee',
    contact:'033342323416',
    email:'jhon@gmail.com'


  }
]

const AssgRole = ref(false)
const openAssgRole = () =>{
  AssgRole.value = true
}
const closeAssgRole = () =>{
  AssgRole.value = false
}

const edit = [
  'admin',
  'client',
  'super_admin'
]

</script>
