<template>
  <div>
    <div class="grid grid-rows-[auto_auto_auto]">
      <CompleteAccountDialog v-if="dialog" :can-disable="true" />
      <div class="grid grid-cols-2">
        <div class="bg-white p-5 mr-5 mb-5 rounded-lg">
          <MostPopularCat />
        </div>
        <div class="bg-blue-500 p-5 mb-5 rounded-lg">
          Last connected user
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="bg-white p-5 mr-5 rounded-lg">
          Dernières oeuvres modifiées :
          <div
            class="bg-gray-200 rounded-lg grid grid-cols-3 p-2 text-center items-center"
          >
            <a>Image</a>
            <a>Nom</a>
            <a>Date</a>
          </div>
          <div
            v-for="oeuvre in lastModified"
            :key="oeuvre.idOeuvre"
            class="bg-gray-200 hover:bg-gray-300 rounded-lg my-4 cursor-pointer grid grid-cols-3 p-4 place-items-center"
            @click="
              $router.push({ path: '/oeuvre', query: { q: oeuvre.idOeuvre } })
            "
          >
            <img
              v-if="oeuvre.imagePath"
              :src="oeuvre.imagePath"
              class="max-h-20"
            >
            <ImagePlaceholder v-if="!oeuvre.imagePath" />
            <a>{{ oeuvre.titre }}</a>
            <a>{{ oeuvre.modificationDate }}</a>
          </div>
        </div>
        <div class="bg-white p-5 mr-5 rounded-lg">
          Dernières oeuvres modifiées :
          <div
            class="bg-gray-200 rounded-lg grid grid-cols-3 p-2 text-center items-center"
          >
            <a>Oeuvre</a>
            <a>Auteur</a>
            <a>Message</a>
          </div>
          <div
            v-for="commentaire in lastComments"
            :key="commentaire.idCommentaire"
            class="bg-gray-200 hover:bg-gray-300 rounded-lg my-4 cursor-pointer grid grid-cols-3 p-4 place-items-center"
            @click="
              $router.push({
                path: '/oeuvre',
                query: { q: commentaire.idOeuvre }
              })
            "
          >
            <img
              v-if="commentaire.imagePath"
              :src="commentaire.imagePath"
              class="max-h-20"
            >
            <ImagePlaceholder v-if="!commentaire.imagePath" />
            <div>{{ commentaire.commentaire.utilisateur.pseudo }}</div>
            <div class="text-ellipsis overflow-hidden">
              {{ commentaire.commentaire.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MostPopularCat from '~/components/Index/MostPopularCat.vue';
import CompleteAccountDialog from '~/components/User/CompleteAccountDialog.vue';

export default {
  name: 'IndexPage',
  components: { MostPopularCat, CompleteAccountDialog },
  data () {
    return {
      lastModified: [],
      lastComments: [],
      isAuthentified: false,
      dialog: false
    };
  },
  async fetch () {
    await this.$axios
      .$get('https://emporiumback.fly.dev/oeuvres/lastModified')
      .then((response) => {
        this.lastModified = response;
      });
    await this.$axios
      .$get('https://emporiumback.fly.dev/commentaire/last')
      .then((response) => {
        this.lastComments = response;
      });
    await this.$axios
      .$get('https://emporiumback.fly.dev/utilisateur/' + this.$auth.user.email)
      .then(() => {
        this.dialog = false;
      })
      .catch(() => {
        this.dialog = true;
      });
  }
};
</script>
