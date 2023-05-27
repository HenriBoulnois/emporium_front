<template>
  <div>
    Catégorie les plus populaires :
    <div class="grid grid-cols-3 text-center">
      <div class="bg-yellow-200 my-6 mx-6 rounded-lg">
        <div
          v-if="mostPopular"
          class="grid place-items-center cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { t: mostPopular[1].type.idType }
            })
          "
        >
          <div>Top 2</div>
          <img :src="mostPopular[1].imageTypePath">
          <div>{{ mostPopular[1].type.name }}</div>
          <div>{{ mostPopular[1].count }}</div>
        </div>
      </div>
      <div class="bg-yellow-500 mb-9 mx-6 rounded-lg">
        <div
          v-if="mostPopular"
          class="grid place-items-center cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { t: mostPopular[0].type.idType }
            })
          "
        >
          <div>Top 1</div>
          <img :src="mostPopular[0].imageTypePath">
          <div>{{ mostPopular[0].type.name }}</div>
          <div>{{ mostPopular[0].count }}</div>
        </div>
      </div>
      <div class="bg-yellow-100 mt-9 mx-6 rounded-lg">
        <div
          v-if="mostPopular"
          class="grid place-items-center cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { t: mostPopular[2].type.idType }
            })
          "
        >
          <div>Top 3</div>
          <img :src="mostPopular[2].imageTypePath">
          <div>{{ mostPopular[2].type.name }}</div>
          <div>{{ mostPopular[2].count }}</div>
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
