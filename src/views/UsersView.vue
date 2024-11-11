<script setup>
import MowgliUser from "../Mowgli/objects/internal/User";

const mowgliUser = new MowgliUser();
window.mowgliUser = mowgliUser;
</script>

<template>
  <div class="wrapper">
    <mo-table v-bind:mobject="mowgliUser">
      <div class="table-name">Users</div>
    </mo-table>
  </div>
</template>

<style>
.wrapper {
  width: 100%;
  padding: 1rem;
}
</style>
