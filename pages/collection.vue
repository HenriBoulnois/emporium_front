<template>
  <div>
    <CompleteAccountDialog v-if="dialog" :can-disable="true" />
    <div class="bg-white rounded-lg mx-3 p-2 font-bold">
      <div class="text-center text-2xl">
        <div>
          Collection de {{ user.pseudo }}
        </div>
      </div>
      <input
        v-model="inputSearch"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Rechercher dans la collection"
      >
    </div>
    <div v-if="hasItems" class="grid grid-cols-4">
      <div
        v-for="collection in searchCollection"
        :key="collection.idCollection"
        class="bg-white rounded-lg m-3 p-2"
      >
        <div class="grid grid-cols-[60%_40%]">
          <div
            class="grid grid-rows-[70%_30%] divide-y place-items-center text-center"
          >
            <div class="">
              <div v-if="collection.oeuvres.titre" class="font-bold">
                {{ collection.oeuvres.titre }}
              </div>
              <div v-if="collection.oeuvres.auteur">
                {{ collection.oeuvres.auteur.name }}
              </div>
            </div>
            <div>
              <span
                class="h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-1 cursor-pointer"
                title="Ouvrir la page de l'oeuvre"
                @click="
                  $router.push({
                    path: '/oeuvre',
                    query: { q: collection.oeuvres.idOeuvre }
                  })
                "
              >
                open_in_new
              </span>
              <span
                v-if="collection.collection.favorite && isCurrent"
                class="h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-1 text-pink-400 cursor-pointer"
                title="Supprimer des favoris"
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
                v-if="!collection.collection.favorite && isCurrent"
                class="h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-1 text-pink-400 cursor-pointer"
                title="Ajouter aux favoris"
                @click="
                  addAsFavorite(
                    collection.collection.idCollection,
                    collection.oeuvres.idOeuvre
                  )
                "
              >
                heart_plus
              </span>
              <span
                v-if="isCurrent"
                class="hover:bg-red-400 hover:text-white h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-1 cursor-pointer"
                title="Supprimer de ma collection"
                @click="
                  removeFromCollection(collection.collection.idCollection)
                "
              >
                delete
              </span>
            </div>
          </div>
          <div class="grid place-items-center">
            <img
              v-if="collection.oeuvres.imagePath"
              class="max-w-full max-h-32 shadow-md shadow-black -top-4"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImagePlaceholder from '~/components/ImagePlaceholder.vue';
import CompleteAccountDialog from '~/components/User/CompleteAccountDialog.vue';

export default {
  name: 'Collection',
  comments: {
    ImagePlaceholder,
    CompleteAccountDialog
  },
  data () {
    return {
      user: '',
      collections: '',
      dialog: false,
      isCurrent: false,
      email: '',
      hasItems: 'hidden',
      dataBase: [],
      inputSearch: '',
      outputSearch: ''
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
  computed: {
    searchCollection () {
      if (this.hasItems === true) {
        return this.collections.filter((e) => {
          return (
            e.oeuvres.titre
              .toLowerCase()
              .includes(this.inputSearch.toLowerCase()) !== false ||
            e.oeuvres.auteur.name
              .toLowerCase()
              .includes(this.inputSearch.toLowerCase()) !== false ||
            e.oeuvres.type.name
              .toLowerCase()
              .includes(this.inputSearch.toLowerCase()) !== false ||
            e.oeuvres.genre.name
              .toLowerCase()
              .includes(this.inputSearch.toLowerCase()) !== false ||
            e.oeuvres.support.name
              .toLowerCase()
              .includes(this.inputSearch.toLowerCase()) !== false ||
            e.oeuvres.editeur.name
              .toLowerCase()
              .includes(this.inputSearch.toLowerCase()) !== false
          );
        });
      }
      return '';
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    searchInCollection () {
      this.outputSearch = this.inputSearch;
    },
    async fetchCollection () {
      this.hasItems = false;
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
