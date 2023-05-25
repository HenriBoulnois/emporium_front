<template>
  <div class="grid grid-rows-[max(500px)_auto]">
    <div class="grid grid-cols-3 m-5">
      <div class="bg-gray-700 grid place-items-center p-4 rounded-l-lg">
        <img v-if="oeuvre.imagePath" class="max-w-full max-h-full" :src="oeuvre.imagePath">
        <ImagePlaceholder v-if="!oeuvre.imagePath" />
      </div>
      <div class="grid list-none place-content-center bg-gray-700 relative">
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
      <div class="bg-gray-700 rounded-r-lg">
        Du même auteur :
        <RelatedOeuvre
          v-if="oeuvre.auteur"
          :oeuvre-id="oeuvre.idOeuvre"
          :auteur-id="oeuvre.auteur.idAuteur"
        />
      </div>
    </div>
    <div class="relative bg-gray-800">
      <a class="text-white pl-4 text-lg">Commentaires :</a>
      <a :class="success"> Le commentaire a bien été ajouté. </a>
      <div v-if="$auth.loggedIn" class="grid grid-cols-[1fr_auto] p-4">
        <input
          v-model="newComment"
          class="pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder="Nouveau commentaire"
        >
        <button
          class="ml-4 p-4 max-w-fit text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
          @click="submitComment"
        >
          Envoyer
        </button>
      </div>
      <ul class="justify-items-center text-center">
        <li
          v-for="comment in commentaires"
          :key="comment.idCommentaire"
          class="bg-gray-600 rounded-lg m-4 grid grid-cols-[10%_1fr_10%] p-4 items-center"
        >
          <div class="grid grid-rows-[auto_auto]">
            <img
              src="https://cdn.shopify.com/s/files/1/0552/1155/7073/products/Product_Image_Energy_02_HOLY_Orange_20_1_1200x.png?v=1671020711"
            >
            <a
              class="cursor-pointer"
              @click="
                $router.push({
                  path: '/user',
                  query: { q: comment.utilisateur.pseudo }
                })
              "
            >{{ comment.utilisateur.pseudo }}</a>
          </div>
          <a class="text-left min-h-full bg-red-500">{{ comment.text }}</a>
          <a>Like Zone</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ImagePlaceholder from '~/components/ImagePlaceholder.vue';
import RelatedOeuvre from '~/components/Oeuvre/RelatedOeuvre.vue';

export default {
  name: 'OeuvrePage',
  components: {
    ImagePlaceholder,
    RelatedOeuvre
  },
  data () {
    return {
      oeuvre: [],
      commentaires: [],
      newComment: '',
      success: 'hidden'
    };
  },
  async fetch () {
    this.oeuvre = [];
    this.commentaires = [];
    await this.$axios
      .$get('https://emporiumback.fly.dev/oeuvres/' + this.$route.query.q)
      .then(reponse => (this.oeuvre = reponse))
      .catch(error => console.log(error));
    await this.$axios
      .$get(
        'https://emporiumback.fly.dev/commentaire/oeuvres/' +
          this.$route.query.q
      )
      .then(reponse => (this.commentaires = reponse))
      .catch(console.log('probleme comment'));
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    submitComment: function () {
      if (this.newComment !== '') {
        const commentaire = {
          UWUid: '1',
          idOeuvre: this.oeuvre.idOeuvre,
          text: this.newComment
        };
        this.$axios
          .$post('https://emporiumback.fly.dev/commentaire', commentaire)
          .then(
            (this.newComment = ''),
            (this.success =
              'absolute right-0 top-0 pr-4 text-green-300 text-lg'),
            setTimeout(this.hide, 2000)
          );
      }
    },
    hide: function () {
      this.success = 'hidden';
    }
  }
};
</script>
