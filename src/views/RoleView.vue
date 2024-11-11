<script setup>
import MowgliRole from '../Mowgli/objects/internal/Role';
const mowgliRole = new MowgliRole();

</script>

<template>
  <div class="wrapper">
    <mo-table v-bind:mobject="mowgliRole">
      <div class="table-name">Roles</div>
    </mo-table>
  </div>
</template>

<style>
.wrapper {
  width: 100%;
  padding: 1rem;
}
</style>
