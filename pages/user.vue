<template>
  <div class="grid grid-rows-2">
    <div class="grid grid-cols-3 place-content-center">
      <img :src="user.image">
      <div class="col-span-2 grid grid-cols-1 list-none place-content-center">
        <li>
          <a class="m-7">{{ user.firstName }}</a>
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
    </div>
    <div>Collection zone</div>
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
