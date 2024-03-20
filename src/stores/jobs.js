import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref([]);
  const filters = ref([]);

  async function fetchJobs() {
    const response = await fetch('./data.json');
    const data = await response.json();
    jobs.value = data;
  }

  fetchJobs();

  const filteredJobs = computed(() => {
    if (filters.value.length === 0) {
      console.log('no filter');
      return jobs.value;
    }

    const tempFilteredJobs = ref([]);

    filters.value.forEach((filter) => {
      //wrap all checking conditions (boolean) into the return() statement
      // DO NOT change the jobs.value directly!!! use a temp holder for the values
      tempFilteredJobs.value = jobs.value.filter((job) => {
        return (
          job.role.includes(filter) ||
          job.level.includes(filter) ||
          job.languages.some((language) => language.includes(filter))
        );
      });
    });
    return tempFilteredJobs.value;
  });

  function addFilter(option) {
    if (filters.value.includes(option)) {
      console.log('filter already added');
      return;
    }
    filters.value.push(option);
  }

  function deleteFilter(option) {
    const index = filters.value.indexOf(option);
    filters.value.splice(index, 1);
  }

  function clearFilters() {
    console.log('filters cleared');
    filters.value = [];
  }

  // function handleFilters() {
  //   console.log('handled');
  //   filters.value.forEach((filter) => {
  //     //wrap all checking conditions (boolean) into the return() statement
  //     jobs.value = jobs.value.filter((job) => {
  //       return (
  //         job.role.includes(filter) ||
  //         job.level.includes(filter) ||
  //         job.languages.some((language) => language.includes(filter))
  //       );
  //     });
  //   });
  // }

  return {
    jobs,
    filteredJobs,
    filters,
    addFilter,
    deleteFilter,
    clearFilters,
    fetchJobs,
  };
});

// export const useJobsStore = defineStore('jobs', {
//   state: () => ({
//     jobs: [],
//   }),
//   actions: {
//     async fetchJobs() {
//       const response = await fetch('src/stores/data.json');
//       const data = await response.json();
//       this.jobs = data;
//     },
//   },
// });
