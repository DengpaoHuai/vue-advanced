<script setup lang="ts">
const value = defineModel<{
  value: string;
}>();
/*
const value = defineModel({
    value: {
        type: String,
        default: ''
    }
})
*/
</script>

<template>
  <input type="text" v-model="value" />
</template>

<style scoped>
input[type='text'] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
}
</style>
