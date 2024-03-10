<template>
  <div class="d-flex justify-center align-center" v-if="clientStore.LoadingData"></div>
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
    <div class="d-flex justify-space-between flex-wrap py-5">
      <h3>ALL CLIENTS</h3>
      <div class="d-flex gap-3 flex-wrap">
        <VBtn class="add-client" @click=" openDialog">ADD CLIENT</VBtn>
        <VBtn @click="openinfoDialog">IMPORT CLIENT</VBtn>
      </div>
    </div>
    <div class="d-flex justify-end flex-wrap">
      <!-- ============= -->
      <!-- search field -->
      <span>
        <AppTextField
          class="mt-2 search"
          style="inline-size: 15rem"
          placeholder="Search here"
          append-inner-icon="tabler-search"
          v-model="search"
        />
      </span>
    </div>
    <VDataTable :headers="headers" :items="clientData" :items-per-page="options.itemsPerPage"
    :page="options.page" :search="search"
    :options="options" class="mt-3">
      <template #item.account_type = "{item}">
        <p v-if="item.account_type" class="mt-3">{{ item.account_type }}</p>
        <p v-else class="mt-3"> -</p>
      </template>
      <template #item.contact = "{item}" class="">
      <p v-if="item.contact" class="mt-3">{{ item.contact }}</p>
      <p v-else class="mt-3">-</p>
      </template>
      <!-- ========= -->
      <!-- Actions -->
      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <IconBtn @click="toggleClientDialog(item)">
            <VIcon icon="" />
          </IconBtn>
         
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
            <VMenu activator="parent" >
              <VList  class="v-tabs-pill">
                <VListItem >
                  <VListItemTitle style="font-weight: 600; cursor: pointer;" @click="fnShowClientSummary(item.id)"><v-icon icon="tabler-file-dots" class="me-2"></v-icon >Client Summary</VListItemTitle>
                </VListItem>
                <VListItem link>
                  <VListItemTitle  style="font-weight: 600;" ><v-icon icon="tabler-file-dots" class="me-2"></v-icon>Weekly Invoice</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
          
        </div>
      </template>
      <template #bottom>
      <VCardText class="pt-2">
        <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
          <VTextField
            v-model="options.itemsPerPage"
            label="ROWS PER PAGE:"
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
            :length="Math.ceil(clientData.length / options.itemsPerPage)"
          />
        </div>
      </VCardText>
    </template>
    </VDataTable>
  </v-card-text>
</VCard>
<!-- ========================= -->
<!-- 👉 ADD CLIENT DIALOG  -->
<VDialog v-model="importClient" max-width="550px">
  <VCard class="px-5 py-5">
    <div class="d-flex justify-space-between">
    <VCardTitle> ADD CLIENT INFO </VCardTitle>
    <v-avatar size="25" ><VIcon icon="tabler-x" color="error" @click="closeDialog"></VIcon></v-avatar>
  </div>
    <hr />
   
   <!-- Name and contact  -->
    <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
      <AppTextField
  label="NAME*"
  placeholder="clients"
  :rules="[requiredValidator]"
/>
<AppTextField
  label="CONTACT*"
  placeholder="contact no"
  :rules="[requiredValidator]"
/>
    </div>
   
    <!-- Email and address -->
    <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
      <AppTextField
  label="EMAIL*"
  placeholder="email"
  :rules="[emailValidator]"
/>
<AppTextField
  label="ADDRESS*"
  placeholder="adress"
  :rules="[requiredValidator]"
/>
    </div>
    
    <!-- city and province and code  -->
    <div class="d-flex justify-space-between flex-wrap gap-3 mt-3">
      <AppTextField
  label="CITY*"
  placeholder="city"
  :rules="[requiredValidator]"
/>
<AppTextField
  label="PROVINCE"
  placeholder="province"
  :rules="[requiredValidator]"
/>
<AppTextField
  label="POSTAL CODE"
  placeholder="postal code"
  
/>

    </div>
    <div class="d-flex justify-end mt-4">
      <VCardActions>
        <VSpacer />
        <VBtn color="error" variant="outlined" @click="closeDialog">
          close
        </VBtn>
        <VBtn color="primary" variant="elevated">
          submit
        </VBtn>
        <VSpacer />
      </VCardActions>
    </div>
  </VCard>
</VDialog>
 <!-- ========================= -->
<!-- 👉 import client dialog  -->
<VDialog v-model="infoDialog" max-width="550px">
  <VCard class="px-5 py-5">
    <div class="d-flex justify-space-between">
    <VCardTitle> IMPORT CLIENT</VCardTitle>
    <v-avatar size="25" ><VIcon icon="tabler-x" color="error" @click="closeinfoDialog"></VIcon></v-avatar>
  </div>
    <hr />
    <VForm ref="refForm" @submit.prevent="importClientData">
      <h5 class="ps-12 mt-3">FILE *</h5>
    <VFileInput label="File input" accept="text/csv"  @change="onFileSelected" class="mt-2"   :rules="[requiredValidator]" />
    <div class="d-flex justify-end mt-4">

        <VSpacer />
        <div class="d-flex gap-3">
          <VBtn color="error" variant="outlined" @click="closeinfoDialog">
            close
          </VBtn>
          <VBtn color="primary" type="submit" variant="elevated" :disabled="clientStore.clientLoading" :loading="clientStore.clientLoading">
            submit
          </VBtn>
        </div>
      </div>
    </VForm>
        <VSpacer />
    
  </VCard>
</VDialog>
  </span>
 <!-- client detrails dialog -->
 <v-dialog persistent width="700" v-model="isDialogVisible">
  <DialogCloseBtn @click="closeClientDialog"></DialogCloseBtn>
  <v-card>
    <v-card-text>
      Clients details dialog
    </v-card-text>
  </v-card>
 </v-dialog>

 <VDialog v-model="showClientSummary" max-width="650px">
   <VCard class="px-5 py-5">
    <ClientSummary  :clientId="selectClientForDetailsId"/>
  </VCard>
</VDialog>


</template>

<script setup lang="ts">
import { useClientStore } from '@/store/client';
import { useRouter } from "vue-router";
import { VDataTable } from 'vuetify/labs/VDataTable';
import ClientSummary from "../../components/client/Summary.vue";

const router = useRouter()
const refForm =ref()
const clientStore = useClientStore();
const isDialogVisible = ref(false)
const search = ref('')
const file = ref("")
const showClientSummary=ref(false)
const selectClientForDetailsId=ref<string|null>(null)
const clientData = computed(()=>{
 return clientStore.allClients;
})
const AllClients = async () =>{
  await clientStore.fetchAllClients();
}

AllClients()


// info dialog
const infoDialog = ref(false)
const  openinfoDialog =( ) => {
  infoDialog.value = true;
}
const closeinfoDialog = () => {
  infoDialog.value = false;
}
// import client
const importClient = ref(false)
const openDialog = () =>{
  importClient .value =true;
}
const closeDialog = () =>{
  importClient.value = false;
}
// router push function
// const pushToweekly = (id) => {
//   console.log("id", id);
//   router.push({
//     path: '/weeklyinvoice',
//     query: { id: id }
//   });
// }

const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })
// paginatioin
// const currentPage = ref(1);

const headers = [
  {
    title: "ID",
    sortable: false,
    key: "id",
  },
  {
    title: "NAME",
    key: "name",
  },
  {
    title: "ACCOUNT NO",
    key: "account_type",
  },
  {
    title: "EMAIL",
    key: "email",
  },

  {
    title: "CONTACT",
    key: "contact",
  },
  {
    title: "Actions",
    key: "actions",
  },
];
// client details dialog
function toggleClientDialog(item:any){
  isDialogVisible.value = !isDialogVisible.value;
  clientStore.fetchClientsDetails(item?.id)
}
function closeClientDialog(){
  isDialogVisible.value = !isDialogVisible.value;
}
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


function onFileSelected(event:any) {
  const f= event.target.files[0];
  file.value =f;
}
// upload client data
const importClientData = async () => {
  await refForm.value?.validate();

if (refForm?.value?.errors?.length) {
  return;
}
  if (file.value) {
    const formData = new FormData();
    formData.append("file", file.value)
    await clientStore.uploadClientData(formData)
};
infoDialog.value = false;
AllClients()
}

function fnShowClientSummary(clientId:string){
  showClientSummary.value=true
  selectClientForDetailsId.value=clientId
}
</script>

<style scoped>
@media screen and (max-width: 400px) {
  .search {
    margin-top: 0.7rem;
  }
  .add-client {
    margin-top: 0.5rem;
  }
}
</style>
