import { ref, watch, type Ref } from 'vue';

const useFetch = <T>(url: Ref<string>) => {
  const data = ref<T>();
  const loading = ref(true);
  const error = ref<Error | null>(null);

  const getData = async () => {
    fetch(url.value)
      .then((res) => res.json())
      .then((response) => {
        data.value = response;
      })
      .catch((err) => {
        if (err instanceof Error) {
          error.value = err;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  watch(
    url,
    () => {
      getData();
    },
    { immediate: true },
  );

  /* 
  watchEffect(() => {
    getData();
  });
*/

  /*onMounted(() => {
    getData();
  });
*/
  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
