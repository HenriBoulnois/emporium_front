<template>
  <div>
    <div class="justify-items-center text-center ">
      <div
        class="bg-gray-600 rounded-lg grid grid-cols-[1fr_1fr_1fr_1fr_1fr] p-2 items-center"
      >
        <a>Image</a>
        <a>Nom</a>
        <a>Auteur</a>
        <a>Genre</a>
        <a>Catégorie</a>
      </div>
      <div
        v-for="oeuvre in oeuvres"
        :key="oeuvre.idOeuvre"
        class="bg-gray-600 hover:bg-gray-700 rounded-lg my-4 cursor-pointer grid grid-cols-[1fr_1fr_1fr_1fr_1fr] p-4 place-items-center"
        @click="
          $router.push({ path: '/oeuvre', query: { q: oeuvre.idOeuvre } })
        "
      >
        <img v-if="oeuvre.imagePath" :src="oeuvre.imagePath" class="max-h-28">
        <ImagePlaceholder v-if="!oeuvre.imagePath" />
        <a>{{ oeuvre.titre }}</a>
        <a>{{ oeuvre.auteur.name }}</a>
        <a>{{ oeuvre.genre.name }}</a>
        <a>{{ oeuvre.type.name }}</a>
      </div>
    </div>
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
