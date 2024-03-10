
<script setup>
import EzztonCardStatistics from '@/views/logistics/EzztonCardStatistics.vue';
import LatestTransactionsDashboard from '@/views/logistics/LatestTransactionsDashboard.vue';
import MaterialWiseTransactions from '@/views/logistics/MaterialWiseTransactions.vue';
import WeatherForecast from '@/views/logistics/WeatherForecast.vue';
// definePageMeta({
//   middleware: 'auth'
// })
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <EzztonCardStatistics />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <MaterialWiseTransactions />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <WeatherForecast />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <LatestTransactionsDashboard />
    </VCol>
  </VRow>
</template>
