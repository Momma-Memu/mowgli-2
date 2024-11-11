<script setup>
import MowgliCompany from "../Mowgli/objects/internal/Company";
import { onMounted, ref } from "vue";

const company = new MowgliCompany();
const companyData = ref(null);

onMounted(async () => {
  const [, data] = await company.get();
  companyData.value = data;
});

</script>

<template>
  <mo-page>
    <mo-banner 
      v-bind:mo-title="company.name" 
      mo-description='Click "Edit", to alter your Company information.'>
    </mo-banner>
    <div class="card">
      <div>Title: {{ companyData ? companyData.name : "" }}</div>
      <div>Description: {{ companyData ? companyData.description : "" }}</div>
      <div>Address: {{ companyData ? companyData.address : "" }}</div>
    </div>
  </mo-page>
</template>

<style>
.card {
  max-width: 437px;
  background-color: white;
  box-shadow: var(--mo-box-shadow);
  padding: var(--mo-padding);
  border-radius: var(--mo-border-radius);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
