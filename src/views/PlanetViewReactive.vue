<script setup lang="ts">
import CustomDatatable from '@/components/CustomDatatable.vue';
import usePlanetsStore from '@/stores/usePlanets';
import { toRefs } from 'vue';

const { planets } = usePlanetsStore();

const columns = [
  { field: 'name', label: 'Name' },
  { field: 'population', label: 'Population' },
  { field: 'climate', label: 'Climate' },
];
</script>

<template>
  <CustomDatatable :rows="planets" :columns="columns">
    <template #population="{ cequevousvoulez }">
      <span>{{ cequevousvoulez.population }}</span>
    </template>
  </CustomDatatable>
</template>

<style scoped>
span {
  color: #ff0000;
}
</style>
