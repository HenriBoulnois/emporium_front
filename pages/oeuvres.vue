<template>
  <div>
    <ul class="justify-items-center text-center pt-1">
      <li
        class="bg-gray-600 rounded-lg m-4 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] p-2 items-center"
      >
        <a>Image</a>
        <a>Nom</a>
        <a>Auteur</a>
        <a>Genre</a>
        <a>Catégorie</a>
      </li>
      <li
        v-for="oeuvre in oeuvres"
        :key="oeuvre.idOeuvre"
        class="bg-gray-600 hover:bg-gray-700 rounded-lg m-4 cursor-pointer grid grid-cols-[1fr_1fr_1fr_1fr_1fr] p-4 place-items-center"
        @click="
          $router.push({ path: '/oeuvre', query: { q: oeuvre.idOeuvre } })
        "
      >
        <img v-if="oeuvre.imagePath" :src="oeuvre.imagePath">
        <ImagePlaceholder v-if="!oeuvre.imagePath" />
        <a>{{ oeuvre.titre }}</a>
        <a>{{ oeuvre.auteur.name }}</a>
        <a>{{ oeuvre.genre.name }}</a>
        <a>{{ oeuvre.type.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import ImagePlaceholder from '~/components/ImagePlaceholder.vue';

export default {
  name: 'OeuvresPage',
  comments: {
    ImagePlaceholder
  },
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
