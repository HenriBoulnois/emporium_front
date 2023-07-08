<template>
  <div>
    Catégories les plus populaires :
    <div class="grid grid-cols-3 text-center divide-x">
      <div class="p-5 h-full grid place-items-center">
        <div
          v-if="mostPopular"
          class="grid place-items-center cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { q: mostPopular[0].type.name }
            })
          "
        >
          <img :src="mostPopular[0].imageTypePath" class="shadow-lg shadow-black mb-5 max-w-54 max-h-64">
          <div>{{ mostPopular[0].count }} {{ mostPopular[0].type.name }}</div>
        </div>
      </div>
      <div class="p-5 h-full grid place-items-center">
        <div
          v-if="mostPopular"
          class="grid place-items-center cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { q: mostPopular[1].type.name }
            })
          "
        >
          <img :src="mostPopular[1].imageTypePath" class="shadow-lg shadow-black mb-5 max-w-54 max-h-64">
          <div>{{ mostPopular[1].count }} {{ mostPopular[1].type.name }}</div>
        </div>
      </div>
      <div class="p-5 h-full grid place-items-center">
        <div
          v-if="mostPopular"
          class="grid place-items-center cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { q: mostPopular[2].type.name }
            })
          "
        >
          <img :src="mostPopular[2].imageTypePath" class="shadow-lg shadow-black mb-5 max-w-54 max-h-64">
          <div>{{ mostPopular[2].count }} {{ mostPopular[2].type.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MostPopularCat',
  data () {
    return {
      mostPopular: undefined
    };
  },
  async fetch () {
    await this.$axios
      .$get('https://emporiumback.fly.dev/type/popular')
      .then((response) => {
        this.mostPopular = response;
      });
  },
  methods: {}
};
</script>
