<template>
  <div>
    <ul class="justify-items-center text-center">
      <li class="grid grid-cols-[max(10%)_1fr_1fr_1fr_1fr]">
        <a>Image</a>
        <a>Nom</a>
        <a>Type</a>
        <a>Catégorie</a>
        <a>Description</a>
      </li>
      <li
        v-for="item in items"
        :key="item.idOeuvre"
        class="bg-gray-600 hover:bg-gray-700 rounded-lg m-4 cursor-pointer grid grid-cols-[max(10%)_1fr_1fr_1fr_1fr] p-4 items-center"
        @click="
          $router.push({ path: '/oeuvre', query: { q: item.idOeuvre } })
        "
      >
        <img :src="item.image">
        <a>{{ item.titre }}</a>
        <a>{{ item.description }}</a>
        <a>{{ item.type.name }}</a>
        <a>{{ item.auteur.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data () {
    return {
      items: []
    };
  },
  async fetch () {
    if (this.$route.query.q != null) {
      const response = await this.$axios.$get(
        'https://emporiumback.fly.dev/oeuvres'
      );
      this.items = response;
    }
    if (this.$route.query.g != null) {
      const response = await this.$axios.$get(
        'https://emporiumback.fly.dev/oeuvres/genre/' + this.$route.query.g
      );
      this.items = response;
    }
  },
  watch: {
    '$route.query': '$fetch'
  }
};
</script>
