<template>
  <div>
    <ul class="justify-items-center text-center pt-1">
      <li class="bg-gray-600 rounded-lg m-4 grid grid-cols-[max(10%)_1fr_1fr_1fr_1fr] p-2 items-center">
        <a>Image</a>
        <a>Nom</a>
        <a>Auteur</a>
        <a>Genre</a>
        <a>Catégorie</a>
      </li>
      <li
        v-for="oeuvre in oeuvres"
        :key="oeuvre.idOeuvre"
        class="bg-gray-600 hover:bg-gray-700 rounded-lg m-4 cursor-pointer grid grid-cols-[max(10%)_1fr_1fr_1fr_1fr] p-4 items-center"
        @click="
          $router.push({ path: '/oeuvre', query: { q: oeuvre.idOeuvre } })
        "
      >
        <img :src="oeuvre.image">
        <a>{{ oeuvre.titre }}</a>
        <a>{{ oeuvre.auteur.name }}</a>
        <a>{{ oeuvre.genre.name }}</a>
        <a>{{ oeuvre.type.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OeuvresPage',
  data () {
    return {
      oeuvres: []
    };
  },
  async fetch () {
    const response = await this.$axios.$get(
      'https://emporiumback.fly.dev/oeuvres'
    );
    this.oeuvres = response;
  }
};
</script>
