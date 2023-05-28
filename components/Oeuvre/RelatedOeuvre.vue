<template>
  <div>
    <div
      v-for="oeuvre in oeuvresRelated"
      :key="oeuvre.idOeuvre"
      class="grid grid-cols-2 p-4 items-center text-center cursor-pointer h-full place-items-center"
      @click="$router.push({ path: '/oeuvre', query: { q: oeuvre.idOeuvre } })"
    >
      <img v-if="oeuvre.imagePath" :src="oeuvre.imagePath" class="max-h-28">
      <ImagePlaceholder v-if="!oeuvre.imagePath" />
      <div>{{ oeuvre.titre }}</div>
    </div>
  </div>
</template>

<script>
import ImagePlaceholder from '~/components/ImagePlaceholder.vue';

export default {
  name: 'RelatedOeuvre',
  components: {
    ImagePlaceholder
  },
  props: {
    oeuvreId: undefined,
    auteurId: undefined
  },
  data () {
    return {
      oeuvresRelated: ''
    };
  },
  async fetch () {
    await this.$axios
      .$get(
        'https://emporiumback.fly.dev/oeuvres/' +
          this.oeuvreId +
          '/auteur/' +
          this.auteurId
      )
      .then(reponse => (this.oeuvresRelated = reponse))
  }
};
</script>
