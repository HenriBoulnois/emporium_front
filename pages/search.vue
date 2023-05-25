<template>
  <div>
    <div class="justify-items-center text-center">
      <div class="bg-gray-600 rounded-lg grid grid-cols-[1fr_1fr_1fr_1fr_1fr] p-2 items-center">
        <a>Image</a>
        <a>Nom</a>
        <a>Auteur</a>
        <a>Genre</a>
        <a>Catégorie</a>
      </div>
      <div
        v-for="item in items"
        :key="item.idOeuvre"
        class="bg-gray-600 hover:bg-gray-700 rounded-lg my-4 cursor-pointer grid grid-cols-[1fr_1fr_1fr_1fr_1fr] p-4 place-items-center"
        @click="$router.push({ path: '/oeuvre', query: { q: item.idOeuvre } })"
      >
        <img v-if="item.imagePath" :src="item.imagePath" class="max-h-28">
        <ImagePlaceholder v-if="!item.imagePath" />
        <a>{{ item.titre }}</a>
        <a>{{ item.auteur.name }}</a>
        <a>{{ item.genre.name }}</a>
        <a>{{ item.type.name }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import ImagePlaceholder from '~/components/ImagePlaceholder.vue';

export default {
  name: 'SearchPage',
  components: {
    ImagePlaceholder
  },
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
    if (this.$route.query.a != null) {
      const response = await this.$axios.$get(
        'https://emporiumback.fly.dev/oeuvres/auteur/' + this.$route.query.a
      );
      this.items = response;
    }
    if (this.$route.query.t != null) {
      const response = await this.$axios.$get(
        'https://emporiumback.fly.dev/oeuvres/type/' + this.$route.query.t
      );
      this.items = response;
    }
    if (this.$route.query.s != null) {
      const response = await this.$axios.$get(
        'https://emporiumback.fly.dev/oeuvres/support/' + this.$route.query.s
      );
      this.items = response;
    }
    if (this.$route.query.e != null) {
      const response = await this.$axios.$get(
        'https://emporiumback.fly.dev/oeuvres/editeur/' + this.$route.query.e
      );
      this.items = response;
    }
  },
  watch: {
    '$route.query': '$fetch'
  }
};
</script>
