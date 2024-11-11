<script setup>
import { onMounted, ref } from "vue";
import MowgliDashboard from '../Mowgli/objects/internal/Dashboard';
import MoChart from '../Mowgli/components/dashboard/chart';

const dashData = ref(null);

onMounted(async () => {
  const dashboard = new MowgliDashboard();
  await dashboard.get();

  dashData.value = dashboard.stateArray;
});
</script>

<template>
  <div class="charts">
    <div ref="container" class="container"  v-for="chart in dashData" :key="chart.id">
      <mo-chart v-bind:chart=chart></mo-chart>
    </div>
  </div>
</template>

<style>
.charts {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--mo-size-6);
  padding: var(--mo-size-6);
}

.container {
  width: 49%;
  min-width: 320px;
  max-width: 1200px;
  flex-grow: 1;
}
</style>