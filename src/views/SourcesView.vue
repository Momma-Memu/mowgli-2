<script setup>
import MowgliSources from "../Mowgli/objects/internal/sources/Source";
const sourceObject = new MowgliSources();

</script>

<template>
  <div class="wrapper">
    <mo-table v-bind:mobject="sourceObject">
      <div class="table-name">Sources</div>
    </mo-table>
  </div>
</template>
<style>
.wrapper {
  width: 100%;
  padding: 1rem;
}
</style>
