<script setup>
import { RouterView, useRouter, useRoute } from "vue-router";
import FooterComponent from "./components/FooterComponent.vue";

const router = useRouter();
const route = useRoute();

window.addEventListener("mo-route-event", ({ detail }) => {
  try {
    if (route.path !== detail) {
      router.push(detail);
    }
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
