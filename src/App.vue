<script setup>
import { RouterView, useRouter } from "vue-router";
import FooterComponent from "./components/FooterComponent.vue";

const router = useRouter();

window.addEventListener("mowgli-route-event", (event) => {
  try {
    const newLocation = event.detail;
    console.log(newLocation);
    router.push(newLocation);
  } catch(error) {
    console.log(error);
  }
});

</script>

<template>
  <mo-nav></mo-nav>
  <!-- <h1></h1>
  <mo-icon
    mo-spin-hov
    mo-grow-hov
    mo-fa="fa-sharp-duotone fa-solid fa-gear-complex"
  ></mo-icon> -->
  <RouterView />
  <footer>
    <FooterComponent></FooterComponent>
  </footer>
</template>
