<template>
  <div
    v-if="tStore.loadingData"
    class="d-flex justify-center align-center"
  >
    <VProgressCircular
      indeterminate
      size="50"
    />
  </div>

  <span v-else>
    
    <div class="bread-crumb d-flex justify-end">
      <VBreadcrumbs :items="BreadcrumbsData">
        <template #title="{ item }">
          <RouterLink :to="item?.link">
            {{ item.title }}
          </RouterLink>
        </template>
        <template #prepend>
          <VIcon icon="tabler-home" />
        </template>
        <template #divider>
          <VIcon icon="tabler-chevron-right" />
        </template>
      </VBreadcrumbs>
    </div>
    <VCard>
      <VCardText>
        <div class="d-flex justify-space-between flex-wrap py-5">
          <h3 class="mt-3">ALL FLEET</h3>
          <div class="d-flex gap-3 flex-wrap">
            <InputBtn 
              @click="openAssignment"
              >TRUCK ASSIGNMENT</InputBtn>
            <InputBtn @click="openTruckInfo">ADD TRUCK</InputBtn>
            <InputBtn @click="openTruckData">IMPORT TRUCK</InputBtn>
          </div>
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
        <VDataTable
         :headers="headers"
          :items="getTrucks"
          :search="search"
          :items-per-page="options.itemsPerPage"
          :page="options.page"
          class="mt-3"
        >

          <!-- <template #item.account_type="{ item }">
            <p
              v-if="item.account_type"
              class="mt-3"
            >{{ item.account_type }}</p>
            <p
              v-else
              class="mt-3"
            >not available</p>
          </template> -->
          <!-- <template
            #item.contact="{ item }"
            class=""
          >
            <p
              v-if="item.contact"
              class="mt-3"
            >{{ item.contact }}</p>
            <p
              v-else
              class="mt-3"
            >not available</p>
          </template> -->
          <!-- ========= -->
          <!-- Actions -->
          <template #item.actions="{ item }">
            <div class="d-flex gap-1">
              <IconBtn @click="openTruckInfo(item)">
                <VIcon icon="tabler-edit" />
              </IconBtn>
              <IconBtn @click="openTruckDetails(item.id)">
                <VIcon icon="tabler-eye" />
              </IconBtn>
            </div>
          </template>
          <template #bottom />
        </VDataTable>
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
          :length="Math.ceil(getTrucks.length / options.itemsPerPage)"
          />
        </div>
      </VCardText>
    </VCard>
    <!-- ========================= -->
    <!-- 👉 truck assignment to client DIALOG  -->
    <VDialog
      v-model="truckAssignment"
      max-width="550px"
    >
      <VCard class="px-5 py-5">
        <div class="d-flex justify-space-between mb-3">
          <VCardTitle> TRUCK ASSIGNMENT TO CLIENT </VCardTitle>
          <VAvatar rounded="lg"><VIcon
            icon="tabler-x"
            color="error"
            @click="closeAssignment"
          /></VAvatar>
        </div>
        <hr>
        <!-- select client  -->
        <AppSelect
          v-model="selectedclient"
          class="mt-3"
          :items="getClients"
          label="SELECT CLIENT*"
          placeholder="The Renovator"
          item-title="name"
          item-value="id"
          return-object
          @update:model-value="selectTruckByclient"
        :rules="[requiredValidator]"

        />
        <!-- select truck select client -->
        <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
          <AppSelect
            v-model="selectedTruck"
            :items="getClientTrucks"
            item-title="plate_no"
            item-value="id"
            return-object
            label=" SELECT TRUCK*"
            placeholder=" None Selected"
        :rules="[requiredValidator]"

          />
          <AppSelect
            v-model="newclient"
            :items="getClients"
            label="SELECT CLIENT TO ASSIGN*"
            placeholder="Select client to assign"
            item-title="name"
            item-value="id"
            return-object
        :rules="[requiredValidator]"

          />
        </div>
        <div class="d-flex justify-end mt-4">
          <VCardActions>
            <VSpacer />
            <InputBtn
              :color="'error'"
              :variant="'outlined'"
              @click="closeAssignment"
            >
              close
            </InputBtn>
            <InputBtn
              :variant="'elevated'"
              @click="assignTruck(newclient, selectedTruck)"
            >
              submit
            </InputBtn>
            <VSpacer />
          </VCardActions>
        </div>
      </VCard>
    </VDialog>
    <!-- ========================= -->
    <!-- 👉 ADD  TRUCK  INFO DIALOG  -->
    <!-- select client  -->
    <VDialog
      v-model="addTruckInfo"
      max-width="550px"
    >
   <FormFleet @closeDialog="addTruckInfo=false"  />
    </VDialog>
    <!-- 👉 ADD  TRUCK  INFO DIALOG  -->
    <VDialog
      v-model="truckData"
      max-width="550px"
    >
      <VCard class="px-5 py-5">
        <div class="d-flex justify-space-between flex-wrap">
          <VCardTitle> IMPORT TRUCK DATA </VCardTitle>
          <VAvatar><VIcon
            icon="tabler-x"
            color="error"
            @click="closeTruckData"
          /></VAvatar>
        </div>
        <hr>
        <h5 class="ps-12 mt-3">File *</h5>
        <VFileInput
          label="File "
          class="mt-2"
          @change="importTrucks"
        :rules="[requiredValidator]"

        />
        <div class="d-flex justify-end mt-4">
          <VCardActions>
            <VSpacer />
            <InputBtn
              :color="'error'"
              :variant="'outlined'"
              @click="closeTruckData"
            >
              close
            </InputBtn>
            <InputBtn
              :variant="'elevated'"
              @click="importTruckData"
            >
              submit
            </InputBtn>
            <VSpacer />
          </VCardActions>
        </div>
      </VCard>
    </VDialog>
  </span>
  <!-- truck details -->
  <v-dialog v-model="openTruckDetailsDialog" width="900">
    <DialogCloseBtn @click="openTruckDetailsDialog=false" />
    <v-card>
      <v-card-text>
       <VDataTable :headers="header" :items="getData"></VDataTable>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import InputBtn from '@/components/Input/Btn.vue';
import FormFleet from '@/components/form/Fleet.vue';
import { useClientStore } from "@/store/client";
import { useTruckStore } from "@/store/truck";
import { ref } from 'vue';
import { VDataTable } from "vuetify/labs/VDataTable";
const search = ref('')
const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })
const tStore = useTruckStore()
const cStore = useClientStore()
const openTruckDetailsDialog =ref(false)
const addTruckInfo = ref(false)


const getClients = computed(() => {
  return cStore.allClients
})

const selectedclient = ref(getClients[0])
const newclient = ref(getClients[1])

// info dialog
const truckAssignment = ref(false)

const openAssignment = () => {
  truckAssignment.value = true
}


const getData = computed(() => {
  const objectData = tStore.truckDetailsById;
  return [objectData];
});


const closeAssignment = () => {
  truckAssignment.value = false
}
const openTruckDetails = (id) =>{
  openTruckDetailsDialog.value = !openTruckDetailsDialog.value;
  fetchTruck(id)
}

// computed for getting trucks data
const getTrucks = computed(() => {
  // console.log(tStore.AllTrucks, 'trucks');
  return tStore.AllTrucks
})

const selectedTruck = ref(getTrucks[0])
const getClientTrucks = computed(() => {
  console.log(tStore.truckBYclient, 'from client');
  return tStore.truckBYclient
})


const openTruckInfo = (item) => {
  addTruckInfo.value = true;
  if(item.id){
    return tStore.saveTruckData(item);
  }else{
    const emptyData =ref(null)
    return tStore.saveTruckData(emptyData.value);
  }
}


// truck data dialog
const truckData = ref(false)

const openTruckData = () => {
  truckData.value = true
}

const closeTruckData = () => {
  truckData.value = false
}

// paginatioin

const headers = [
  {
    title: "#",
    key: "id",
  },
  {
    title: "CLIENT",
    key: "client",
  },
  {
    title: "PLATE NO",
    key: "plate_no",
  },
  {
    title: "VIN NO",
    key: "vin_no",
  },

  {
    title: "MODEL",
    key: "model",
  },
  {
    title: "COLOR",
    key: "color",
  },
  {
    title: "TARE WEIGHT",
    key: "tare_weight",
  },
  {
    title: "ACTIONS",
    key: "actions",
  },
]

// truck details headers
const header =[
  {
    title: 'ID',
    key:'id'
  },
  {
    title: 'Plate No',
    key:'plate_no'
  },
  {
    title: 'Model',
    key:'model'
  },
  {
    title: 'Color',
    key:'color'
  },
  {
    title: 'Company',
    key:'company'
  },
  {
    title: 'Vin No',
    key:'vin_no'
  },
  {
    title:'Tare Weight',
    key:'tare_Weight'
  },
  {
    title: 'Unit',
    key:'description'
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
    title: "View Fleet",
    disabled: true,
    link: "/fleets",
  },
]


const items = [10, 20, 50, 100]
const selectedItemsPerPage = ref(items[0])
const truckFile = ref(null)
const itemsPerPage = ref(selectedItemsPerPage.value)

//  Getting trucks data
async function fetchTrucks() {
  await tStore.fetchAllTrucks()
  await cStore.fetchAllClients()
}
async function assignTruck(client, truck) {
  // console.log(client.id, truck.id, 'truck assignment logs');
  const payload = {
    client_id: client.id,
    truck_id: truck.id,
  }

  // console.log(payload, 'from call');
  truckAssignment.value = false
  await tStore.FetchAssignTruck(payload)
  selectedclient.value = null
  newclient.value = null
}

async function selectTruckByclient(newValue) {
  console.log('Selected Client changed:', newValue.id)
  await tStore.FetchTruckByClient(newValue.id)

  // Call your custom function or perform any other actions
  // For example, you can call another function here
  // myCustomFunction(newValue);
}

function importTrucks(event) {
  truckFile.value = event.target.files[0]
}
async function importTruckData() {
  if (truckFile.value) {
    const formData = new FormData()

    formData.append('file', truckFile.value)
    console.log(formData, 'form data')
    await tStore.importTrucksFile(formData)
    truckData.value = false
  }
}
fetchTrucks()
// api call fetch trcuks details by id
async function fetchTruck(id){
  await tStore.fetchTruckDetails(id)
}
</script>

<style scoped></style>
