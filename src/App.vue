<script setup>
import { RouterView } from "vue-router";
import FooterComponent from "./components/FooterComponent.vue";
// import NavComponent from "./components/NavComponent.vue";
</script>

<template>
  <!-- <NavComponent></NavComponent> -->
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
