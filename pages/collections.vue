<template>
  <div>
    <ul class="justify-items-center text-center">
      <li class="grid grid-cols-[minmax(10%,10%)_1fr_1fr_1fr_1fr]">
        <a>Image</a>
        <a>Nom</a>
        <a>Type</a>
        <a>Catégorie</a>
        <a>Description</a>
      </li>
      <li
        v-for="item in items"
        :key="item.id"
        class="bg-gray-600 hover:bg-gray-700 rounded-lg m-4 grid grid-cols-[max(10%)_1fr_1fr_1fr_1fr]"
      >
        <img :src="item.thumbnail">
        <a class="m-7">{{ item.title }}</a>
        <a class="">{{ item.category }}</a>
        <a>{{ item.brand }}</a>
        <a>{{ item.description }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CollectionsPage',
  data () {
    return {
      items: []
    };
  },
  async fetch () {
    const response = await this.$axios.$get('https://dummyjson.com/products');
    this.items = response.products;
  }
};
</script>
