<template>
  <div class="">
    <div class="text-white text-lg">
      Commentaires :
    </div>
    <div :class="success">
      Le commentaire a bien été ajouté.
    </div>
    <div v-if="user.pseudo" class="grid grid-rows-2 bg-white rounded-lg p-4 mb-4">
      <input
        v-model="newComment"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Nouveau commentaire"
      >
      <div
        class="flex-auto text-center text-white bg-gray-700 cursor-pointer hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2"
        @click="submitComment()"
      >
        Envoyer
      </div>
    </div>
    <div class="justify-items-center text-center">
      <div
        v-for="comment in commentaires"
        :key="comment.idCommentaire"
        class="bg-white rounded-lg grid grid-cols-[15%_1fr] items-center p-4 mb-4"
      >
        <div class="grid grid-rows-[auto_auto] place-items-center">
          <div
            class="cursor-pointer"
            @click="
              $router.push({
                path: '/user',
                query: { q: comment.utilisateur.uwuid }
              })
            "
          >
            <img
              v-if="comment.utilisateur.profilPicturePath"
              class="max-w-full max-h-32 shadow-md shadow-gray-200"
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
          uwuid: this.user.uwuid,
          idOeuvre: this.oeuvreId,
          text: this.newComment
        };
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
