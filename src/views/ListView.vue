<script setup>
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import MowgliObjectManager from '../Mowgli/managers/ObjectManager';

const route = useRoute();
const manager = new MowgliObjectManager();
let mobject = manager.getMobject(route.params.object);

onMounted(() => {
});

watch(() => route.params.object, (name) => {
  mobject = manager.getMobject(name);
});
</script>

<template>
  <mo-page v-if="mobject">
    <mo-banner
        v-bind:mo-title="mobject.name" 
        v-bind:mo-description="mobject.description">
      </mo-banner>
    <mo-table v-bind:mobject="mobject"></mo-table>
  </mo-page>
  <div v-else>
    Loading...
  </div>
</template>
