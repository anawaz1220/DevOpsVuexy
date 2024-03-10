<template>
  
        <h3>PASSWORD</h3>
        <v-form class="mt-3">
        <AppTextField
    label="OLD PASSWORD *"
    placeholder="old password"
  />
  <div class="d-flex justify-space-between mt-3 gap-3">
    <AppTextField
    
    label="NEW PASSWORD *"
    placeholder="new password"
  />
  <AppTextField
    label="CONFIRM PASSWORD"
    placeholder="confirm password"
  />
  </div>
  <v-btn primary class="mt-3"> submit </v-btn>
</v-form>
   
</template>
