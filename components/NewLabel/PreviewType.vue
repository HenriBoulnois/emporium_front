<template>
  <div>
    <div
      class="bg-gray-600 text-center rounded-lg m-4 grid grid-cols-2 p-2 items-center"
    >
      <a>Nom</a>
      <a>Search</a>
    </div>
    <div
      v-for="type in listType"
      :key="type.idType"
      class="m-4 cursor-pointer grid grid-cols-2 p-4 items-center text-center"
    >
      <a>{{ type.name }}</a>
      <a
        @click="
          $router.push({
            path: '/search',
            query: { t: type.idType }
          })
        "
      >Search</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewType',
  props: {
    listType: undefined
  }
  /* data () {
    return {
      listType: ''
    };
  } */
};
</script>
