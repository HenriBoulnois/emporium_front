<template>
  <div>
    <div class="justify-items-center text-center">
      <v-data-table
        :headers="headers"
        :items="oeuvres"
        :items-per-page="10"
        loading
        loading-text="Chargements des oeuvres en cours"
        :footer-props="{
          'items-per-page-text': 'Oeuvres par page',
          'items-per-page-options': [5, 10, 30, 50, 100]
        }"
      >
        <template #item="{ item }">
          <tr
            @click="
              $router.push({ path: '/oeuvre', query: { q: item.idOeuvre } })
            "
          >
            <div class="flex justify-center m-5">
              <img
                v-if="item.imagePath"
                :src="item.imagePath"
                class="max-h-28 shadow-lg shadow-black"
              >
              <ImagePlaceholder v-if="!item.imagePath" />
            </div>
            <td>{{ item.titre }}</td>
            <td>{{ item.auteur.name }}</td>
            <td>{{ item.genre.name }}</td>
            <td>{{ item.support.name }}</td>
            <td>{{ item.type.name }}</td>
          </tr>
        </template>
        <template #[`footer.page-text`]="props">
          {{ props.pageStart }} - {{ props.pageStop }} sur
          {{ props.itemsLength }}
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import ImagePlaceholder from '~/components/ImagePlaceholder.vue';

export default {
  name: 'OeuvresPage',
  comments: {
    ImagePlaceholder
  },
  data () {
    return {
      headers: [
        { text: 'Image', value: 'imagePath', align: 'center', width: '20%' },
        { text: 'Nom', value: 'titre', align: 'center', width: '20%' },
        { text: 'Auteur', value: 'auteur.name', align: 'center', width: '16%' },
        { text: 'Genre', value: 'genre.name', align: 'center', width: '16%' },
        {
          text: 'Support',
          value: 'support.name',
          align: 'center',
          width: '16%'
        },
        { text: 'Catégorie', value: 'type.name', align: 'center', width: '16%' }
      ],
      oeuvres: []
    };
  },
  async fetch () {
    const response = await this.$axios.$get(
      'https://emporiumback.fly.dev/oeuvres/firstPack'
    );
    this.oeuvres = response;
  }
};
</script>
