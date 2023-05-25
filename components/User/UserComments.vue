<template>
  <div>
    Derniers commentaires :
    <div
      v-for="comment in comments"
      :key="comment.idComment"
      class="grid grid-cols-2 p-4 items-center text-center cursor-pointer h-full"
    >
      <div>{{ comment.text }}</div>
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
        'https://emporiumback.fly.dev/commentaire/utilisateur/' +
          this.userId
      )
      .then(response => (this.comments = response))
      .catch(error => console.log(error));
  }
};
</script>
