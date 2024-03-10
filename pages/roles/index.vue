<template>
 

<!-- BREAD CRUMBS -->
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
      <v-card>
       <v-card-text>
      
  <VRow>
    <VCol cols="12">
      <div class="d-flex justify-space-between ">
        <h4 class="text-h4 mb-6">
        Roles List
      </h4>
      <v-btn @click="openAddRole">ADD ROLE</v-btn>
      </div>
      
      <p class="mb-0">
        A role provided access to predefined menus and features so that depending on assigned role an administrator can have access to what he need
      </p>
    </VCol>

   
    

    <VCol cols="12">
      <!-- 👉 User List Table  -->
      <UserList />
    </VCol>
  </VRow>
</v-card-text>
      </v-card>
   <!-- assign role dialog -->
   <VDialog
        v-model="AddRole"
        max-width="500px"
      >
        <VCard>
          <v-card-text>
          <div class="d-flex justify-space-between mb-3">
              <h4 class="mt-1">ADD ROLE</h4>
             <v-avatar size="25" ><VIcon icon="tabler-x" color="error" @click="closeAddRole"></VIcon></v-avatar>
          </div>
          <hr>
          <AppTextField
    class="mt-3"
      label=" ADD ROLE  *"
      placeholder="role"
      v-model="role"
      :rules="[requiredValidator]"

    />
   
          </v-card-text>
    <div class="d-flex justify-end">
          <VCardActions>
            <VSpacer />
    
            <VBtn
              color="error"
              variant="outlined"
              @click="closeAddRole"
            >
              Close
            </VBtn>
    
            <VBtn
            :disabled="pStore.LoadingData"
            :loading="pStore.LoadingData"
              color="primary"
              variant="elevated"
              @click="addNewRole"
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
import { usePermissionStore } from '@/store/permission';
const pStore = usePermissionStore()
const role =ref("")
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
    title: "Roles",
    disabled: true,
    link: "/roles",
  },
];
const AddRole = ref(false)
const openAddRole = () =>{
  AddRole.value = true
}
const closeAddRole = () =>{
  AddRole.value = false
}
// add role api call
async function addNewRole(){
// await pStore.addNewUserRole({
//   name: role.value
// })
const formData = new FormData();
formData.append("name", role.value);
await pStore.addNewUserRole(formData);
closeAddRole()
}
const rolesData = computed(()=>{
  return pStore.allRoles
})
const ListRoles = async () =>{
  alert('trigered')
await pStore.GetAllRoles()
}
ListRoles();

</script>
