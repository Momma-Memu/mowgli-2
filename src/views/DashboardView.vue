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

v-if="sources && sources.length" 

<template>
  <div ref="container" class="container"  v-for="chart in charts" :key="chart.id">
    <mo-chart v-bind:chart=chart></mo-chart>
  </div>
</template>
<style>
.container {
  padding: var(--mo-size-4);
  width: 100%;
}
</style>