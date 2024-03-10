<!-- eslint-disable camelcase -->
<template>
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
      <div class="py-5 d-flex justify-space-between flex-wrap">
        <h3 class="mt-3">
          ACCOUNT LIST
        </h3>
        <span class="d-flex gap-3">
          <VBtn @click="openAccountInfo">Add Account</VBtn>
          <VBtn @click="openImportAccount">Import Account</VBtn>
        </span>
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
        :items="getData"
        :items-per-page="options.itemsPerPage"
        :page="options.page"
        :search="search"
        class="mt-3"
      >
        <!-- =========== -->
        <!-- Actions -->
        <template #item.actions="{item}">
          <IconBtn @click="openAccountInfo(item)">
            <VIcon icon="tabler-edit" />
          </IconBtn>
        </template>
        <template #bottom>
          <VCardText class="pt-2">
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
                :length="Math.ceil(getData.length / options.itemsPerPage)"
              />
            </div>
          </VCardText>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <!-- ====================== -->
  <!-- Account info dialog -->
  <VDialog
    v-model="AccountInfo"
    max-width="500px"
  >
    <VCard>
      <VCardText>
        <div class="d-flex justify-space-between mb-3">
          <h4 class="mt-1">
            ADD ACCOUNT INFO
          </h4>
        
          <VAvatar size="25">
            <VIcon
              icon="tabler-x"
              color="error"
              @click="closeAccountInfo"
            />
          </VAvatar>
        </div>
        <hr>
        <div class="d-flex justify-space-between gap-3">
          <AppSelect
            v-model="selectedClient"
            class="mt-3"
            :items="getClients"
            label=" SELECT CLIENT*"
            placeholder="select client"
            item-title="name"
            item-value="id"
            return-object
            :rules="[requiredValidator]"
          />
          <!-- <AppSelect
            class="mt-3"
            :items="groups"
            v-model="group"
            label="SELECT GROUP *"
            placeholder="GFL"
            :rules="[requiredValidator]"
          /> -->
        </div>
        <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
          <AppTextField
            v-model="accountTitle"
            label="TITLE *"
            placeholder="title"
            :rules="[requiredValidator]"
          />
          <AppTextField
            v-model="accountNo"
            label="ACCOUNT NO *"
            placeholder="Account NO"
            :rules="[requiredValidator]"
          />
        </div>
      </VCardText>
      <div class="d-flex justify-end">
        <VCardActions>
          <VSpacer />

          <VBtn
            color="error"
            variant="outlined"
            @click="closeAccountInfo"
          >
            Close
          </VBtn>

          <VBtn
            color="primary"
            variant="elevated"
            @click="saveAccount(selectedClient, accountTitle, accountNo)"
          >
            Submit
          </VBtn>
          <VSpacer />
        </VCardActions>
      </div>
    </VCard>
  </VDialog>
  <!-- ========================= -->
  <!-- 👉 ADD  CLIENT  INFO DIALOG  -->
  <VDialog
    v-model="ImportAccount"
    max-width="550px"
  >
    <VCard class="px-5 py-5">
      <div class="d-flex justify-space-between">
        <VCardTitle> IMPORT ACCOUNTS </VCardTitle>
        <VAvatar size="25">
          <VIcon
            icon="tabler-x"
            color="error"
            @click="closeImportAccount"
          />
        </VAvatar>
      </div>
      <hr>
      <h5 class="ps-12 mt-3">
        FILE *
      </h5>
      <VFileInput
        label="FILE "
        class="mt-2"
        @change="importAccounts"
        :rules="[requiredValidator]"

      />
      <div class="d-flex justify-end mt-4">
        <VCardActions>
          <VSpacer />
          <VBtn
            color="error"
            variant="outlined"
            @click="closeImportAccount"
          >
            close
          </VBtn>
          <VBtn
            color="primary"
            variant="elevated"
            @click="saveAccountFile"
          >
            submit
          </VBtn>
          <VSpacer />
        </VCardActions>
      </div>
    </VCard>
  </VDialog>

</template>

<script setup>
import { useAccountStore } from "@/store/account";
import { useClientStore } from "@/store/client";
import { onBeforeMount } from 'vue';
import { VDataTable } from "vuetify/labs/VDataTable";
// model variables

const groups = ["GFL", "Numbered Clients", "TSC"]
const items = [10, 20, 50, 100]
const accountNo = ref(null)
const accountTitle = ref(null)
const accountFile = ref(null)
const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })
const search = ref('')
const cStore = useClientStore()
const aStore = useAccountStore()
const getClients = computed(() => {
  return cStore.allClients
})
const selectedClient = ref(getClients[0])
// fetch data from accounts
const getData = computed(() => {
  return aStore.allAccounts
})

// get stored data
const data = computed(() =>{
  return aStore.StoredAccountData;
})
// fill form for updated data
watch(getUpdate, data)
function getUpdate(){
accountNo.value = data.value?.account_no;
accountTitle.value = data.value?.title;

}
// breadcrumbs
const BreadcrumbsData = [
  {
    title: "Dashboard",
    disabled: false,
    link: "/",
  },
  {
    title: "Accounts",
    disabled: true,
    link: "/accounts",
  },
]

const headers = [
  {
    title: "#",
    sortable: false,
    key: "id",
  },

  {
    title: "TITLE",
    key: "title",
  },
  {
    title: "ACCOUNT NO",
    key: "account_no",
  },
  {
    title: "STATUS",
    key: "status",
  },
  {
    title: "ACTION",
    key: "actions",
  },
]



const AccountInfo = ref(false)

const openAccountInfo = (item) => {
  console.log("account data", item);
  AccountInfo.value = true;
  if(item?.id){
    return aStore.saveAccountData(item);
  }else{
    const emptyData =ref(null);
    return aStore.saveAccountData(emptyData.value);
  }
}

const closeAccountInfo = () => {
  AccountInfo.value = false
}




// imoport account dialog
const ImportAccount = ref(false)

const openImportAccount = () => {
  ImportAccount.value = true
}

const closeImportAccount = () => {
  ImportAccount.value = false
}

// api call for fetching accounts
async function saveAccount(selectedClient, accountTitle, accountNo) {
  console.log('received data', selectedClient.id, accountTitle, accountNo)
if(data.value?.id){
  await aStore.updateAccount(data.value?.id)
  AccountInfo.value = false
  aStore.fetchAllAccounts()
} else{
  const payloadAdd = {
    "title": accountTitle,
    "account_no": accountNo,
    "client_id": selectedClient.id,
  }
  await aStore.FetchCreateNewAcc(payloadAdd)
  AccountInfo.value = false
  aStore.fetchAllAccounts()
}
}
function importAccounts(event) {
  accountFile.value = event.target.files[0]
}
async function saveAccountFile() {
  if (accountFile.value) {
    const formData = new FormData()

    formData.append('file', accountFile.value)
    console.log(formData, 'form data')
    ImportAccount.value = false
    await aStore.importAccountsFile(formData)

  }
}

async function fetchAccounts() {
  aStore.fetchAllAccounts()

  await cStore.fetchAllClients()
}
onBeforeMount(() => {
  // Your logic before the component is mounted goes here
  fetchAccounts()
  console.log('Component is about to be mounted')
})
</script>
