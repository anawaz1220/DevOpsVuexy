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
          <v-card-title class="mb-2"> UN APPROVED CONTACTS</v-card-title>
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
         
         
          <VBtn
            icon
            color="medium-emphasis"
            density="comfortable"
            variant="text"
          >
            <VIcon
              size="24"
              icon="tabler-dots-vertical"
            />
            <VMenu activator="parent">
              <VList>
                <VListItem>
                  <VListItemTitle>Approve</VListItemTitle>
                </VListItem>
                <VListItem link>
                  <VListItemTitle>Suspend</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
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
              <h4 class="mt-1">APPROVE/UNAPPROVE</h4>
             <v-avatar size="25" ><VIcon icon="tabler-x" color="error" @click="closeAssgRole"></VIcon></v-avatar>
          </div>
          <hr>
          <VIcon
              size="24"
              icon="tabler-dots-vertical"
            />
            <VMenu activator="parent">
              <VList>
                <VListItem>
                  <VListItemTitle>Approve</VListItemTitle>
                </VListItem>
                <VListItem link>
                  <VListItemTitle>UNAPPROVE</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
   
          </v-card-text>
    <div class="d-flex justify-end">
          <VCardActions>
            <VSpacer />
    
            <VBtn
              color="error"
              variant="outlined"
              @click="closeAssgRole"
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
    title: 'ID',
    sortable: false,
    key: 'id',
  },
  {
    title: 'NAME',
    key: 'name',
  },
  {
    title: 'CLIENT',
    key: 'client',
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
    client:'employee',
    contact:'03334737316',
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
