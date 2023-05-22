<template>
  <div>
    <div class="grid grid-cols-3 p-4 max-h-25">
      <div class="bg-gray-700 grid place-items-center p-4 rounded-l-lg">
        <img class="max-w-sm" :src="oeuvre.image">
      </div>
      <div class="grid list-none place-content-center text-center bg-gray-700">
        <form class="rounded-lg p-4">
          <div class="">
            <a class="block text-white text-sm font-bold mb-2">
              Titre : {{ oeuvre.titre }}
            </a>
            <input
              v-model="inputTitre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Titre"
            >
            <a class="block text-white text-sm font-bold mb-2">
              Sous titre : {{ oeuvre.sousTitre }}
            </a>
            <input
              v-model="inputSousTitre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Sous titre"
            >
            <a class="block text-white text-sm font-bold mb-2">
              Description : {{ oeuvre.description }}
            </a>
            <input
              v-model="inputDescription"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
            >
            <div class="grid grid-cols-2">
              <a
                v-if="oeuvre.type"
                class="block text-white text-sm font-bold mb-2"
              >
                Type : {{ oeuvre.type.name }}
              </a>
              <span
                class="material-symbols-outlined"
                @click="getLabelList('type')"
              >
                storage
              </span>
            </div>
            <input
              v-model="inputType"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Type"
            >
            <div class="grid grid-cols-2">
              <a
                v-if="oeuvre.auteur"
                class="block text-white text-sm font-bold mb-2"
              >
                Auteur : {{ oeuvre.auteur.name }}
              </a>
              <span
                class="material-symbols-outlined"
                @click="getLabelList('auteur')"
              >
                storage
              </span>
            </div>
            <input
              v-model="inputAuteur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Auteur"
            >
            <div class="grid grid-cols-2">
              <a
                v-if="oeuvre.editeur"
                class="block text-white text-sm font-bold mb-2"
              >
                Editeur : {{ oeuvre.editeur.name }}
              </a>
              <span
                class="material-symbols-outlined"
                @click="getLabelList('editeur')"
              >
                storage
              </span>
            </div>
            <input
              v-model="inputEditeur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Editeur"
            >
            <div class="grid grid-cols-2">
              <a
                v-if="oeuvre.support"
                class="block text-white text-sm font-bold mb-2"
              >
                Support : {{ oeuvre.support.name }}
              </a>
              <span
                class="material-symbols-outlined"
                @click="getLabelList('support')"
              >
                storage
              </span>
            </div>
            <input
              v-model="inputSupport"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Support"
            >
            <div class="grid grid-cols-2">
              <a
                v-if="oeuvre.genre"
                class="block text-white text-sm font-bold mb-2"
              >
                Genre : {{ oeuvre.genre.name }}
              </a>
              <span
                class="material-symbols-outlined"
                @click="getLabelList('genre')"
              >
                storage
              </span>
            </div>
            <input
              v-model="inputGenre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Genre"
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
              type="button"
              @click="submitOeuvre()"
            >
              Envoyer
            </button>
            <a :class="fillFullFormError">
              Veuillez remplir tous les champs obligatoires.
            </a>
          </div>
        </form>
      </div>
      <div class="bg-gray-700 rounded-r-lg">
        <ul v-if="labelList" class="justify-items-center text-center pt-1">
          <li class="grid grid-cols-3 p-2 items-center">
            <a>ID</a>
            <a>Name</a>
            <a>Edit</a>
          </li>
          <li
            v-for="label in labelList"
            :key="label.id"
            class="grid grid-cols-3 p-4 items-center"
          >
            <a>{{ label.id }}</a>
            <a>{{ label.name }}</a>
            <span
              class="material-symbols-outlined bg-gray-600 hover:bg-gray-700 rounded-full cursor-pointer"
            >
              edit
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OeuvrePage',
  data () {
    return {
      oeuvre: [],
      success: 'hidden',
      fillFullFormError: 'hidden',
      inputTitre: undefined,
      inputSousTitre: undefined,
      inputDescription: undefined,
      inputImage: undefined,
      inputType: undefined,
      inputAuteur: undefined,
      inputEditeur: undefined,
      inputSupport: undefined,
      inputGenre: undefined,
      labelList: undefined
    };
  },
  async fetch () {
    // exact user
    await this.$axios
      .$get('https://emporiumback.fly.dev/oeuvres/' + this.$route.query.q)
      .then(reponse => (this.oeuvre = reponse))
      .catch(error => console.log(error));
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    submitOeuvre: function () {
      if (this.oeuvre.titre !== null) {
        const editedOeuvre = {
          idOeuvre: this.oeuvre.idOeuvre,
          titre: this.inputTitre,
          sousTitre: this.inputSousTitre,
          description: this.inputDescription,
          image: this.inputImage,
          idType: this.inputType,
          idAuteur: this.inputAuteur,
          idEditeur: this.inputEditeur,
          idSupport: this.inputSupport,
          idGenre: this.inputGenre
        };
        if (this.inputTitre === undefined) {
          editedOeuvre.titre = this.oeuvre.titre;
        }
        if (this.inputImage === undefined) {
          editedOeuvre.image = this.oeuvre.image;
        }
        if (this.inputType === undefined) {
          editedOeuvre.idType = this.oeuvre.type.idType;
        }
        if (this.inputAuteur === undefined) {
          editedOeuvre.idAuteur = this.oeuvre.auteur.idAuteur;
        }
        if (this.inputEditeur === undefined) {
          editedOeuvre.idEditeur = this.oeuvre.editeur.idEditeur;
        }
        if (this.inputSupport === undefined) {
          editedOeuvre.idSupport = this.oeuvre.support.idSupport;
        }
        if (this.inputGenre === undefined) {
          editedOeuvre.idGenre = this.oeuvre.genre.idGenre;
        }

        this.$axios
          .$put('https://emporiumback.fly.dev/oeuvres', editedOeuvre)
          .then(console.log('youpi'))
          .catch(function () {
            console.log('issue with post');
          });
      } else {
        console.log('titre undefined');
      }
    },
    getLabelList (whichLabel) {
      this.$axios
        .$get('https://emporiumback.fly.dev/' + whichLabel)
        .then(response => (this.labelList = response))
        .catch(function () {
          console.log('issue with post');
        });
    }
  }
};
</script>
