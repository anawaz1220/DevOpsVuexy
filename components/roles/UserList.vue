<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';

// 👉 Store
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()



// Headers
const headers = [
  {
    title: '#',
    key: 'id',
  },
 
  {
    title: 'Name',
    key: 'name',
  },
 
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const data = [
      {
          id:'1',
          name:"John Doe",
          accountNo:'123457',
          email:'jhon@gmail.com',
          contact:'0387586868',
  
  
      }
  ]

// 👉 search filters
const roles = [
  {
    title: 'Admin',
    value: 'admin',
  },
  {
    title: 'Author',
    value: 'author',
  },
  {
    title: 'Editor',
    value: 'editor',
  },
  {
    title: 'Maintainer',
    value: 'maintainer',
  },
  {
    title: 'Subscriber',
    value: 'subscriber',
  },
]
const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
]

const isAddNewUserDrawerVisible = ref(false)
const AssignPermissionDialog = ref(false)
const openAssignPermission =()=>{
  AssignPermissionDialog.value = !AssignPermissionDialog.value
}

</script>

<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <AppSelect
          :model-value="itemsPerPage"
          :items="[
            { value: 10, title: '10' },
            { value: 25, title: '25' },
            { value: 50, title: '50' },
            { value: 100, title: '100' },
            { value: -1, title: 'All' },
          ]"
          style="inline-size: 5rem;"
          
        />

        <VSpacer />

        <div class="d-flex align-center flex-wrap gap-4">
          <!-- 👉 Search  -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Search User"
            density="compact"
            style="inline-size: 12.5rem;"
          />

          <!-- 👉 Add user button -->
          <!-- <AppSelect
            v-model="selectedRole"
            placeholder="Select Role"
            :items="roles"
            density="compact"
            clearable
            clear-icon="tabler-x"
            style="inline-size: 10rem;"
          /> -->
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTable
     style="display: flex; justify-content: space-between;"
        :items="data"
        :headers="headers"
         class="d-flex justify-space-between"
      >
        <!-- User -->
        <template #item.user="{ item }">
          <div class="d-flex align-center">
            <VAvatar
              size="38"
              :variant="!item.avatar ? 'tonal' : undefined"
              
              class="me-3"
            >
              <VImg
                v-if="item.avatar"
                :src="item.avatar"
              />
              <span v-else>{{ avatarText(item.fullName) }}</span>
            </VAvatar>
            <div class="d-flex flex-column">
              <h6 class="text-body-1 font-weight-medium">
                
              </h6>
              <span class="text-sm text-disabled">{{ item.email }}</span>
            </div>
          </div>
        </template>
        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn>
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="deleteUser(item.id)">
            <VIcon icon="tabler-trash" />
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
            <VMenu activator="parent">
              <VList>
                <VListItem>
                  <VListItemTitle style="font-weight: 600;"> <v-icon icon="tabler-edit" class="me-2"></v-icon>Update</VListItemTitle>
                </VListItem>
                <VListItem link>
                  <VListItemTitle @click="openAssignPermission" style="font-weight: 600;"><v-icon icon="tabler-file-dots" class="me-2"></v-icon> Assign Permission</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>
      </VDataTable>
      <!-- SECTION -->
    </VCard>

    <!-- 👉 Add New User -->
    <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
  </section>
<!-- ASSIGN PERMISSION DIALOG  -->
<v-dialog width="900" transition="dialog-transition" v-model="AssignPermissionDialog">
  <DialogCloseBtn @click="openAssignPermission" />
<v-card>
  
  <v-card-text>

<h3>ASSIGN PERMISSION</h3>
<!-- IST ROW -->
<v-row class="mt-3">
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">Accounts</h3>
    <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">Clients</h3>
    <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">Contacts</h3>
    <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>

</v-row>
<!-- SECOND ROW -->
<v-row class="mt-3">
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">Employee</h3>
    <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">Location</h3>
    <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">Material Type</h3>
    <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>
  </v-row>
  <!-- THIRD ROW -->
  <v-row class="mt-3">
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">Reports</h3>
    <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">Roles & Permission</h3>
    <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">Transaction</h3>
    <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>
</v-row>
<!-- FOURTH Row -->
<v-row class="mt-3">
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">Trucks</h3>
    <AppSelect
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>
  <v-col lg="4" md="4" sm="12" cols="12">
    <h3 style="font-weight: 400;" class="ps-1">User</h3>
    <AppSelect
    class="select"
    color="primary"
    v-model="selectedOptions"
    :items="states"
    :menu-props="{ maxHeight: '400' }"
    label="Select"
    multiple
    persistent-hint
    placeholder="Select State"
  />
  </v-col>
</v-row>

  </v-card-text>
</v-card>

</v-dialog>
</template>

<style lang="scss">
.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>
<style scoped>

</style>
