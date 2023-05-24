<template>
  <div class="grid">
    <div class="grid grid-cols-3 bg-gray-700 m-5 shadow-inner rounded-lg h-fit">
      <div class="grid bg-white p-4 rounded-l-lg h-full">
        <img
          v-if="oeuvre.image"
          class="max-w-sm place-self-center"
          src="oeuvre.image"
        >
        <ImagePlaceholder v-if="!oeuvre.image" class="place-self-center" />
        <div v-if="oeuvre.titre">
          Titre : {{ oeuvre.titre }}
        </div>
        <div v-if="oeuvre.sousTitre">
          Sous Titre : {{ oeuvre.sousTitre }}
        </div>
        <div v-if="oeuvre.description">
          Description : {{ oeuvre.description }}
        </div>
        <div v-if="oeuvre.auteur">
          Auteur : {{ oeuvre.auteur.name }}
        </div>
        <div v-if="oeuvre.type">
          Type : {{ oeuvre.type.name }}
        </div>
        <div v-if="oeuvre.support">
          Support : {{ oeuvre.support.name }}
        </div>
        <div v-if="oeuvre.editeur">
          Editeur : {{ oeuvre.editeur.name }}
        </div>
        <div v-if="oeuvre.genre">
          Genre : {{ oeuvre.genre.name }}
        </div>
      </div>
      <div class="bg-white h-full rounded-r-lg drop-shadow-xl">
        <form class="p-4">
          <div class="mb-4">
            <a class="block text-gray-700 text-sm font-bold mb-2"> Titre </a>
            <input
              v-model="inputTitre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Titre"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Sous titre
            </a>
            <input
              v-model="inputSousTitre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Sous titre"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Description
            </a>
            <input
              v-model="inputDescription"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2"> Image </a>
            <input
              v-model="inputImage"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Image"
            >
            <v-autocomplete
              v-model="inputType"
              :items="listType"
              item-text="name"
              item-value="idType"
              label="Type"
            />
            <v-autocomplete
              v-model="inputAuteur"
              :items="listAuteur"
              item-text="name"
              item-value="idAuteur"
              label="Auteur"
            />
            <v-autocomplete
              v-model="inputEditeur"
              :items="listEditeur"
              item-text="name"
              item-value="idEditeur"
              label="Editeur"
            />
            <v-autocomplete
              v-model="inputSupport"
              :items="listSupport"
              item-text="name"
              item-value="idSupport"
              label="Support"
            />
            <v-autocomplete
              v-model="inputGenre"
              :items="listGenre"
              item-text="name"
              item-value="idGenre"
              label="Genre"
            />
          </div>
          <div class="grid grid-rows-2 text-center">
            <div
              class="flex-auto text-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
              @click="submitBasique()"
            >
              Envoyer
            </div>
            <a :class="fillFullFormError">
              Veuillez remplir tous les champs obligatoires.
            </a>
            <a :class="success"> L'oeuvre a bien été ajoutée. </a>
          </div>
        </form>
      </div>
      <div class="grid p-4 h-full place-items-center">
        <img
          v-if="oeuvre.image"
          class="max-w-sm"
          src="oeuvre.image"
        >
        <ImagePlaceholder v-if="!oeuvre.image" />
        <div>
          Titre : {{ inputTitre }}
        </div>
        <div>
          Sous Titre : {{ inputSousTitre }}
        </div>
        <div>
          Description : {{ inputDescription }}
        </div>
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
