<template>
  <div>
    <div class="bg-white rounded-lg mx-3 p-2 font-bold">
      <div class="text-center text-2xl">
        <div>Utilisateurs d'Emporium</div>
      </div>
      <input
        v-model="inputSearch"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Rechercher un utilisateur"
      >
    </div>
    <div class="grid grid-cols-4">
      <div
        v-for="user in searchUsers"
        :key="user.uwuid"
        class="bg-white rounded-lg m-3 p-2"
      >
        <div class="grid grid-cols-[auto_auto] h-full">
          <div
            class="grid grid-rows-2 divide-y place-items-center text-center h-full"
          >
            <div class="">
              <div v-if="user.pseudo" class="font-bold">
                {{ user.pseudo }}
              </div>
            </div>
            <div>
              <span
                class="h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-1 cursor-pointer"
                title="Ouvrir le profil"
                @click="
                  $router.push({ path: '/user', query: { q: user.uwuid } })
                "
              >
                person_book
              </span>
              <span
                class="h-fit w-fit rounded-full place-items-center material-symbols-outlined items-center p-1 cursor-pointer"
                title="Ouvrir la collection"
                @click="
                  $router.push({ path: '/collection', query: { q: user.uwuid } })
                "
              >
                library_books
              </span>
            </div>
            <div class="grid grid-flow-col divide-x max-w-max">
              <div class="flex items-center px-3">
                {{ user.nbOeuvre
                }}<span
                  class="h-fit w-fit material-symbols-outlined pl-3 text-green-400 cursor-help"
                  title="Oeuvres ajoutées"
                >
                  featured_play_list
                </span>
              </div>
              <div class="flex items-center px-3">
                {{ user.nbFav
                }}<span
                  class="h-fit w-fit material-symbols-outlined pl-3 text-pink-400 cursor-help"
                  title="Oeuvres favorites"
                >
                  favorite
                </span>
              </div>
              <div class="flex items-center px-3">
                {{ user.nbCom
                }}<span
                  class="h-fit w-fit material-symbols-outlined pl-3 text-blue-400 cursor-help"
                  title="Commentaires rédigés"
                >
                  comment
                </span>
              </div>
            </div>
          </div>
          <div class="grid place-items-center h-full">
            <img
              v-if="user.profilPicturePath"
              class="max-w-full max-h-32 shadow-md shadow-black -top-4"
              :src="user.profilPicturePath"
            >
            <ImagePlaceholder v-if="!user.profilPicturePath" />
          </div>
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
      users: [],
      inputSearch: ''
    };
  },
  async fetch () {
    const response = await this.$axios.$get(
      'https://emporiumback.fly.dev/utilisateur'
    );
    this.users = response;
  },
  computed: {
    searchUsers () {
        return this.users.filter((u) => {
          return (
            u.pseudo
              .toLowerCase()
              .includes(this.inputSearch.toLowerCase()) !== false
          );
        });
    }
  }
};
</script>
