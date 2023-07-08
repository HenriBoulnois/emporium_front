<template>
  <div
    class="h-full px-3 py-4 bg-gray-700 grid grid-cols-[auto_1fr_minmax(40%,40%)_1fr_auto]"
  >
    <NuxtLink class="flex" to="/">
      <a
        class="flex items-center p-2 rounded-lg text-white w-fit"
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        >
        <img class="max-h-10" src="./../static/favicon.jpg">
        <span class="ml-3 font-extrabold text-2xl font-mono"> Emporium </span>
      </a>
    </NuxtLink>
    <div />
    <div>
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium sr-only"
        >Rechercher</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            v-model="input"
            class="block w-full p-4 pl-10 text-sm border bg-white rounded-lg placeholder-black text-black"
            placeholder="Rechercher des oeuvres"
          >
          <button
            class="text-white absolute right-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2"
            @click.prevent="searchInput"
          >
            Rechercher
          </button>
        </div>
      </form>
    </div>
    <div />
    <div v-if="$auth.loggedIn" class="place-items-center flex justify-end">
      <div v-if="user" class="grid grid-cols-2 place-items-center">
        <img
          v-if="user.profilPicturePath"
          class="max-h-12 mr-6"
          :src="user.profilPicturePath"
        >
        <div
          v-if="!user.profilPicturePath"
          class="material-symbols-outlined text-white"
        >
          person
        </div>
        <div
          v-if="user.pseudo"
          class="text-white mr-8 cursor-pointer"
          @click="
            $router.push({
              path: '/user',
              query: { q: user.uwuid }
            })
          "
        >
          {{ user.pseudo }}
        </div>
      </div>
      <div
        v-if="!user"
        class="flex items-center text-black mr-8 cursor-pointer bg-white rounded-lg px-3 h-full hover:shadow-md hover:shadow-gray-900"
        @click="
          $router.push({
            path: '/new/user'
          })
        "
      >
        Configurer mon compte
      </div>
      <div
        class="flex items-center text-black mr-8 cursor-pointer bg-white rounded-lg px-3 h-full hover:shadow-md hover:shadow-gray-900"
        @click="$auth.logout()"
      >
        Me déconnecter
      </div>
    </div>
    <div class="grid place-items-center">
      <div
        v-if="!$auth.loggedIn"
        class="flex items-center text-black mr-8 cursor-pointer bg-white rounded-lg px-3 h-full hover:shadow-md hover:shadow-gray-900"
        @click="
          $router.push({
            path: '/login'
          })
        "
      >
        Se connecter / S'inscrire
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmHeader',
  data () {
    return {
      input: '',
      user: undefined
    };
  },
  async fetch () {
    if (this.$auth.loggedIn === undefined) {
      this.user = undefined;
    } else {
      await this.$axios
        .$get(
          'https://emporiumback.fly.dev/utilisateur/' + this.$auth.user.email
        )
        .then((response) => {
          this.user = response;
        });
    }
  },
  methods: {
    searchInput: function () {
      if (this.input !== '') {
        this.$router.push({ path: '/search', query: { q: this.input } });
        this.input = '';
      }
    }
  }
};
</script>

<style scoped></style>
