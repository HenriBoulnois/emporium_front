<template>
  <div v-if="comments">
    <div class="text-center font-bold pt-4">
      Derniers commentaires
    </div>
    <div
      v-for="comment in comments"
      :key="comment.idComment"
      class="grid grid-cols-2 p-4 items-center text-center cursor-pointer h-full"
    >
      <div class="grid place-items-center">
        <img
          v-if="comment.imagePath"
          class="max-w-full max-h-32"
          :src="comment.imagePath"
          @click="
            $router.push({
              path: '/oeuvre',
              query: { q: comment.idOeuvre }
            })
          "
        >
        <ImagePlaceholder
          v-if="!comment.imagePath"
          @click="
            $router.push({
              path: '/oeuvre',
              query: { q: comment.idOeuvre }
            })
          "
        />
      </div>
      <div>{{ comment.commentaire.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelatedOeuvre',
  props: {
    userId: undefined
  },
  data () {
    return {
      comments: ''
    };
  },
  async fetch () {
    await this.$axios
      .$get(
        'https://emporiumback.fly.dev/commentaire/utilisateur/' + this.userId
      )
      .then(response => (this.comments = response));
  }
};
</script>
