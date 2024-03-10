<template>
  <div class="d-flex justify-center" v-if="clientStore.LoadingData">
<v-progress-circular indeterminate size="50"></v-progress-circular>
  </div>
   <span v-else>
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
      <div class=" py-5">
        <h3>ALL UNAPPROVED CLIENTS</h3>
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
          v-model="search"
    style="inline-size: 15rem;"
      placeholder="Search here"
      append-inner-icon="tabler-search"
    />
        </span>
    </div>
    <!-- {{ inactiveClients }} -->
      <VDataTable :headers="headers" :items="inactiveClients"  :items-per-page="options.itemsPerPage"
    :page="options.page" :search="search"
    :options="options" class="mt-3">
        <template #item.account_type="{item}">
          <p v-if="item?.account_type">{{ item?.account_type }}</p>
          <p v-else>Not added</p>
        </template>
        <!-- {{ inactiveClients }} -->
        <template #item.contact="{item}">
          <p v-if="item?.contact">{{ item?.contact }}</p>
          <p v-else>Not added</p>
        </template>
        <!-- removing default paginatiions -->
      <!-- =========== -->
       <!-- Actions -->
    <template #item.actions="{ item }">
     
        <IconBtn @click="openEditDialog">
            <VIcon icon="tabler-edit" />
        </IconBtn>
     
    </template>
    <template #bottom>
      <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
          <VTextField
            v-model="options.itemsPerPage"
            label="Rows per page:"
            type="number"
            min="-1"
            max="15"
            hide-details
            variant="underlined"
            style="max-inline-size: 8rem;min-inline-size: 5rem;"
          />

          <VPagination
            v-model="options.page"
            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="Math.ceil(inactiveClients.length / options.itemsPerPage)"
          />
        </div>
    </template>
      </VDataTable>
      <!-- pagination -->
      
  <!-- </div> -->
    </v-card-text>
    </VCard> 
     <!--=============  -->
    <!-- edit dailog  -->
     <VDialog
      v-model="EditDialog"
      max-width="500px"
    >
      <VCard>
        <v-card-text>
        <div class="d-flex justify-space-between mb-3">
            <h4 class="mt-1">APPROVE User</h4>
           <v-avatar size="25" ><VIcon icon="tabler-x" color="error" @click="closeEditDialog"></VIcon></v-avatar>
        </div>
        <hr>
            <AppSelect
            class="mt-3"
    :items="edit"
    label="Client Group *"
    placeholder="GFL"
  />
  <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
    <AppTextField
    label="TITLE *"
    placeholder="title"
  />
  <AppTextField
    label="ACCOUNT NO *"
    placeholder="Account NO"
  />
  </div>
        </v-card-text>
  <div class="d-flex justify-end">
        <VCardActions>
          <VSpacer />
  
          <VBtn
            color="error"
            variant="outlined"
            @click="closeEditDialog"
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
   </span>
    </template>
  
  
  
  <script setup>
  import { useClientStore } from '@/store/client';
import { VDataTable } from 'vuetify/labs/VDataTable';
  // import data from '@/views/demos/forms/tables/data-table/datatable'
  // actions
//   definePageMeta({
//   middleware: 'auth'
// })
  const clientStore = useClientStore()
  const search =ref("")
  const clientData = computed(() => {
  return clientStore.allClients;
});
const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })
// Define a computed property to filter inactive clients
const inactiveClients = computed(() => {
  return clientData.value?.filter(client => client.status === 'Inactive');
});
  const EditDialog = ref(false)
const  openEditDialog =( ) => {
  EditDialog.value = true;
}
const closeEditDialog = () => {
  EditDialog.value = false;
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
      title: 'NAME',
      key: 'name',
    },
    {
      title: 'ACCOUNT NO',
      key: 'account_type',
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
  // breadcrumbs
const BreadcrumbsData = [
  {
    title: "Dashboard",
    disabled: false,
    link: "/",
  },
  {
    title: "View Materials",
    disabled: true,
    link: "/ViewMaterial",
  },
];
  
  // small select betwenn show and entries
  const items = [
    'Foo',
    'Bar',
    'Fizz',
    'Buzz',
  ]
//   edit dialog select
const edit = ['Foo', 'Bar', 'Fizz', 'Buzz']
// api call
const AllClients = async () =>{
  await clientStore.fetchAllClients();
}
AllClients()
  </script>
  <style scoped>
@media screen and (max-width: 400px) {
  .search{
    margin-top: .7rem;
  }
}

</style>
