<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef, type Ref } from 'vue';
import InputText from './InputText.vue';
import type { Movie } from '@/schemas/movie.schema';

const props = defineProps<{
  //name: keyof Movie; // 'title' | 'description' | 'rating'
  name: string;
  type?: string;
}>();

//const nameValue = toRef(props.name);
const { value, errorMessage } = useField(() => props.name);
//const { value, errorMessage } = useField(nameValue);
</script>

<template>
  <InputText v-model="value as string" />
  {{ errorMessage }}
</template>
