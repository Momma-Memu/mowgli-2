<script setup>
import { RouterView } from "vue-router";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <mo-nav></mo-nav>
  <h1></h1>
  <mo-icon
    mo-spin-hov
    mo-grow-hov
    mo-fa="fa-sharp-duotone fa-solid fa-gear-complex"
  ></mo-icon>
  <RouterView />
  <footer>
    <FooterComponent></FooterComponent>
  </footer>
</template>
