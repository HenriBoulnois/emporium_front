<template>
  <div class="grid grid-rows-2">
    <div class="grid grid-cols-3 max-h-fit m-5">
      <div class="bg-blue-500 grid place-items-center p-5">
        <img :src="oeuvre.image">
      </div>
      <div class="grid grid-cols-1 list-none place-content-center bg-blue-600">
        <li>
          <a class="">Titre : {{ oeuvre.titre }}</a>
        </li>
        <li>
          <a class="">Sous Titre : {{ oeuvre.sousTitre }}</a>
        </li>
        <li>
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
      <div class="bg-blue-700">
        Linked items
      </div>
    </div>
    <div class="bg-blue-400">
      Comment section
    </div>
  </div>
</template>

<script>
export default {
  name: 'OeuvrePage',
  data () {
    return {
      oeuvre: []
    };
  },
  async fetch () {
    // exact user
    const response = await this.$axios.$get(
      'https://emporiumback.fly.dev/oeuvres/' + this.$route.query.q
    );
    this.oeuvre = response;
  },
  watch: {
    '$route.query': '$fetch'
  }
};
</script>
