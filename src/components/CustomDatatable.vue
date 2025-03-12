<script setup lang="ts">
import type { Planet } from '@/types/planet';

const planets = defineProps<{
  rows: Planet[];
  columns: { field: string; label: string }[];
}>();
</script>

<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.field">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.url">
          <td v-for="column in columns" :key="column.field">
            <slot :name="column.field" :cequevousvoulez="row">
              {{ row[column.field] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
