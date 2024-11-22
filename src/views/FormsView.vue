<script setup>
import MowgliForm from '../Mowgli/objects/internal/Form';
const mowgliForm = new MowgliForm();

</script>

<template>
  <div class="wrapper">
    <mo-table v-bind:mobject="mowgliForm">
      <div class="table-name">Forms</div>
    </mo-table>
  </div>
</template>

<style>
.wrapper {
  width: 100%;
  padding: 1rem;
}
</style>
