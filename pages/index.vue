<template>
  <div>
    <div class="grid grid-rows-[auto_auto_auto]">
      <CompleteAccountDialog v-if="dialog" :can-disable="true" />
      <div class="grid grid-cols-2">
        <div class="bg-white p-5 mb-5 mr-5 rounded-lg grid place-items-center">
          <div>Emporium est un site de gestion de collection où chacun peut participer en ajoutant les oeuvres qu'il possède afin de créer une base de données utilisable par tous.</div>
          <div>Site web réalisé par Henri Boulnois et Tristan Six</div>
        </div>
        <div class="bg-white p-5 mb-5 rounded-lg">
          <MostPopularCat />
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="bg-white p-5 mr-5 rounded-lg">
          Dernières oeuvres modifiées :
          <div
            class="rounded-lg grid grid-cols-3 p-2 text-center items-center"
          >
            <a>Image</a>
            <a>Nom</a>
            <a>Date</a>
          </div>
          <div
            v-for="oeuvre in lastModified"
            :key="oeuvre.idOeuvre"
            class="rounded-lg my-4 cursor-pointer grid grid-cols-3 p-4 place-items-center border-t-[1px]"
            @click="
              $router.push({ path: '/oeuvre', query: { q: oeuvre.idOeuvre } })
            "
          >
            <img
              v-if="oeuvre.imagePath"
              :src="oeuvre.imagePath"
              class="max-h-20 shadow-lg shadow-black"
            >
            <ImagePlaceholder v-if="!oeuvre.imagePath" />
            <a>{{ oeuvre.titre }}</a>
            <a>{{ oeuvre.modificationDate | moment(" HH:mm:ss DD/MM/YYYY") }}</a>
          </div>
        </div>
        <div class="bg-white p-5 rounded-lg">
          Derniers commentaires :
          <div
            class="rounded-lg grid grid-cols-3 p-2 text-center items-center"
          >
            <a>Oeuvre</a>
            <a>Auteur</a>
            <a>Message</a>
          </div>
          <div
            v-for="commentaire in lastComments"
            :key="commentaire.idCommentaire"
            class="rounded-lg my-4 cursor-pointer grid grid-cols-3 p-4 place-items-center border-t-[1px]"
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
              class="max-h-20 shadow-lg shadow-black"
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
    if (this.$auth.loggedIn) {
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
  }
};
</script>
