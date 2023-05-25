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
        class="bg-gray-600 rounded-lg grid grid-cols-[10%_1fr_10%] items-center p-4 mt-4"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentsOeuvre',
  props: {
    oeuvreId: undefined
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
          UWUid: '1',
          idOeuvre: this.oeuvreId,
          text: this.newComment
        };
        console.log(commentaire);
        this.$axios
          .$post('https://emporiumback.fly.dev/commentaire', commentaire)
          .then(
            (this.newComment = ''),
            (this.success =
              'absolute right-0 top-0 pr-4 text-green-300 text-lg'),
            setTimeout(this.hide, 2000)
          )
          .then(this.fetchComment());
      }
    },
    hide: function () {
      this.success = 'hidden';
    }
  }
};
</script>
