<template>
  <div class="">
    <CompleteAccountDialog v-if="dialog" :can-disable="true" />
    <div class="grid grid-cols-3 p-4 bg-white rounded-lg">
      <div class="place-self-center">
        <img v-if="oeuvre.imagePath" class="max-h-80 shadow-md shadow-black" :src="oeuvre.imagePath">
        <ImagePlaceholder v-if="!oeuvre.imagePath" />
      </div>
      <div class="grid grid-rows-[1fr_auto_auto]">
        <div class="relative pl-6">
          <div class="pb-3 font-extrabold">
            Informations :
          </div>
          <span
            v-if="user.pseudo"
            class="material-symbols-outlined absolute top-1 right-2 cursor-pointer text-black hover:bg-white rounded-full p-2"
            @click="
              $router.push({
                path: '/edit/oeuvre',
                query: { q: oeuvre.idOeuvre }
              })
            "
          >
            edit
          </span>
          <div v-if="oeuvre.titre">
            <div class="truncate">
              Titre : {{ oeuvre.titre }}
            </div>
          </div>
          <div v-if="oeuvre.sousTitre">
            <div v-if="oeuvre.sousTitre !== 'null'" class="truncate">
              Sous Titre : {{ oeuvre.sousTitre }}
            </div>
          </div>
          <div v-if="oeuvre.description">
            <div v-if="oeuvre.description !== 'null'" class="line-clamp-10">
              Description : {{ oeuvre.description }}
            </div>
          </div>
          <div
            v-if="oeuvre.auteur"
            class="cursor-pointer hover:underline"
            @click="
              $router.push({
                path: '/search',
                query: { a: oeuvre.auteur.idAuteur }
              })
            "
          >
            <div>Auteur : {{ oeuvre.auteur.name }}</div>
          </div>
          <div
            v-if="oeuvre.type"
            class="cursor-pointer hover:underline"
            @click="
              $router.push({
                path: '/search',
                query: { t: oeuvre.type.idType }
              })
            "
          >
            <div>Catégorie : {{ oeuvre.type.name }}</div>
          </div>
          <div
            v-if="oeuvre.support"
            class="cursor-pointer hover:underline"
            @click="
              $router.push({
                path: '/search',
                query: { s: oeuvre.support.idSupport }
              })
            "
          >
            <div>Support : {{ oeuvre.support.name }}</div>
          </div>
          <div
            v-if="oeuvre.editeur"
            class="cursor-pointer hover:underline"
            @click="
              $router.push({
                path: '/search',
                query: { e: oeuvre.editeur.idEditeur }
              })
            "
          >
            <div>Editeur : {{ oeuvre.editeur.name }}</div>
          </div>
          <div
            v-if="oeuvre.genre"
            class="cursor-pointer hover:underline"
            @click="
              $router.push({
                path: '/search',
                query: { g: oeuvre.genre.idGenre }
              })
            "
          >
            <div>Genre : {{ oeuvre.genre.name }}</div>
          </div>
        </div>
        <div class="text-center">
          {{ isAdded }}
        </div>
        <div
          v-if="!inCollection.idCollection"
          :class="displayAdd"
        >
          <span
            class="hover:bg-pink-300 h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-2 text-pink-400 hover:text-white cursor-pointer"
            @click="addToMyCollection(true)"
          >
            favorite
          </span>
          <span
            class="hover:bg-green-400 text-green-400 hover:text-white h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-2 cursor-pointer"
            @click="addToMyCollection(false)"
          >
            add_box
          </span>
        </div>
        <div
          v-if="inCollection.idCollection"
          class="grid text-center"
        >
          <span
            v-if="user.pseudo && inCollection.favorite == true"
            class="material-symbols-outlined text-pink-400"
          >favorite</span>
          Cette oeuvre fait déjà partie de votre collection !
        </div>
      </div>
      <div class="">
        <div class="pb-3 font-extrabold">
          Du même auteur :
        </div>
        <RelatedOeuvre
          v-if="oeuvre.auteur"
          :oeuvre-id="oeuvre.idOeuvre"
          :auteur-id="oeuvre.auteur.idAuteur"
        />
      </div>
    </div>
    <div class="relative">
      <CommentsOeuvre
        v-if="oeuvre.idOeuvre"
        :oeuvre-id="oeuvre.idOeuvre"
        :user="user"
      />
    </div>
  </div>
</template>

<script>
import ImagePlaceholder from '~/components/ImagePlaceholder.vue';
import CommentsOeuvre from '~/components/Oeuvre/CommentsOeuvre.vue';
import RelatedOeuvre from '~/components/Oeuvre/RelatedOeuvre.vue';
import CompleteAccountDialog from '~/components/User/CompleteAccountDialog.vue';

export default {
  name: 'OeuvrePage',
  components: {
    ImagePlaceholder,
    RelatedOeuvre,
    CommentsOeuvre,
    CompleteAccountDialog
  },
  data () {
    return {
      oeuvre: [],
      dialog: false,
      user: [],
      isAdded: ' ',
      inCollection: [],
      displayAdd: 'grid grid-cols-2 place-items-center hidden'
    };
  },
  async fetch () {
    this.oeuvre = [];
    await this.$axios
      .$get('https://emporiumback.fly.dev/oeuvres/' + this.$route.query.q)
      .then(reponse => (this.oeuvre = reponse));
    if (this.$auth.loggedIn !== undefined) {
      await this.$axios
        .$get(
          'https://emporiumback.fly.dev/utilisateur/' + this.$auth.user.email
        )
        .then((response) => {
          this.user = response;
          this.dialog = false;
        })
        .catch(() => {
          this.dialog = true;
        });
      await this.$axios
        .$get(
          'https://emporiumback.fly.dev/collection/utilisateur/' +
            this.user.uwuid +
            '/oeuvres/' +
            this.oeuvre.idOeuvre
        )
        .then((response) => {
          this.inCollection = response;
          this.displayAdd = 'grid grid-cols-2 place-items-center'
        });
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    addToMyCollection: function (asFavorite) {
      const addedOeuvre = {
        UWUid: this.user.uwuid,
        idOeuvre: this.oeuvre.idOeuvre,
        favorite: asFavorite
      };
      this.$axios
        .$post('https://emporiumback.fly.dev/collection', addedOeuvre)
        .then(() => {
          this.isAdded = "L'oeuvre a bien été ajoutée à votre collection";
          this.displayAdd = 'grid grid-cols-2 place-items-center hidden'
        });
    }
  }
};
</script>
