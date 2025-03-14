import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  watch(
    () => count.value,
    () => {
      console.log('count changed to:', count.value);
    },
  );

  return { count, doubleCount, increment };
});
