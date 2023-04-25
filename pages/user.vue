<template>
  <div class="grid grid-rows-2">
    <div class="grid grid-cols-3 max-h-fit m-5">
      <div class="bg-blue-500 grid place-items-center">
        <img :src="user.image">
      </div>
      <div class="grid grid-cols-1 list-none place-content-center bg-blue-600">
        <li>
          <a class="">{{ user.firstName }}</a>
        </li>
        <li>
          <a class="">{{ user.lastName }}</a>
        </li>
        <li>
          <a>{{ user.birthDate }}</a>
        </li>
        <li>
          <a>{{ user.university }}</a>
        </li>
      </div>
      <div class="bg-blue-700">
        Favorite items
      </div>
    </div>
    <div class="bg-blue-400">
      Collection zone
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  data () {
    return {
      user: []
    };
  },
  async fetch () {
    // exact user
    const response = await this.$axios.$get(
      'https://dummyjson.com/users/search?q=' + this.$route.query.q
    );
    this.user = response.users[0];
  },
  watch: {
    '$route.query': '$fetch'
  }
};
</script>
