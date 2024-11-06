<script setup>
import MowgliCompany from "../Mowgli/objects/internal/Company";
import { onMounted, ref } from "vue";

const company = new MowgliCompany();
const companyData = ref(null);

onMounted(async () => {
  const [, data] = await company.get();
  companyData.value = data;

  console.log(company.state)
});

</script>

<template>
  <div class="wrapper">
    <mo-banner>
      {{ company.name }}
      <span slot="description">
        Click "Edit", to alter your Company information.
      </span>
    </mo-banner>
  </div>
</template>

<style>
.wrapper {
  width: 100%;
  padding: 1rem;
}

/* .banner {
  font-size: var(--mo-size-10);
  color: var(--mo-blue-700);
} */
</style>
