<template>
  <div>
    <div class="grid">
      <div class="grid grid-cols-3 bg-gray-700 shadow-inner rounded-lg h-fit">
        <div class="grid bg-white p-4 rounded-l-lg h-full">
          <span
            class="material-symbols-outlined cursor-pointer hover:bg-red-400 h-fit w-fit rounded-full p-1"
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
              <label class="btn btn-default">
                <input
                  id="file"
                  ref="file"
                  type="file"
                  accept="image/jpeg, image/png"
                  @change="fileUpload()"
                >
              </label>
              <div v-if="imagePreview">
                Image chargée avec succes
              </div>
              <v-autocomplete
                v-model="inputType"
                :items="listType"
                item-text="name"
                return-object
                label="Type"
              />
              <v-autocomplete
                v-model="inputAuteur"
                :items="listAuteur"
                item-text="name"
                return-object
                label="Auteur"
              />
              <v-autocomplete
                v-model="inputEditeur"
                :items="listEditeur"
                item-text="name"
                return-object
                label="Editeur"
              />
              <v-autocomplete
                v-model="inputSupport"
                :items="listSupport"
                item-text="name"
                return-object
                label="Support"
              />
              <v-autocomplete
                v-model="inputGenre"
                :items="listGenre"
                item-text="name"
                return-object
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
          <div v-if="oeuvre.idOeuvre" class="">
            Visualisation des changements
          </div>
          <img
            v-if="imagePreview"
            class="max-w-full max-h-52"
            :src="imagePreview"
          >
          <ImagePlaceholder v-if="!imagePreview" />
          <div v-if="inputTitre">
            Titre : {{ inputTitre }}
          </div>
          <div v-if="!inputTitre">
            Titre : {{ oeuvre.titre }}
          </div>
          <div v-if="inputSousTitre">
            Sous Titre : {{ inputSousTitre }}
          </div>
          <div v-if="!inputSousTitre">
            Sous Titre : {{ oeuvre.sousTitre }}
          </div>
          <div v-if="inputDescription">
            Description : {{ inputDescription }}
          </div>
          <div v-if="!inputDescription">
            Description : {{ oeuvre.description }}
          </div>
          <div v-if="oeuvre.auteur">
            Auteur :
            {{
              inputAuteur === undefined ? oeuvre.auteur.name : inputAuteur.name
            }}
          </div>
          <div v-if="oeuvre.type">
            Type :
            {{ inputType === undefined ? oeuvre.type.name : inputType.name }}
          </div>
          <div v-if="oeuvre.support">
            Support :
            {{
              inputSupport === undefined
                ? oeuvre.support.name
                : inputSupport.name
            }}
          </div>
          <div v-if="oeuvre.editeur">
            Editeur :
            {{
              inputEditeur === undefined
                ? oeuvre.editeur.name
                : inputEditeur.name
            }}
          </div>
          <div v-if="oeuvre.genre">
            Genre :
            {{ inputGenre === undefined ? oeuvre.genre.name : inputGenre.name }}
          </div>
        </div>
      </div>
    </div>
    <CompleteAccountDialog v-if="dialog" :can-disable="false" />
  </div>
</template>

<script>
import CompleteAccountDialog from '~/components/User/CompleteAccountDialog.vue';
export default {
  name: 'OeuvrePage',
  components: {
    CompleteAccountDialog
  },
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
      listType: undefined,
      listAuteur: undefined,
      listEditeur: undefined,
      listSupport: undefined,
      listGenre: undefined,
      deleteSuccess: 'hidden',
      imageUpload: undefined,
      imagePreview: undefined,
      dialog: false
    };
  },
  async fetch () {
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
    if (this.$auth.loggedIn === undefined) {
      this.dialog = true;
    } else {
      await this.$axios
        .$get(
          'https://emporiumback.fly.dev/utilisateur/' + this.$auth.user.email
        )
        .then(() => {
          this.dialog = false;
        })
        .catch(() => {
          this.dialog = true;
        });
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    fileUpload () {
      this.imageUpload = this.$refs.file.files[0];
      this.imagePreview = URL.createObjectURL(this.imageUpload);
    },
    submitOeuvre: function () {
      if (this.oeuvre.titre !== undefined) {
        const editedOeuvre = new FormData();
        editedOeuvre.append('idOeuvre', this.oeuvre.idOeuvre);
        if (this.imageUpload !== undefined) {
          editedOeuvre.append('image', this.imageUpload);
          editedOeuvre.append('imageName', this.imageUpload.name);
        }
        editedOeuvre.append(
          'titre',
          this.inputTitre === undefined ? this.oeuvre.titre : this.inputTitre
        );
        editedOeuvre.append(
          'sousTitre',
          this.inputSousTitre === undefined
            ? this.oeuvre.sousTitre
            : this.inputSousTitre
        );
        editedOeuvre.append(
          'description',
          this.inputDescription === undefined
            ? this.oeuvre.description
            : this.inputDescription
        );
        editedOeuvre.append(
          'idType',
          this.inputType === undefined
            ? this.oeuvre.type.idType
            : this.inputType.idType
        );
        editedOeuvre.append(
          'idAuteur',
          this.inputAuteur === undefined
            ? this.oeuvre.auteur.idAuteur
            : this.inputAuteur.idAuteur
        );
        editedOeuvre.append(
          'idEditeur',
          this.inputEditeur === undefined
            ? this.oeuvre.editeur.idEditeur
            : this.inputEditeur.idEditeur
        );
        editedOeuvre.append(
          'idSupport',
          this.inputSupport === undefined
            ? this.oeuvre.support.idSupport
            : this.inputSupport.idSupport
        );
        editedOeuvre.append(
          'idGenre',
          this.inputGenre === undefined
            ? this.oeuvre.genre.idGenre
            : this.inputGenre.idGenre
        );

        console.log(editedOeuvre);
        this.$axios
          .$put('https://emporiumback.fly.dev/oeuvres', editedOeuvre)
          .then(() => {
            this.fillFullFormError = 'hidden';
            this.success = '';
          })
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
