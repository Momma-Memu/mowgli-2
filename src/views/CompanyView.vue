<script setup>
import MowgliCompany from "../Mowgli/objects/internal/Company";
import { onMounted, ref } from "vue";

const companyData = ref(null);

onMounted(async () => {
const company = new MowgliCompany();
  const [, data] = await company.get();
  companyData.value = data;

  console.log(companyData)
});

</script>

<template>
  <div class="wrapper">

  </div>
</template>

<style>
.wrapper {
  width: 100%;
  padding: 1rem;
}
</style>
