<template>
  <div class="grid">
    <div class="grid grid-cols-3 bg-gray-700 shadow-inner rounded-lg h-fit">
      <div class="grid bg-white p-4 rounded-l-lg h-full">
        <span
          class="material-symbols-outlined bg-red-400 h-fit w-fit rounded-full p-1"
          @click="deleteOeuvre()"
        >
          delete
        </span>
        <div :class="deleteSuccess">
          L'oeuvre a été supprimé
        </div>
        <div class="place-self-center">
          Informations actuelles
        </div>
        <img
          v-if="oeuvre.imagePath"
          class="max-w-full max-h-52 place-self-center"
          :src="oeuvre.imagePath"
        >
        <ImagePlaceholder v-if="!oeuvre.imagePath" />
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
      <div class="grid bg-white p-4 h-full rounded-r-lg drop-shadow-xl">
        <div class="place-self-center">
          Formulaire de modification
        </div>
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
              @click="submitOeuvre()"
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
        <div class="">
          Visualisation des changements
        </div>
        <img v-if="oeuvre.imagePath" class="max-w-full max-h-52" :src="oeuvre.imagePath">
        <ImagePlaceholder v-if="!oeuvre.imagePath" />
        <div>Titre : {{ inputTitre }}</div>
        <div>Sous Titre : {{ inputSousTitre }}</div>
        <div>Description : {{ inputDescription }}</div>
        <div v-if="oeuvre.auteur">
          Auteur :
        </div>
        <div v-if="oeuvre.type">
          Type :
        </div>
        <div v-if="oeuvre.support">
          Support :
        </div>
        <div v-if="oeuvre.editeur">
          Editeur :
        </div>
        <div v-if="oeuvre.genre">
          Genre :
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
      labelList: undefined,
      listType: '',
      listAuteur: '',
      listEditeur: '',
      listSupport: '',
      listGenre: '',
      deleteSuccess: 'hidden'
    };
  },
  async fetch () {
    // exact user
    await this.$axios
      .$get('https://emporiumback.fly.dev/oeuvres/' + this.$route.query.q)
      .then(reponse => (this.oeuvre = reponse))
      .catch(error => console.log(error));
    await this.$axios
      .$get('https://emporiumback.fly.dev/type')
      .then((response) => {
        this.listType = response;
      });
    await this.$axios
      .$get('https://emporiumback.fly.dev/auteur')
      .then((response) => {
        this.listAuteur = response;
      });
    await this.$axios
      .$get('https://emporiumback.fly.dev/editeur')
      .then((response) => {
        this.listEditeur = response;
      });
    await this.$axios
      .$get('https://emporiumback.fly.dev/support')
      .then((response) => {
        this.listSupport = response;
      });
    await this.$axios
      .$get('https://emporiumback.fly.dev/genre')
      .then((response) => {
        this.listGenre = response;
      });
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
          image: this.inputImagePath,
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
    deleteOeuvre () {
      this.$axios
        .$delete(
          'https://emporiumback.fly.dev/oeuvres/delete/' + this.oeuvre.idOeuvre
        )
        .then(() => {
          this.deleteSuccess = '';
          setTimeout(this.$router.push({ path: '/oeuvres' }), 10000);
        })
        .catch(function () {
          console.log('issue with delete');
        });
    }
  }
};
</script>
