<template>
    <div class="d-flex justify-center align-center" v-if="mStore.LoadingData">
      <VProgressCircular size="50" indeterminate></VProgressCircular>
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
          <div class=" py-5 d-flex justify-end ">
            <v-btn @click="openAddMaterialDialog">ADD MATERIAL</v-btn>
          </div>
          <div class="d-flex justify-end flex-wrap ">
            <span class="search">
              <AppTextField
        style="inline-size: 15rem;"
          placeholder="Search here"
          append-inner-icon="tabler-search"
          v-model="search"
        />
            </span>
        </div>
          <VDataTable :headers="headers" :items="allMaterials" :items-per-page="options.itemsPerPage"
    :page="options.page" :search="search" class="mt-3">
           
          <!-- =========== -->
           <!-- Actions -->
        <template #item.actions="{ item }">
            <IconBtn @click="openEditDialog(item)">
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
            :length="Math.ceil(allMaterials.length / options.itemsPerPage)"
          />
        </div>
      </VCardText>
    </template>
          </VDataTable>
        </v-card-text>
        </VCard> 

        <!-- ============== ========-->
          <!-- ADD MATERIAL DIALOG -->
        <VDialog
        v-model="EditDialog"
        max-width="700px"
      >
        <VCard>
          <v-card-text>
          <div class="d-flex justify-space-between mb-3">
              <h4 class="mt-1">ADD MATERIALS</h4>
             <v-avatar size="25" ><VIcon icon="tabler-x" color="error" @click="closeEditDialog"></VIcon></v-avatar>
          </div>
          <hr>
    <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
      <AppTextField
      label="NAME *"
      placeholder="name"
      v-model="name"
      :rules="[requiredValidator]"

    />
    <AppTextField
    v-model="boardRate"
      label="BOARD RATE *"
      placeholder="board rate"
      :rules="[requiredValidator]"

    />
    </div>
    <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Slab rate for materials"
        />
        <div class="d-flex gap-3" v-if="checkbox">
          <AppTextField
          v-model="slabWeight"
    label="SLAB WEIGHT(KG)*"
    placeholder=" slab weight"
    :rules="[requiredValidator]"

  />
  <AppTextField
  v-model="slabRate"
    label="SLAB RATE*"
    placeholder="slab rate"
    :rules="[requiredValidator]"

  /> <AppTextField
  v-model="weightBreak"
    label="WEIGHT BREAK(KG)*"
    placeholder=" weight break"
    :rules="[requiredValidator]"

  />
        </div>
      </VCol>
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
              :disabled="mStore.LoadingData"
              :loading="mStore.LoadingData"
              @click.prevent="storeMaterial"
            >
              Submit
            </VBtn>
    
            <VSpacer />
          </VCardActions>
      </div>
        </VCard>
      </VDialog>

       <!-- ========================= -->
    <!-- 👉 ADD  TRUCK  INFO DIALOG  -->
    <!-- select client  -->
    <VDialog
      v-model="addMaterial"
      max-width="550px"
    >
      <VCard class="px-5 py-5">
        <div class="d-flex justify-space-between mb-3">
          <VCardTitle> ADD MATERIAL </VCardTitle>
          <VAvatar rounded="lg"><VIcon
            icon="tabler-x"
            color="error"
            @click="closeAddMaterialDialog"
          /></VAvatar>
        </div>
        <hr>
        
        
        <div class="d-flex justify-space-between gap-3 flex-wrap mt-3">
          <AppTextField
            v-model="MaterialValue"
            label=" NAME*"
            placeholder="Material Name"
        :rules="[requiredValidator]"

          />
         </div>
        <div class="d-flex justify-end mt-4">
          <VCardActions>
            <VSpacer />
            <VBtn
              color="error"
              variant="outlined"
              @click="closeAddMaterialDialog"
            >
              close
            </VBtn>
            <VBtn
              color="primary"
              variant="elevated"
              @click="saveMaterialinfo(MaterialValue)"
            >
              submit
            </VBtn>
            <VSpacer />
          </VCardActions>
        </div>
      </VCard>
    </VDialog>
    <!-- 👉 ADD  TRUCK  INFO DIALOG  -->
    </span>
</template>
<script setup>
const name = ref("")
const materialId = ref("");
const boardRate = ref("")
const slabRate = ref("")
const MaterialValue = ref(null)
const slabWeight = ref("")
const weightBreak = ref("")
const search =ref("")
const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })
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
    title: "View Materials",
    disabled: true,
    link: "/ViewMaterial",
  },
];
import { useMaterialsStore } from "@/store/material";
import { VDataTable } from 'vuetify/labs/VDataTable';
const mStore = useMaterialsStore();
const allMaterials = computed(() =>{
  return mStore.allMaterials;
})
async function getMaterials(){
    mStore.fetchAllMaterials()
}

//add material 
const addMaterial = ref(false)
const openAddMaterialDialog = () => {
  addMaterial.value = true
}
const closeAddMaterialDialog = () => {
  addMaterial.value = false
}

getMaterials()
  // import data from '@/views/demos/forms/tables/data-table/datatable'
  // actions
  const checkbox = ref(false)

  const EditDialog = ref(false)
const  openEditDialog =(item ) => {
  EditDialog.value = true;
if(item?.id){
  materialId.value = item?.id;
}
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
      title: 'Materials',
      key: 'name',
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
  

   // store material
   async function storeMaterial(){
  const formData = new FormData()
  if(materialId.value){
    formData.append("materialId", materialId.value);
  }
  formData.append("board_rate",boardRate.value)
  formData.append("slab_rate",slabRate.value)
  formData.append("slab_weight",slabWeight.value)
  formData.append("weight_break",weightBreak.value)
    mStore.addNewMaterial(formData)
    closeEditDialog()
    getMaterials()
  }

  async function saveMaterialinfo(MaterialValue) {
  
  const payload = {
    name: MaterialValue,  
  }

  addMaterial.value = false
  console.log(payload, 'before request-vue');
  await mStore.addNewMaterialType(payload)
}

</script>
