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
      <!-- ================= -->
      <!-- daily reports -->
      <h3 class="ms-2 fw-300" >DAILY REPORTS</h3>
     <v-row class="gap-4">
        <v-col lg="4" md="6" sm="12" cols="12">
           
            <v-card class="pt-3">
                
                    <div class="d-flex justify-space-between py-4 px-4">
                        <div>
                            <h3 class="heading-topps">TOPPS</h3>
                            <p class="pt-1">Daily Tonnage Reports</p>
                        </div>
<v-avatar><v-icon icon="tabler-antenna-bars-5" size="30"></v-icon></v-avatar>
                    </div>
                    <div class="d-flex justify-space-between bg-warning py-2">
                        <VBtn variant="outlined" class="ms-3 px-3 text-white" rounded="0" >
                            <v-icon icon="tabler-eye"></v-icon>
                            VIEW
                        </VBtn>
                       <v-avatar class="me-4"><v-icon icon="tabler-arrow-wave-right-up" color="white" ></v-icon></v-avatar> 
                    </div>
               
            </v-card>
        </v-col>
        <v-col lg="4" md="6" sm="12" cols="12">

            
            <v-card class="pt-3">
              
                    <div class="d-flex justify-space-between py-4 px-4">
                        <div>
                            <h3 class="text-success">GFL</h3>
                            <p class="pt-1">Daily Tonnage Reports</p>
                        </div>
<v-avatar><v-icon icon="tabler-file-description" size="30"></v-icon></v-avatar>
                    </div>
                    <div class="d-flex justify-space-between bg-success py-2">
                        <VBtn variant="outlined" class="ms-3 px-3 text-white" rounded="0" >
                            <v-icon icon="tabler-eye"></v-icon>
                            VIEW
                        </VBtn>
                       <v-avatar class="me-4"><v-icon icon="tabler-arrow-wave-right-up" color="white" ></v-icon></v-avatar> 
                    </div>
               
            </v-card>

        </v-col>
     </v-row>
       <!-- ================= -->
      <!-- WEEKLY REPORTS -->
      <h3 class="ms-2 fw-300 mt-5" >WEEKLY REPORTS</h3>
     <v-row class="gap-4">
        <v-col lg="4" md="6" sm="12" cols="12">
           
            <v-card class="pt-3">
              
                    <div class="d-flex justify-space-between py-4 px-4">
                        <div>
                            <h3 class="text-error">TOPPS</h3>
                            <p class="pt-1"> Reports</p>
                        </div>
<v-avatar><v-icon icon="tabler-calendar" size="30"></v-icon></v-avatar>
                    </div>
                    <div class="d-flex justify-space-between bg-error py-2">
                        <VBtn variant="outlined" class="ms-3 px-3 text-white" rounded="0" >
                            <v-icon icon="tabler-eye"></v-icon>
                            VIEW
                        </VBtn>
                       <v-avatar class="me-4"><v-icon icon="tabler-arrow-wave-right-up" color="white" ></v-icon></v-avatar> 
                    </div>
                
            </v-card>
        </v-col>
        <v-col lg="4" md="6" sm="12" cols="12">
            <v-card class="pt-3">
             
                    <div class="d-flex justify-space-between py-4 px-4">
                        <div>
                            <h3 class="text-success">GFL</h3>
                            <p class="pt-1">Daily Tonnage Reports</p>
                        </div>
<v-avatar><v-icon icon="tabler-file-description" size="30"></v-icon></v-avatar>
                    </div>
                    <div class="d-flex justify-space-between bg-success py-2">
                        <VBtn variant="outlined" class="ms-3 px-3 text-white" rounded="0" >
                            <v-icon icon="tabler-eye"></v-icon>
                            VIEW
                        </VBtn>
                       <v-avatar class="me-4"><v-icon icon="tabler-arrow-wave-right-up" color="white" ></v-icon></v-avatar> 
                    </div>
              
            </v-card>

        </v-col>
     </v-row>
      <!-- ================= -->
      <!-- OTHER TRANSACTION -->
      <h3 class="ms-2 fw-300 mt-5" >OTHER REPORTS</h3>
     <v-row class="gap-4">
        <v-col lg="4" md="6" sm="12" cols="12">
           
            <v-card class="pt-3">
              
                    <div class="d-flex justify-space-between py-4 px-4">
                        <div>
                            <h3 class="text-info">TRANSACTION</h3>
                            <p class="pt-1">Client Group Reports</p>
                        </div>
<v-avatar><v-icon icon="tabler-download" size="30"></v-icon></v-avatar>
                    </div>
                    <div class="d-flex justify-space-between bg-info py-2">
                        <VBtn variant="outlined" class="ms-3 px-3 text-white" rounded="0" >
                            <v-icon icon="tabler-eye"></v-icon>
                            VIEW
                        </VBtn>
                       <v-avatar class="me-4"><v-icon icon="tabler-arrow-wave-right-up" color="white" ></v-icon></v-avatar> 
                    </div>
               
            </v-card>
        </v-col>
        <v-col lg="4" md="6" sm="12" cols="12">

            
            <v-card class="pt-3">
                <!-- <v-card-text > -->
                    <div class="d-flex justify-space-between py-4 px-4">
                        <div>
                            <h3 class="text-info">TRANSACTION</h3>
                            <p class="pt-1">Client Reports</p>
                        </div>
<v-avatar><v-icon icon="tabler-download" size="30"></v-icon></v-avatar>
                    </div>
                    <div class="d-flex justify-space-between bg-info py-2">
                        <VBtn variant="outlined" class="ms-3 px-3 text-white" rounded="0" >
                            <v-icon icon="tabler-eye"></v-icon>
                            VIEW
                        </VBtn>
                       <v-avatar class="me-4"><v-icon icon="tabler-arrow-wave-right-up" color="white" ></v-icon></v-avatar> 
                    </div>
               
            </v-card>

        </v-col>
     </v-row>


</template>
<script setup>
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
    title: "View Employees",
    disabled: true,
    link: "/employees",
  },
];


</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.heading-topps{
    color:rgb(245, 169, 27);
}

</style>
