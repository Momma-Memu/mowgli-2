<script setup>
import MowgliSources from "../Mowgli/objects/internal/sources/Source";
const sourceObject = new MowgliSources();

</script>

<template>
  <mo-page>
    <mo-banner
      v-bind:mo-title="sourceObject.name" 
      v-bind:mo-description="sourceObject.description">
    </mo-banner>
    <mo-table v-bind:mobject="sourceObject"></mo-table>
  </mo-page>
</template>