<script setup>
import MowgliChart from '../Mowgli/objects/internal/Chart';
const mowgliChart = new MowgliChart();

</script>

<template>
  <mo-page>
    <mo-banner
      v-bind:mo-title="mowgliChart.name" 
      v-bind:mo-description="mowgliChart.description">
    </mo-banner>
    <mo-table v-bind:mobject="mowgliChart"></mo-table>
  </mo-page>
</template>