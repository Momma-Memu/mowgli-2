<script setup>
import MowgliUser from "../Mowgli/objects/internal/User";

const mowgliUser = new MowgliUser();
window.mowgliUser = mowgliUser;
</script>

<template>
  <mo-page>
    <mo-banner
      v-bind:mo-title="mowgliUser.name" 
      v-bind:mo-description="mowgliUser.description">
    </mo-banner>
    <mo-table v-bind:mobject="mowgliUser"></mo-table>
  </mo-page>
</template>