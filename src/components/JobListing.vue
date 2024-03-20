<template>
  <ul>
    <TransitionGroup>
      <li
        v-for="job in jobsStore.filteredJobs"
        :key="job.id"
        class="job-list-items"
      >
        <div class="container | flow" :class="{ highlight: job.featured }">
          <div class="job__image">
            <img :src="job.logo" alt="" />
          </div>
          <div class="job__details | flow">
            <div class="job__details--main-info">
              <span class="job__company">{{ job.company }}</span>
              <span v-if="job.new" class="job__pill job__pill--new">NEW!</span>
              <span v-if="job.featured" class="job__pill job__pill--featured"
                >FEATURED</span
              >
            </div>
            <h2 class="job__position">
              <a>{{ job.position }}</a>
            </h2>
            <div class="job__details--sub-info">
              <span class="job__sub-info">{{ job.postedAt }}</span>
              <span class="job__sub-info">{{ job.contract }}</span>
              <span class="job__sub-info">{{ job.location }}</span>
            </div>
          </div>
          <ul class="job__tags">
            <li>
              <button @click="jobsStore.addFilter(job.role)">
                {{ job.role }}
              </button>
            </li>
            <li>
              <button @click="jobsStore.addFilter(job.level)">
                {{ job.level }}
              </button>
            </li>
            <li v-for="language in job.languages">
              <button @click="jobsStore.addFilter(language)">
                {{ language }}
              </button>
            </li>
          </ul>
        </div>
      </li>
    </TransitionGroup>
  </ul>
</template>

<script setup>
import { useJobsStore } from '@/stores/jobs';
const jobsStore = useJobsStore();
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(20%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-leave-active {
  position: absolute;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-move {
  transition: transform 0.5s ease;
}
</style>
