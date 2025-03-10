import type { Planet } from '@/types/planet';
import { onMounted, reactive, toRefs } from 'vue';

export const planetsStore = reactive<{
  planets: Planet[];
  loading: boolean;
  error: Error | null;
}>({
  planets: [],
  loading: false,
  error: null,
});

const usePlanetsStore = () => {
  onMounted(() => {
    const planets = localStorage.getItem('planets');

    if (planets) {
      console.log(JSON.parse(planets));
      planetsStore.planets = JSON.parse(planets);
      console.log(planetsStore.planets);
    }
  });

  const setPlanets = (planets: Planet[]) => {
    planetsStore.planets = planets;
    localStorage.setItem('planets', JSON.stringify(planets));
  };

  return {
    ...toRefs(planetsStore),
    setPlanets,
  };
};

export default usePlanetsStore;
