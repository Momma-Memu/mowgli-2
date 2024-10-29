<script setup>
import { RouterView, useRouter } from "vue-router";
import FooterComponent from "./components/FooterComponent.vue";

const router = useRouter();

window.addEventListener("mo-route-event", (event) => {
  try {
    const newLocation = event.detail;
    router.push(newLocation);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <mo-nav></mo-nav>
  <RouterView />
  <footer>
    <FooterComponent></FooterComponent>
  </footer>
</template>
