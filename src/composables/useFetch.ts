import { onMounted, ref } from 'vue';

const useFetch = <T>(url: string) => {
  const data = ref<T>();
  const loading = ref(true);
  const error = ref<Error | null>(null);

  onMounted(() => {
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        data.value = response.results;
      })
      .catch((err) => {
        if (err instanceof Error) {
          error.value = err;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  });

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
