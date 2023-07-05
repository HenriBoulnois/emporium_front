<template>
  <div class="">
    <CompleteAccountDialog v-if="dialog" :can-disable="true" />
    <div class="grid grid-cols-3">
      <div
        class="bg-white grid grid-rows-[1fr_auto_auto_1fr] place-items-center rounded-l-lg p-4"
      >
        <div />
        <img
          v-if="user.profilPicturePath"
          class="max-h-80 shadow-md shadow-black"
          :src="user.profilPicturePath"
        >
        <ImagePlaceholder v-if="!user.profilPicturePath" />
        <a class="pt-4">{{ user.pseudo }}</a>
        <div />
      </div>
      <div class="grid grid-rows-[auto_1fr] list-none text-center bg-white">
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
        <div v-if="user.description !== null" class="text-justify">
          <div class="text-center font-bold pt-4">
            Description
          </div>
          <div class="bg-gray-100 p-4 m-4 rounded-lg">
            {{ user.description }}
          </div>
        </div>
      </div>
      <div class="bg-white rounded-r-lg">
        <UserComments v-if="user.uwuid" :user-id="user.uwuid" />
      </div>
    </div>
    <div class="">
      <div :class="hasItems">
        <div
          class="grid grid-cols-[minmax(10%,10%)_1fr_1fr_1fr_1fr_auto] bg-white p-4 mt-4 rounded-lg text-center"
        >
          <div>Image</div>
          <div>Nom</div>
          <div>Auteur</div>
          <div>Description</div>
          <div>Support</div>
          <div v-if="isCurrent" class="w-60">
            Actions
          </div>
          <div v-if="!isCurrent" class="w-60">
            Oeuvre favorite
          </div>
        </div>
        <div
          v-for="collection in collections"
          :key="collection.idCollection"
          class="bg-white hover:bg-gray-100 rounded-lg my-4 cursor-pointer grid grid-cols-[max(10%)_1fr_1fr_1fr_1fr_auto] p-4 place-items-center"
        >
          <img
            v-if="collection.oeuvres.imagePath"
            class="max-w-full max-h-32 shadow-md shadow-black"
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
          <div v-if="!isCurrent" class="w-60">
            <span
              v-if="!collection.collection.favorite"
              class="bg-pink-300 h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-2 text-white"
            >
              favorite
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
      email: '',
      hasItems: 'hidden'
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
      this.isCurrent = 'justify-items-center text-center';
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
          if (this.collections[0].idCollection === undefined) {
            this.hasItems = true;
          }
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
