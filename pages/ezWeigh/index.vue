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
      <div class="py-5 d-flex justify-space-between flex-wrap">
        <h3>ALL Transactions</h3>
        <v-btn @click="openAddTransaction">New</v-btn>
      </div>
      <div class="d-flex justify-end flex-wrap">
        <span class="search">
          <AppTextField
            v-model="search"
            style="inline-size: 15rem"
            placeholder="Search here"
            append-inner-icon="tabler-search"
          />
        </span>
      </div>
      <VDataTable :search="search" :items-per-page="options.itemsPerPage"
      :page="options.page" :headers="headers" class="mt-3">
        <!-- removing default paginatiions -->
        <template #bottom> </template>
        <!-- =========== -->
        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn @click="openEditDialog">
            <VIcon icon="tabler-edit" />
          </IconBtn>
        </template>
      </VDataTable>
      <!-- pagination -->
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
        <VPagination  v-model="options.page"
        :total-visible="$vuetify.display.smAndDown ? 3 : 5"
        :length="Math.ceil(getClients.length / options.itemsPerPage)" />
      </div>
    </v-card-text>
  </VCard>
  <!-- Dialog Info -->
  <VDialog v-model="transactionInfo" max-width="500px">
    <VCard>
      <v-card-text>
        <div class="d-flex justify-space-between mb-3">
          <h4 class="mt-1">ezWeigh</h4>
          <v-avatar size="25"
            ><VIcon
              icon="tabler-x"
              color="error"
              @click="closeAddTransaction"
            ></VIcon
          ></v-avatar>
        </div>
        <hr />

        <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
          <AppSelect
            v-model="selectedTruck"
            :items="getTrucks"
            label="License No *"
            placeholder="License Plate Number"
            item-title="plate_no"
            item-value="id"
            return-object
          />
          <AppTextField v-model="inWeight" label="In-Weight (MT) *" placeholder="In-Weight" />
        </div>
        <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
          <AppSelect
          v-model="selectedClient"
          :items="getClients"
          label=" SELECT CLIENT*"
          placeholder="select client"
          item-title="name"
          item-value="id"
          return-object
          />
          <AppTextField v-model="contactNo" label="Contact NO *" placeholder="Contact" />
        </div>
        <AppTextField v-model="description" class="mt-3" label="Vehicle Description *" placeholder="Vehicle Description" />

      </v-card-text>
      <div class="d-flex justify-end">
        <VCardActions>
          <VSpacer />

          <VBtn color="error" variant="outlined" @click="reset">
            RESET
          </VBtn>

          <VBtn color="primary" variant="elevated" @click="queueTransaction(selectedTruck, inWeight, selectedClient, contactNo, description)">
            Submit
          </VBtn>

          <VSpacer />
        </VCardActions>
      </div>
    </VCard>
  </VDialog>
  <VDialog v-model="EditDialog" max-width="500px">
    <VCard>
      <v-card-text>
        <div class="d-flex justify-space-between mb-3">
          <h4 class="mt-1">APPROVE User</h4>
          <v-avatar size="25"
            ><VIcon
              icon="tabler-x"
              color="error"
              @click="closeEditDialog"
            ></VIcon
          ></v-avatar>
        </div>
        <hr />
        <AppSelect
          class="mt-3"
          :items="edit"
          label="Client Group *"
          placeholder="GFL"
        />
        <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
          <AppTextField label="TITLE *" placeholder="title" />
          <AppTextField label="ACCOUNT NO *" placeholder="Account NO" />
        </div>
      </v-card-text>
      <div class="d-flex justify-end">
        <VCardActions>
          <VSpacer />

          <VBtn color="error" variant="outlined" @click="closeEditDialog">
            Close
          </VBtn>

          <VBtn color="primary" variant="elevated" @click="deleteItemConfirm">
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
import { useClientStore } from '@/store/client';
import { useEzweighStore } from '@/store/ezweigh';
import { useTruckStore } from '@/store/truck';

// definePageMeta({
//   middleware: 'auth'
// })
// breadcrumbs
const cStore = useClientStore();
const eStore = useEzweighStore();
const tStore = useTruckStore();
const BreadcrumbsData = [
  {
    title: "Dashboard",
    disabled: false,
    link: "/",
  },
  {
    title: "View Transactions",
    disabled: true,
    link: "/ezWeigh",
  },
];
const headers = [
  {
    title: "#",
    sortable: false,
    key: "id",
  },
  {
    title: "Client",
    key: "client",
  },
  {
    title: "Account",
    key: "account",
  },
  {
    title: "License No",
    key: "license",
  },
  {
    title: "Material",
    key: "material",
  },
  {
    title: "Cross Weight",
    key: "c_weight",
  },
  {
    title: "Tare Weight",
    key: "t_weight",
  },
  {
    title: "Net Weight",
    key: "n_weight",
  },
  {
    title: "Status",
    key: "status",
  },
];

const transactionInfo = ref(false);
const openAddTransaction = () => {
  transactionInfo.value = true;
};
const closeAddTransaction = () => {
  transactionInfo.value = false;
};
const getTrucks = computed(() => {
  return tStore.AllTrucks;
});
const getClients = computed(() => {
  return cStore.allClients
})
const EditDialog = ref(false);
const selectedTruck = ref(getTrucks[0]);
const selectedClient = ref(getClients[0])
const inWeight = ref(0)
const contactNo = ref(null)
const description = ref (null)
const search = ref('')
const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })

async function queueTransaction(selectedTruck, inWeight, selectedClient, contactNo, description) {
  console.log('received data',  selectedClient)

  const payload = {
  "plate_no": selectedTruck.plate_no,
  "truck_id": selectedTruck.id,
  "client_name": selectedClient.name,
  "contact_no": contactNo,
  "gross_weight": parseFloat(inWeight),
  "vehicle_desc": description,
  "client_id": selectedClient.id
}

  await eStore.creatQueueTransaction(payload)
  transactionInfo.value = false
  eStore.fetchAllTransactions()
}


async function fetchData() {
  await tStore.fetchAllTrucks();
  await cStore.fetchAllClients();
}
function reset(){
  selectedTruck.value = getTrucks[0]
selectedClient.value = getClients[0]
inWeight.value = 0
contactNo.value = null
description.value = null
}

onBeforeMount(() => {
  fetchData();
  console.log("Component is about to be mounted");
});
</script>
