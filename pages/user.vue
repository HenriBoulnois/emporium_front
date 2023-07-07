<template>
  <div class="">
    <div class="grid grid-cols-2">
      <div
        class="bg-white grid grid-flow-row place-items-center rounded-lg p-4 m-4"
      >
        <div class="w-full">
          <span
            v-if="isCurrent"
            class="material-symbols-outlined cursor-pointer w-fit text-black hover:bg-white rounded-full"
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
        <img
          v-if="user.profilPicturePath"
          class="max-h-80 shadow-md shadow-black"
          :src="user.profilPicturePath"
        >
        <ImagePlaceholder v-if="!user.profilPicturePath" />
        <a class="pt-4 text-2xl font-bold">{{ user.pseudo }}</a>
        <div v-if="user.description !== null" class="text-justify">
          <div class="text-center font-bold pt-4">
            Description
          </div>
          <div class="bg-gray-100 p-4 m-4 rounded-lg h-full">
            {{ user.description }}
          </div>
        </div>
        <div class="grid grid-flow-col divide-x">
          <div class="flex items-center px-3">
            {{ collections.length
            }}<span
              class="material-symbols-outlined stats pl-3 text-2xl text-green-400 cursor-help"
              title="Oeuvres ajoutées"
            >
              featured_play_list
            </span>
          </div>
          <div class="flex items-center px-3">
            {{ nbFavorite.length
            }}<span
              class="material-symbols-outlined stats pl-3 text-pink-400 cursor-help"
              title="Oeuvres favorites"
            >
              favorite
            </span>
          </div>
          <div class="flex items-center px-3">
            {{ collections.length
            }}<span
              class="material-symbols-outlined stats pl-3 text-blue-400 cursor-help"
              title="Commentaires rédigés"
            >
              comment
            </span>
          </div>
        </div>
        <div
          class="text-center text-white bg-gray-700 cursor-pointer hover:bg-gray-800 font-medium rounded-lg px-4 py-2 text-xl"
          @click="
            $router.push({ path: '/collection', query: { q: user.uwuid } })
          "
        >
          Voir la collection complète
        </div>
      </div>
      <div class="grid grid-flow-row pt-4">
        <div class="text-center font-bold">
          Dernières oeuvres ajoutées
        </div>
        <div class="flex flex-wrap">
          <div
            v-for="collection in collections.slice(0, 8)"
            :key="collection.idCollection"
            class="p-4 flex"
          >
            <div class="w-full h-full grid place-items-center relative">
              <img
                v-if="collection.oeuvres.imagePath"
                class="bg-white rounded-lg p-1 max-w-full max-h-36 shadow-md shadow-black"
                :src="collection.oeuvres.imagePath"
              >
              <ImagePlaceholder v-if="!collection.oeuvres.imagePath" />
              <div
                class="bg-white opacity-0 hover:opacity-100 h-full w-full absolute top-0 rounded-lg p-3 grid place-items-center shadow-md shadow-black"
              >
                <div class="text-center divide-y-2">
                  <div>{{ collection.oeuvres.titre }}</div>
                  <div>{{ collection.oeuvres.auteur.name }}</div>
                  <span
                    class="material-symbols-outlined cursor-pointer"
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg p-4 m-4">
          <UserComments v-if="user.uwuid" :user-id="user.uwuid" />
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
      collections: [],
      isCurrent: false,
      email: '',
      hasItems: 'hidden',
      nbComment: 0,
      nbFavorite: []
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
            this.nbFavorite = this.collections.filter((e) => {
              return e.collection.favorite === true;
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.stats {
  font-size: 60px;
}
</style>
