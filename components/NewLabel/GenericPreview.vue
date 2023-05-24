<template>
  <div>
    <div
      class="bg-gray-600 text-center rounded-lg m-4 grid grid-cols-2 p-2 items-center"
    >
      <div>Nom</div>
      <div>Search</div>
    </div>
    <div
      v-for="item in list"
      :key="item.labelId"
      class="m-4 grid grid-cols-2 p-4 items-center text-center"
    >
      <div>{{ item.name }}</div>

      <span
        class="material-symbols-outlined cursor-pointer"
        @click="pushToSearch(item)"
      >
        search
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenericPreview',
  props: {
    list: undefined,
    labelType: undefined
  },
  methods: {
    pushToSearch (item) {
      switch (this.labelType) {
        case 'Type':
          this.$router.push({
            path: '/search',
            query: { t: item.idType }
          });
          break;
        case 'Auteur':
          this.$router.push({
            path: '/search',
            query: { a: item.idAuteur }
          });
          break;
        case 'Genre':
          this.$router.push({
            path: '/search',
            query: { g: item.idGenre }
          });
          break;
        case 'Editeur':
          this.$router.push({
            path: '/search',
            query: { e: item.idEditeur }
          });
          break;
        case 'Support':
          this.$router.push({
            path: '/search',
            query: { s: item.idSupport }
          });
          break;
        default:
          return null;
      }
    }
  }
};
</script>
