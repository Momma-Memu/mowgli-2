<script setup>
import { onMounted, ref } from "vue";
// import MowgliSetting from '../Mowgli/objects/internal/Setting';
import MowgliPlot from '../Mowgli/objects/internal/Plot';


// const settings = new MowgliSetting();
const plots = new MowgliPlot();
const container = ref();

onMounted(() => {
  /** @type { HTMLDivElement } */
  const div = container.value;

  // div.append(settings.buildForm());
  div.append(plots.buildForm());
});

</script>

<template>
  <mo-page>
    <mo-banner
        v-bind:mo-title="'Settings'" 
        v-bind:mo-description="'Changing the settings below alter application behavior globally for all users within your group.'">
    </mo-banner>

    <div ref="container"></div>
  </mo-page>
</template>
