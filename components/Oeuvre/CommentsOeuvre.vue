<template>
  <div class="">
    <a class="text-white text-lg">Commentaires :</a>
    <a :class="success"> Le commentaire a bien été ajouté. </a>
    <div class="grid grid-rows-2 bg-white rounded-lg p-4">
      <!-- <div v-if="$auth.loggedIn" class="grid grid-rows-2 bg-white rounded-lg p-4"> -->
      <input
        v-model="newComment"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Nouveau commentaire"
      >
      <div
        class="flex-auto text-center text-white bg-gray-800 cursor-pointer hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
        @click="submitComment()"
      >
        Envoyer
      </div>
    </div>
    <div class="justify-items-center text-center">
      <div
        v-for="comment in commentaires"
        :key="comment.idCommentaire"
        class="bg-gray-600 rounded-lg grid grid-cols-[10%_1fr] items-center p-4 mt-4"
      >
        <div class="grid grid-rows-[auto_auto]">
          <div
            class="cursor-pointer"
            @click="
              $router.push({
                path: '/user',
                query: { q: comment.utilisateur.pseudo }
              })
            "
          >
            <img
              v-if="comment.utilisateur.profilPicturePath"
              class="max-w-full max-h-32"
              :src="comment.utilisateur.profilPicturePath"
            >
            <ImagePlaceholder v-if="!comment.utilisateur.profilPicturePath" />
            <a class="cursor-pointer">{{ comment.utilisateur.pseudo }}</a>
          </div>
        </div>
        <div class="text-left min-h-full bg-gray-300 p-6 rounded-lg">
          {{ comment.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentsOeuvre',
  props: {
    oeuvreId: undefined,
    user: undefined
  },
  data () {
    return {
      commentaires: [],
      newComment: '',
      success: 'hidden'
    };
  },
  async fetch () {
    await this.fetchComment();
  },
  methods: {
    async fetchComment () {
      await this.$axios
        .$get(
          'https://emporiumback.fly.dev/commentaire/oeuvres/' + this.oeuvreId
        )
        .then((response) => {
          this.commentaires = [];
          this.commentaires = response;
        });
    },
    submitComment: function () {
      if (this.newComment !== '') {
        const commentaire = {
          UWUid: this.user.uwuid,
          idOeuvre: this.oeuvreId,
          text: this.newComment
        };
        console.log(commentaire);
        this.$axios
          .$post('https://emporiumback.fly.dev/commentaire', commentaire)
          .then(() => {
            this.newComment = '';
            this.fetchComment();
            this.success = 'absolute right-0 top-0 pr-4 text-green-300 text-lg';
            setTimeout(this.hide, 2000);
          });
      }
    },
    hide: function () {
      this.success = 'hidden';
    }
  }
};
</script>
