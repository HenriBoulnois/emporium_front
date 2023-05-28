<template>
  <div class="">
    <CompleteAccountDialog v-if="dialog" :can-disable="true" />
    <div class="grid grid-cols-3">
      <div class="bg-gray-600 grid place-items-center rounded-l-lg p-4">
        <img
          v-if="user.profilPicturePath"
          class="max-h-80"
          :src="user.profilPicturePath"
        >
        <ImagePlaceholder v-if="!user.profilPicturePath" />
        <a class="pt-4">{{ user.pseudo }}</a>
      </div>
      <div class="grid grid-rows-[auto_1fr] list-none text-center bg-gray-600">
        <div class="flex justify-end">
          <span
            v-if="isCurrent"
            class="material-symbols-outlined cursor-pointer text-black hover:bg-white rounded-full p-2 m-2"
            @click="
              $router.push({
                path: '/edit/user',
                query: { q: user.uwuid }
              })
            "
          >
            edit
          </span>
        </div>
        <div class="text-justify">
          <div v-if="user.description !== 'null'">
            {{ user.description }}
          </div>
        </div>
      </div>
      <div class="bg-gray-600 rounded-r-lg">
        <UserComments v-if="user.uwuid" :user-id="user.uwuid" />
      </div>
    </div>
    <div class="bg-gray-800">
      <div class="justify-items-center text-center">
        <div class="grid grid-cols-[minmax(10%,10%)_1fr_1fr_1fr_1fr_auto]">
          <a>Image</a>
          <a>Nom</a>
          <a>Auteur</a>
          <a>Description</a>
          <a>Support</a>
          <div v-if="isCurrent" class="w-60">
            Actions
          </div>
        </div>
        <div
          v-for="collection in collections"
          :key="collection.idCollection"
          class="bg-gray-600 hover:bg-gray-700 rounded-lg my-4 cursor-pointer grid grid-cols-[max(10%)_1fr_1fr_1fr_1fr_auto] p-4 place-items-center"
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
          <div v-if="collection.oeuvres.auteur">
            {{ collection.oeuvres.auteur.name }}
          </div>
          <div v-if="collection.oeuvres.description">
            {{ collection.oeuvres.description }}
          </div>
          <div v-if="collection.oeuvres.support">
            {{ collection.oeuvres.support.name }}
          </div>
          <div
            v-if="isCurrent"
            class="grid grid-cols-2 place-items-center w-60"
          >
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
import CompleteAccountDialog from '~/components/User/CompleteAccountDialog.vue';

export default {
  name: 'UserPage',
  components: {
    UserComments,
    CompleteAccountDialog
  },
  data () {
    return {
      user: '',
      collections: [],
      dialog: false,
      isCurrent: false,
      email: ''
    };
  },
  async fetch () {
    if (this.$auth.loggedIn !== undefined) {
      this.email = this.$auth.user.email;
      await this.$axios
        .$get(
          'https://emporiumback.fly.dev/utilisateur/' + this.$auth.user.email
        )
        .then(() => {
          this.dialog = false;
        })
        .catch(() => {
          this.dialog = true;
        });
    }
    await this.$axios
      .$get(
        'https://emporiumback.fly.dev/utilisateur/identification/' +
          this.$route.query.q
      )
      .then((response) => {
        this.user = response;
      })
      .catch(() => {});
    if (this.email === this.user.email) {
      this.isCurrent = true;
    }
    this.fetchCollection();
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    async fetchCollection () {
      this.collections = '';
      await this.$axios
        .$get(
          'https://emporiumback.fly.dev/collection/utilisateur/' +
            this.user.uwuid
        )
        .then((response) => {
          this.collections = response;
        });
    },
    removeFromCollection (idCollection) {
      this.$axios
        .$delete(
          'https://emporiumback.fly.dev/collection/delete/' + idCollection
        )
        .then(() => {
          this.fetchCollection();
        })
        .catch(function () {});
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
          this.fetchCollection();
        })
        .catch(() => {});
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
          this.fetchCollection();
        })
        .catch(() => {});
    }
  }
};
</script>
