<script setup>

import { VDataTable } from 'vuetify/labs/VDataTable'

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
      title: 'Board Rates',
      key: 'accountNo',
    },
    {
      title: 'Slab Rate',
      key: 'email',
    },
    
    {
      title: 'Slab Weight',
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
          fullName:"Test Name",
          accountNo:'123457',
          email:'testname@gmail.com',
          contact:'0000000000',
  
  
      }
  ]

const vehicleData = [
  {
    
    title: 'On the way',
    time: '2hr 10min',
    percentage: 39.7,
  },
  {
    
    title: 'Unloading',
    time: '3hr 15min',
    percentage: 28.3,
  },
  {
    
    title: 'Loading',
    time: '1hr 24min',
    percentage: 17.4,
  },
  {
    
    title: 'Waiting',
    time: '5hr 19min',
    percentage: 14.6,
  },
]
</script>

<template>
  <VCard>
    <VCardItem title="Latest Transactions">
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>
    <VCardText>
      <div class="d-flex mb-8">
        <div style="inline-size: 33%;">
          <div class="vehicle-progress-label position-relative mb-4 text-body-1 d-none d-sm-block">
           Licence No.
          </div>
          <VProgressLinear
            color="rgba(var(--v-theme-on-surface), var(--v-hover-opacity))"
            model-value="100"
            height="46"
            class="rounded-e-0 rounded-sm"
          >
            <!-- <strong class="text-start vehicle-progress-text">39.7%</strong> -->
          </VProgressLinear>
        </div>
        <div style="inline-size: 33%;">
          <div class="vehicle-progress-label position-relative mb-4 text-body-1 d-none d-sm-block">
            Deccription
          </div>
          <VProgressLinear
            color="rgb(var(--v-theme-primary))"
            model-value="100"
            class="rounded-0"
            height="46"
          >
            <strong class="text-white vehicle-progress-text">28.3%</strong>
          </VProgressLinear>
        </div>
        <div style="inline-size: 33%;">
          <div class="vehicle-progress-label position-relative mb-4 text-body-1 d-none d-sm-block">
            Client
          </div>
          <VProgressLinear
            color="rgb(var(--v-theme-info))"
            model-value="100"
            height="46"
            class="rounded-0"
          >
            <strong class="text-white vehicle-progress-text">17.4%</strong>
          </VProgressLinear>
        </div>
        <div style="inline-size: 33%;">
          <div class="vehicle-progress-label position-relative mb-4 text-body-1 d-none d-sm-block">
            Ticket No.
          </div>
          <VProgressLinear
            color="#212121"
            model-value="100"
            height="46"
            class="rounded-s-0 rounded-sm"
          >
            <strong class="text-white vehicle-progress-text">14.6%</strong>
          </VProgressLinear>
        </div>
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
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.vehicle-progress-label {
  padding-block-end: 1rem;

  &::after {
    position: absolute;
    display: inline-block;
    background-color: #DBDADE;
    block-size: 10px;
    content: "";
    inline-size: 2px;
    inset-block-end: 0;
    inset-inline-start: 0;

    [dir="rtl"] & {
      inset-inline: unset 0;
    }
  }
}
</style>

<style lang="scss">
.v-progress-linear__content {
  justify-content: start;
  padding-inline-start: 1rem;

  .vehicle-progress-text {
    font-size: 1rem;
  }
}

@media (max-width: 1080px) {
  .v-progress-linear__content {
    padding-inline-start: 0.75rem !important;

    .vehicle-progress-text {
      font-size: 0.75rem !important;
    }
  }
}

@media (max-width: 576px) {
  .v-progress-linear__content {
    padding-inline-start: 0.3rem !important;

    .vehicle-progress-text {
      font-size: 0.75rem !important;
    }
  }
}
</style>
