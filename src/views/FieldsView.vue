<script setup>
import MowgliField from '../Mowgli/objects/internal/Field';
const mowgliField = new MowgliField();
window.mowgliField = mowgliField;

</script>

<template>
  <mo-page>
    <mo-banner      
        v-bind:mo-title="mowgliField.name" 
        v-bind:mo-description="mowgliField.description">
      </mo-banner>
    <mo-table v-bind:mobject="mowgliField"></mo-table>
  </mo-page>
</template>
