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
  
  <!-- data table -->
  <VDataTable
      :headers="headers"
      :items="Cdetails.clientAccounts"
      :items-per-page="5"
      
    >
  <template #item.address="{item}">
    <p>{{Cdetails.address}}</p>
  </template>
  <template #item.city="{item}">
    <p>{{Cdetails.city}}</p>
  </template>
  <template #bottom></template>
  </VDataTable>
  
  
  
  
  </template>
  
  
  <script setup>
  import { useClientStore } from '@/store/client';
import { useRoute } from 'vue-router';
import { VDataTable } from 'vuetify/labs/VDataTable';

  const route = useRoute()
  const clientStore = useClientStore()
  const headers = [
    {
      title: 'Sr #',
      sortable: false,
      key: 'id',
    },
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Account No',
      key: 'account_no',
    },
    {
      title: 'Approval Status',
      key: 'approval_status',
    },
    {
      title: 'Status',
      key: 'status',
    },
    
    
    {
      title: 'Address',
      key: 'address',
    },
    
    {
      title: 'City',
      key: 'city',
    },
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
      disabled: false,
      link: "/ViewMaterial",
    },
    {
      title: "View Materials BY id",
      disabled: true,
      link: "/weeklyinvoice",
    }
  ];

  // fetch all clients details by id
  const  Cdetails = computed(()=>{
    return clientStore.clientsDetails
  })
  // ===========

  const AllClientsDetails = async () =>{
  await clientStore.fetchClientsDetails(route?.query?.id)
  }

  await AllClientsDetails();
  </script>
