<template>
  <div class="text-white">Query: {{ query }}</div>
</template>

<script>
export default {
  name: 'SearchPage',
  computed: {
    query () {
      return this.$route.query.q;
    }
  },
  watchQuery: ['q']
};
</script>
