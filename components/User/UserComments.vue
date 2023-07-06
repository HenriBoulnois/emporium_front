<template>
  <div v-if="comments">
    <div class="text-center font-bold">
      Derniers commentaires
    </div>
    <div
      v-for="comment in comments"
      :key="comment.idComment"
      class="grid grid-cols-[40%_60%] p-4 items-center text-center cursor-pointer"
    >
      <div class="grid place-items-center">
        <img
          v-if="comment.imagePath"
          class="max-w-full max-h-24 shadow-md shadow-black"
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
      <div class="text-justify">
        {{ comment.commentaire.text }}
      </div>
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
