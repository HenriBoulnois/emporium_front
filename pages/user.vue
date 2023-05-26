<template>
  <div class="">
    <div class="grid grid-cols-3">
      <div class="bg-gray-600 grid place-items-center rounded-l-lg p-4">
        <img v-if="user.imagePath" class="max-h-80" :src="user.imagePath">
        <ImagePlaceholder v-if="!user.imagePath" />
        <a class="pt-4">{{ user.pseudo }}</a>
        <a class="pt-4">{{ user.uwuid }}</a>
      </div>
      <div class="grid grid-rows-[1fr_1fr] list-none text-center bg-blue-600">
        <div class="bg-blue-550">
          Favorite items
        </div>
      </div>
      <div class="bg-gray-600 rounded-r-lg">
        <UserComments v-if="user.uwuid" :user-id="user.uwuid" />
      </div>
    </div>
    <div class="bg-gray-800">
      <div class="justify-items-center text-center">
        <div class="grid grid-cols-[minmax(10%,10%)_1fr_1fr_1fr_1fr_1fr]">
          <a>Image</a>
          <a>Nom</a>
          <a>Type</a>
          <a>Catégorie</a>
          <a>Description</a>
          <div>Actions</div>
        </div>
        <div
          v-for="collection in collections"
          :key="collection.oeuvres.idOeuvre"
          class="bg-gray-600 hover:bg-gray-700 rounded-lg my-4 cursor-pointer grid grid-cols-[max(10%)_1fr_1fr_1fr_1fr_1fr] p-4 place-items-center"
        >
          <img
            v-if="collection.oeuvres.imagePath"
            class="max-w-full max-h-32"
            :src="collection.oeuvres.imagePath"
            @click="
              $router.push({
                path: '/oeuvre',
                query: { q: collection.oeuvres.idOeuvre }
              })
            "
          >
          <ImagePlaceholder
            v-if="!collection.oeuvres.imagePath"
            @click="
              $router.push({
                path: '/oeuvre',
                query: { q: collection.oeuvres.idOeuvre }
              })
            "
          />
          <div v-if="collection.oeuvres.titre">
            {{ collection.oeuvres.titre }}
          </div>
          <div v-if="collection.oeuvres.description">
            {{ collection.oeuvres.description }}
          </div>
          <div v-if="collection.oeuvres.type">
            {{ collection.oeuvres.type.name }}
          </div>
          <div v-if="collection.oeuvres.auteur">
            {{ collection.oeuvres.auteur.name }}
          </div>
          <div class="grid grid-cols-2 place-items-center">
            <span
              v-if="collection.collection.favorite"
              class="bg-pink-400 hover:bg-transparent h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-2 text-white hover:text-black"
              @click="
                removeAsFavorite(
                  collection.collection.idCollection,
                  collection.oeuvres.idOeuvre
                )
              "
            >
              heart_check
            </span>
            <span
              v-if="!collection.collection.favorite"
              class="hover:bg-pink-300 h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-2 text-pink-400 hover:text-white"
              @click="
                addAsFavorite(
                  collection.collection.idCollection,
                  collection.oeuvres.idOeuvre
                )
              "
            >
              favorite
            </span>
            <span
              class="hover:bg-red-400 hover:text-white h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-2"
              @click="removeFromCollection(collection.collection.idCollection)"
            >
              delete
            </span>
          </div>
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
      collections: []
    };
  },
  async fetch () {
    const response = await this.$axios.$get(
      'https://emporiumback.fly.dev/utilisateur/search/' + this.$route.query.q
    );
    this.user = response;
    this.fetchCollection();
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    async fetchCollection () {
      await this.$axios.$get(
      'https://emporiumback.fly.dev/collection/utilisateur/' + this.user.uwuid
    ).then((response) => {
      this.collections = ''
      this.collections = response;
    })
    },
    removeFromCollection (idCollection) {
      this.$axios
        .$delete(
          'https://emporiumback.fly.dev/collection/delete/' + idCollection
        )
        .then(() => {
          console.log('supprimé avec succes');
          this.fetchCollection()
        })
        .catch(function () {
          console.log('issue with delete');
        });
    },
    addAsFavorite (collectionId, oeuvreId) {
      const collection = {
        idCollection: collectionId,
        UWUid: this.user.uwuid,
        idOeuvre: oeuvreId,
        favorite: true
      };
      this.$axios
        .$put('https://emporiumback.fly.dev/collection', collection)
        .then(() => {
          console.log('added as fav');
          this.fetchCollection()
        })
        .catch(() => {
          console.log('issue with add fav');
        });
    },
    removeAsFavorite (collectionId, oeuvreId) {
      const collection = {
        idCollection: collectionId,
        UWUid: this.user.uwuid,
        idOeuvre: oeuvreId,
        favorite: false
      };
      this.$axios
        .$put('https://emporiumback.fly.dev/collection', collection)
        .then(() => {
          console.log('remove as fav');
          this.fetchCollection()
        })
        .catch(() => {
          console.log('issue with remove fav');
        });
    }
  }
};
</script>
