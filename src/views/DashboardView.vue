<script setup>
import { onMounted, ref } from "vue";
import MowgliDashboard from '../Mowgli/objects/internal/Dashboard';
import MoChart from '../Mowgli/components/dashboard/chart';

const dashData = ref(null);

onMounted(async () => {
  const dashboard = new MowgliDashboard();
  await dashboard.get();

  dashData.value = dashboard.state;
});
</script>

<template>
  <!-- <mo-page> -->
    <!-- <mo-banner v-bind:mo-title="'Dashboard'"></mo-banner> -->
    <!-- <div class="charts-container">
    </div> -->
  <!-- </mo-page> -->
  <div class="charts">
    <div ref="container" class="container"  v-for="chart in dashData" :key="chart.id">
      <mo-chart v-bind:chart=chart></mo-chart>
    </div>
  </div>
</template>

<style>
.charts-container {
  width: 100%;
  overflow-x: auto;
}
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
  max-width: 900px;
  flex-grow: 1;
}
</style>