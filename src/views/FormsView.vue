<script setup>
import MowgliForm from '../Mowgli/objects/internal/Form';
const mowgliForm = new MowgliForm();

</script>

<template>
  <mo-page>
    <mo-banner
      v-bind:mo-title="mowgliForm.name" 
      v-bind:mo-description="mowgliForm.description">
    </mo-banner>
    <mo-table v-bind:mobject="mowgliForm"></mo-table>
  </mo-page>
</template>