import { getPlanets } from '@/services/planet.service';
import type { Planet } from '@/types/planet';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

const usePlanetStore = defineStore('planet', () => {
  const planets = ref<Planet[]>([]);

  onMounted(() => {
    getData();
  });

  const getData = async () => {
    const response = await getPlanets();
    planets.value = response.results;
  };

  const setPlanets = (planetsList: Planet[]) => {
    planets.value = planetsList;
  };

  return {
    planets,
    setPlanets,
    getData,
  };
});

export default usePlanetStore;
