<script setup>
import MowgliChart from '../Mowgli/objects/internal/Chart';
const mowgliChart = new MowgliChart();
</script>

<template>
  <div class="wrapper">
    <mo-table :moObject="mowgliChart" mo-name="Charts">
      <div class="table-name">Charts</div>
    </mo-table>
  </div>
</template>
<style>
.wrapper {
  width: 100%;
  padding: 1rem;
}
</style>
