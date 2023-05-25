<template>
  <div class="">
    <div class="grid grid-cols-3">
      <div class="bg-gray-700 grid place-items-center rounded-l-lg p-4">
        <img
          v-if="user.imagePath"
          class="max-h-80"
          :src="user.imagePath"
        >
        <ImagePlaceholder v-if="!user.imagePath" />
        <a class="pt-4">{{ user.pseudo }}</a>
        <a class="pt-4">{{ user.uwuid }}</a>
      </div>
      <div class="grid grid-rows-[1fr_1fr] list-none text-center bg-blue-600">
        <div class="bg-blue-550">
          Favorite items
        </div>
      </div>
      <div class="bg-gray-700 rounded-r-lg">
        <UserComments v-if="user.uwuid" :user-id="user.uwuid" />
      </div>
    </div>
    <div class="bg-gray-800">
      <div class="justify-items-center text-center">
        <div class="grid grid-cols-[minmax(10%,10%)_1fr_1fr_1fr_1fr]">
          <a>Image</a>
          <a>Nom</a>
          <a>Type</a>
          <a>Catégorie</a>
          <a>Description</a>
        </div>
        <div
          v-for="oeuvre in collection"
          :key="oeuvre.idOeuvre"
          class="bg-gray-600 hover:bg-gray-700 rounded-lg my-4 cursor-pointer grid grid-cols-[max(10%)_1fr_1fr_1fr_1fr] p-4 items-center"
          @click="
            $router.push({ path: '/oeuvre', query: { q: oeuvre.idOeuvre } })
          "
        >
          <img
            v-if="oeuvre.imagePath"
            class="max-w-full max-h-32"
            :src="oeuvre.imagePath"
          >
          <ImagePlaceholder v-if="!oeuvre.imagePath" />
          <a>{{ oeuvre.titre }}</a>
          <a>{{ oeuvre.description }}</a>
          <a>{{ oeuvre.type.name }}</a>
          <a>{{ oeuvre.auteur.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserComments from '~/components/User/UserComments.vue';

export default {
  name: 'UserPage',
  components: {
    UserComments
  },
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
