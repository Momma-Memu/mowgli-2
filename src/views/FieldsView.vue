<script setup>
import MowgliField from '../Mowgli/objects/internal/Field';
const mowgliField = new MowgliField();

</script>

<template>
  <div class="wrapper">
    <mo-table v-bind:mobject="mowgliField">
      <div class="table-name">Fields</div>
    </mo-table>
  </div>
</template>

<style>
.wrapper {
  width: 100%;
  padding: 1rem;
}
</style>
