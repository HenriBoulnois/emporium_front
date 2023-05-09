<template>
  <div class="grid grid-rows-2">
    <div class="grid grid-cols-3 max-h-fit m-5">
      <div class="bg-blue-500 grid place-items-center">
        <!-- <img :src="user.image"> -->
      </div>
      <div class="grid grid-cols-1 list-none place-content-center bg-blue-600">
        <li>
          <a class="">{{ user.pseudo }}</a>
        </li>
        <li>
          <a class="">{{ user.grade }}</a>
        </li>
        <li>
          <a>{{ user.equipe }}</a>
        </li>
        <li>
          <a>{{ user.resultat }}</a>
        </li>
      </div>
      <div class="bg-blue-700">
        Favorite items
      </div>
    </div>
    <div class="bg-blue-400">
      <ul class="justify-items-center text-center">
        <li class="grid grid-cols-[minmax(10%,10%)_1fr_1fr_1fr_1fr]">
          <a>Image</a>
          <a>Nom</a>
          <a>Type</a>
          <a>Catégorie</a>
          <a>Description</a>
        </li>
        <li
          v-for="oeuvre in collection"
          :key="oeuvre.idOeuvre"
          class="bg-gray-600 hover:bg-gray-700 rounded-lg m-4 cursor-pointer grid grid-cols-[max(10%)_1fr_1fr_1fr_1fr] p-4 items-center"
          @click="$router.push({ path: '/oeuvre', query: { q: oeuvre.idOeuvre } })
          "
        >
          <img :src="oeuvre.image">
          <a>{{ oeuvre.titre }}</a>
          <a>{{ oeuvre.description }}</a>
          <a>{{ oeuvre.type.name }}</a>
          <a>{{ oeuvre.auteur.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  data () {
    return {
      user: '',
      collection: []
    };
  },
  async fetch () {
    // exact user
    const response = await this.$axios.$get(
      'https://emporiumback.fly.dev/utilisateur/search/' + this.$route.query.q
    );
    this.user = response;
    const myCollection = await this.$axios.$get(
      'https://emporiumback.fly.dev/collection/oeuvres/' + this.user.uwuid
    );
    this.collection = myCollection;
  },
  watch: {
    '$route.query': '$fetch'
  }
};
</script>
