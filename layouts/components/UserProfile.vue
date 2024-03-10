<script setup>
import { useLoginStore } from "@/store/login";
import avatar1 from '@images/avatars/avatar-1.png';
import { useRouter } from "vue-router";
const router = useRouter()
const lStore = useLoginStore()
const getProfile = computed(() => {
  // console.log(lStore.loggedInUser, 'trucks');
  return lStore.loggedInUser;
});
// onBeforeMount(async () => {
//   try {
//     // Assuming there's a method in your store to load user data
//     await lStore.fetchLoggedInUser()
//   } catch (error) {
//     console.error('Error loading user data:', error);
//   }
// });
// const user = lStore.loggedInUser
// console.log(user, 'from user profile');
const pushToSetting = ()=>{
  router.push('/setting')
}
async function logout(){
  await lStore.logout();
}
</script>

<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" bordered color="success">
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold" :disabled="lStore.userLoading" :loading="lStore.userLoading">
              {{ getProfile.name }}
            </VListItemTitle>
            <VListItemSubtitle>{{ getProfile.user_type }}</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-user"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem> -->

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="tabler-settings" size="22" />
            </template>

            <VListItemTitle @click="pushToSetting">Settings</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-currency-dollar"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem> -->

          <!-- 👉 FAQ -->
          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-help"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem> -->

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem to="/">
            <template #prepend>
              <VIcon class="me-2" icon="tabler-logout" size="22" />
            </template>

            <VListItemTitle @click="logout">Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
