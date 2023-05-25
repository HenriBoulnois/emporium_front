<template>
  <div>
    <div
      v-for="oeuvre in oeuvresRelated"
      :key="oeuvre.idOeuvre"
      class="m-4 grid grid-cols-2 p-4 items-center text-center cursor-pointer"
      @click="$router.push({ path: '/oeuvre', query: { q: oeuvre.idOeuvre } })"
    >
      <img v-if="oeuvre.imagePath" :src="oeuvre.imagePath">
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
      .catch(error => console.log(error));
  }
};
</script>
