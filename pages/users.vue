<template>
  <div>
    <div class="flex flex-wrap justify-items-center text-center">
      <div
        v-for="user in users"
        :key="user.uwuid"
        class="bg-gray-600 hover:bg-gray-700 rounded-lg m-4"
        @click="$router.push({ path: '/user', query: { q: user.uwuid } })"
      >
        <div>
          <img v-if="user.profilPicturePath" :src="user.profilPicturePath" class="max-h-28 m-4">
          <ImagePlaceholder v-if="!user.profilPicturePath" />
          <a class="mt-7">{{ user.pseudo }}</a>
        </div>
      </div>
    </div>
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
    const response = await this.$axios.$get('https://emporiumback.fly.dev/utilisateur');
    this.users = response;
  }
};
</script>
