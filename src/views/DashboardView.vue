<script setup>
import { onMounted } from "vue";
import MowgliDashboard from '../Mowgli/objects/internal/Dashboard';
import MoChart from '../Mowgli/components/dashboard/chart';

const dashboard = new MowgliDashboard();
let charts = dashboard.state;

onMounted(async () => {
  // TODO: NOT RENDERING ON FIRST RUN
  // My guess? v-for isnn't enough to bind to this component and trigger a re-render...
  if (!charts) {
    const [, data] = await dashboard.get();
    charts = data;
  }
});

</script>
<template>
  <div class="charts">
    <div ref="container" class="container"  v-for="chart in charts" :key="chart.id">
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