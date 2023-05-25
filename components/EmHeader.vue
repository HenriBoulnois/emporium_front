<template>
  <div
    class="h-full px-3 py-4 bg-gray-900 grid grid-cols-[auto_1fr_minmax(40%,40%)_1fr_auto]"
  >
    <NuxtLink class="flex" to="/">
      <a
        class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 w-fit"
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        >
        <span class="material-symbols-outlined"> diamond </span>
        <span class="ml-3 font-extrabold"> Emporium </span>
      </a>
    </NuxtLink>
    <div />
    <div>
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Rechercher</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
            class="block w-full p-4 pl-10 text-sm text-gray-900 border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400"
            placeholder="Rechercher objects, personnes, ..."
          >
          <button
            class="text-white absolute right-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
            @click.prevent="searchInput"
          >
            Rechercher
          </button>
        </div>
      </form>
    </div>
    <div />
    <NuxtLink class="flex items-center" to="/login">
      <img v-if="$auth.loggedIn" class="max-h-12" :src="$auth.user.picture">
      <span v-if="!$auth.loggedIn" class="flex material-symbols-outlined text-white">
        person
      </span>
      <span class="flex ml-3 whitespace-nowrap">
        <a v-if="!$auth.loggedIn" class="text-white">Mon compte</a>
        <a v-if="$auth.loggedIn">{{ $auth.user.name }}</a>
      </span>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'EmHeader',
  data () {
    return {
      input: ''
    };
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
