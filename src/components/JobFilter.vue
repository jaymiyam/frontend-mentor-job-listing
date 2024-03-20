<template>
  <div class="filters__container">
    <p v-if="jobsStore.filters.length === 0">Click the tags to add filter...</p>
    <ul>
      <li v-for="filter in jobsStore.filters">
        <span class="filters__name">{{ filter }}</span>
        <button @click="jobsStore.deleteFilter(filter)" class="filters__delete">
          <img src="/images/icon-remove.svg" alt="" />
        </button>
      </li>
    </ul>
    <button
      v-if="jobsStore.filters.length > 0"
      @click="jobsStore.clearFilters"
      class="filters__clear"
    >
      clear
    </button>
  </div>
</template>

<script setup>
import { useJobsStore } from '@/stores/jobs';
const jobsStore = useJobsStore();
</script>
