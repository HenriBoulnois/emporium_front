<template>
  <div>
    <ul class="grid grid-cols-4 justify-items-center text-center">
      <li
        v-for="user in users"
        :key="user.id"
        class="bg-gray-600 hover:bg-gray-700 rounded-lg m-4"
      >
        <img :src="user.image">
        <a class="m-7">{{ user.firstName }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UsersPage',
  data () {
    return {
      users: []
    };
  },
  async fetch () {
    const response = await this.$axios.$get('https://dummyjson.com/users');
    this.users = response.users;
  }
};
</script>
