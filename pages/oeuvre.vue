<template>
  <div class="">
    <div class="grid grid-cols-3 p-4 bg-gray-700 rounded-lg">
      <div class="">
        <img
          v-if="oeuvre.imagePath"
          class="max-h-80"
          :src="oeuvre.imagePath"
        >
        <ImagePlaceholder v-if="!oeuvre.imagePath" />
      </div>
      <div class="grid list-none place-content-center relative">
        <span
          class="material-symbols-outlined absolute top-0 right-0 cursor-pointer"
          @click="
            $router.push({
              path: '/edit/oeuvre',
              query: { q: oeuvre.idOeuvre }
            })
          "
        >
          edit
        </span>
        <li v-if="oeuvre.titre">
          <a class="">Titre : {{ oeuvre.titre }}</a>
        </li>
        <li v-if="oeuvre.sousTitre">
          <a class="">Sous Titre : {{ oeuvre.sousTitre }}</a>
        </li>
        <li v-if="oeuvre.description">
          <a>Description : {{ oeuvre.description }}</a>
        </li>
        <li
          v-if="oeuvre.auteur"
          class="cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { a: oeuvre.auteur.idAuteur }
            })
          "
        >
          <a>Auteur : {{ oeuvre.auteur.name }}</a>
        </li>
        <li
          v-if="oeuvre.type"
          class="cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { t: oeuvre.type.idType }
            })
          "
        >
          <a>Type : {{ oeuvre.type.name }}</a>
        </li>
        <li
          v-if="oeuvre.support"
          class="cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { s: oeuvre.support.idSupport }
            })
          "
        >
          <a>Support : {{ oeuvre.support.name }}</a>
        </li>
        <li
          v-if="oeuvre.editeur"
          class="cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { e: oeuvre.editeur.idEditeur }
            })
          "
        >
          <a>Editeur : {{ oeuvre.editeur.name }}</a>
        </li>
        <li
          v-if="oeuvre.genre"
          class="cursor-pointer"
          @click="
            $router.push({
              path: '/search',
              query: { g: oeuvre.genre.idGenre }
            })
          "
        >
          <a>Genre : {{ oeuvre.genre.name }}</a>
        </li>
      </div>
      <div class="">
        Du même auteur :
        <RelatedOeuvre
          v-if="oeuvre.auteur"
          :oeuvre-id="oeuvre.idOeuvre"
          :auteur-id="oeuvre.auteur.idAuteur"
        />
      </div>
    </div>
    <div class="relative bg-gray-800">
      <CommentsOeuvre v-if="oeuvre.idOeuvre" :oeuvre-id="oeuvre.idOeuvre" />
    </div>
  </div>
</template>

<script>
import ImagePlaceholder from '~/components/ImagePlaceholder.vue';
import CommentsOeuvre from '~/components/Oeuvre/CommentsOeuvre.vue';
import RelatedOeuvre from '~/components/Oeuvre/RelatedOeuvre.vue';

export default {
  name: 'OeuvrePage',
  components: {
    ImagePlaceholder,
    RelatedOeuvre,
    CommentsOeuvre
  },
  data () {
    return {
      oeuvre: []
    };
  },
  async fetch () {
    this.oeuvre = [];
    await this.$axios
      .$get('https://emporiumback.fly.dev/oeuvres/' + this.$route.query.q)
      .then(reponse => (this.oeuvre = reponse))
      .catch(error => console.log(error));
  },
  watch: {
    '$route.query': '$fetch'
  }
};
</script>
