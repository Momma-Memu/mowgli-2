<script setup>
import MowgliRole from '../Mowgli/objects/internal/Role';
const mowgliRole = new MowgliRole();

</script>
<template>
  <mo-page>
    <mo-banner
      v-bind:mo-title="mowgliRole.name" 
      v-bind:mo-description="mowgliRole.description">
    </mo-banner>
    <mo-table v-bind:mobject="mowgliRole"></mo-table>
  </mo-page>
</template>