<template>
  <div>
    <div class="grid">
      <div
        class="grid grid-cols-[1fr_1fr_1fr] bg-white shadow-inner rounded-lg h-fit"
      >
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
            class="max-w-full max-h-52 place-self-center shadow-lg shadow-black"
            :src="oeuvre.imagePath"
          >
          <ImagePlaceholder v-if="!oeuvre.imagePath" />
          <div v-if="oeuvre.titre" class="truncate">
            Titre : {{ oeuvre.titre }}
          </div>
          <div v-if="oeuvre.sousTitre" class="truncate">
            <div v-if="oeuvre.sousTitre === 'null'">
              Sous Titre :
            </div>
            <div v-if="oeuvre.sousTitre !== 'null'">
              Sous Titre : {{ oeuvre.sousTitre }}
            </div>
          </div>
          <div v-if="oeuvre.description" class="line-clamp-10">
            <div v-if="oeuvre.description === 'null'">
              Description :
            </div>
            <div v-if="oeuvre.description !== 'null'">
              Description : {{ oeuvre.description }}
            </div>
          </div>
          <div v-if="oeuvre.auteur" class="truncate">
            Auteur : {{ oeuvre.auteur.name }}
          </div>
          <div v-if="oeuvre.type" class="truncate">
            Catégorie : {{ oeuvre.type.name }}
          </div>
          <div v-if="oeuvre.support" class="truncate">
            Support : {{ oeuvre.support.name }}
          </div>
          <div v-if="oeuvre.editeur" class="truncate">
            Editeur : {{ oeuvre.editeur.name }}
          </div>
          <div v-if="oeuvre.genre" class="truncate">
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
              <textarea
                v-model="inputDescription"
                placeholder="Description"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                cols="40"
                rows="5"
              />
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
              <div v-if="imageLoaded">
                Image chargée avec succes
              </div>
              <v-combobox
                v-model="inputType"
                :items="listType"
                item-text="name"
                return-object
                label="Catégorie"
              />
              <v-combobox
                v-model="inputAuteur"
                :items="listAuteur"
                item-text="name"
                return-object
                label="Auteur"
              />
              <v-combobox
                v-model="inputEditeur"
                :items="listEditeur"
                item-text="name"
                return-object
                label="Editeur"
              />
              <v-combobox
                v-model="inputSupport"
                :items="listSupport"
                item-text="name"
                return-object
                label="Support"
              />
              <v-combobox
                v-model="inputGenre"
                :items="listGenre"
                item-text="name"
                return-object
                label="Genre"
              />
            </div>
            <div class="grid grid-rows-2 text-center">
              <div
                class="flex-auto text-center text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer"
                @click="submitOeuvre()"
              >
                Envoyer
              </div>
              <a :class="fillFullFormError">
                Veuillez remplir tous les champs obligatoires.
              </a>
              <a :class="success"> L'oeuvre a bien été modifiée. </a>
            </div>
          </form>
        </div>
        <div class="grid p-4 h-full place-items-center bg-white rounded-r-lg">
          <div v-if="oeuvre.idOeuvre" class="">
            Visualisation des changements
          </div>
          <img
            v-if="imagePreview"
            class="max-w-full max-h-52"
            :src="imagePreview"
          >
          <ImagePlaceholder v-if="!imagePreview" />
          <div v-if="inputTitre" class="truncate">
            Titre : {{ inputTitre }}
          </div>
          <div v-if="!inputTitre" class="truncate">
            Titre : {{ oeuvre.titre }}
          </div>
          <div v-if="inputSousTitre" class="truncate">
            Sous Titre : {{ inputSousTitre }}
          </div>
          <div v-if="!inputSousTitre" class="truncate">
            <div v-if="oeuvre.sousTitre === 'null'">
              Sous Titre :
            </div>
            <div v-if="oeuvre.sousTitre !== 'null'">
              Sous Titre : {{ oeuvre.sousTitre }}
            </div>
          </div>
          <div v-if="inputDescription" class="line-clamp-10">
            Description : {{ inputDescription }}
          </div>
          <div v-if="!inputDescription" class="line-clamp-10">
            <div v-if="oeuvre.description === 'null'">
              Description :
            </div>
            <div v-if="oeuvre.description !== 'null'">
              Description : {{ oeuvre.description }}
            </div>
          </div>
          <div v-if="oeuvre.auteur" class="truncate">
            Auteur :
            {{
              inputAuteur?.name
                ? inputAuteur?.name
                : inputAuteur
                  ? inputAuteur
                  : oeuvre.auteur.name
            }}
          </div>
          <div v-if="oeuvre.type" class="truncate">
            Catégorie :
            {{
              inputType?.name
                ? inputType?.name
                : inputType
                  ? inputType
                  : oeuvre.type.name
            }}
          </div>
          <div v-if="oeuvre.support" class="truncate">
            Support :
            {{
              inputSupport?.name
                ? inputSupport?.name
                : inputSupport
                  ? inputSupport
                  : oeuvre.support.name
            }}
          </div>
          <div v-if="oeuvre.editeur" class="truncate">
            Editeur :
            {{
              inputEditeur?.name
                ? inputEditeur?.name
                : inputEditeur
                  ? inputEditeur
                  : oeuvre.editeur.name
            }}
          </div>
          <div v-if="oeuvre.genre" class="truncate">
            Genre :
            {{
              inputGenre?.name
                ? inputGenre?.name
                : inputGenre
                  ? inputGenre
                  : oeuvre.genre.name
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center bg-white rounded-lg mt-6 p-4">
      <div class="flex-auto">
        Un label (Auteur, Studio...) est incorrect ?
      </div>
      <div
        class="w-40 text-center text-white bg-gray-700 cursor-pointer hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2"
        @click="
          $router.push({
            path: '/edit/label'
          })
        "
      >
        Modifiez-le !
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
      inputTitre: '',
      inputSousTitre: '',
      inputDescription: '',
      inputImage: '',
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
      dialog: false,
      imageLoaded: false
    };
  },
  async fetch () {
    await this.$axios
      .$get('https://emporiumback.fly.dev/oeuvres/' + this.$route.query.q)
      .then(reponse => (this.oeuvre = reponse));
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
      this.imageLoaded = true;
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
          this.inputTitre === '' ? this.oeuvre.titre : this.inputTitre
        );
        editedOeuvre.append(
          'sousTitre',
          this.inputSousTitre === ''
            ? this.oeuvre.sousTitre
            : this.inputSousTitre
        );
        editedOeuvre.append(
          'description',
          this.inputDescription === ''
            ? this.oeuvre.description
            : this.inputDescription
        );
        editedOeuvre.append(
          'type',
          this.inputType?.name
            ? this.inputType?.name
            : this.inputType
            ? this.inputType
            : this.oeuvre.type.name
        );
        editedOeuvre.append(
          'auteur',
          this.inputAuteur?.name
            ? this.inputAuteur?.name
            : this.inputAuteur
            ? this.inputAuteur
            : this.oeuvre.auteur.name
        );
        editedOeuvre.append(
          'editeur',
          this.inputEditeur?.name
            ? this.inputEditeur?.name
            : this.inputEditeur
            ? this.inputEditeur
            : this.oeuvre.editeur.name
        );
        editedOeuvre.append(
          'support',
          this.inputSupport?.name
            ? this.inputSupport?.name
            : this.inputSupport
            ? this.inputSupport
            : this.oeuvre.support.name
        );
        editedOeuvre.append(
          'genre',
          this.inputGenre?.name
            ? this.inputGenre?.name
            : this.inputGenre
            ? this.inputGenre
            : this.oeuvre.genre.name
        );
        console.log(editedOeuvre)
        this.$axios
          .$put('https://emporiumback.fly.dev/oeuvres', editedOeuvre)
          .then(() => {
            this.fillFullFormError = 'hidden';
            this.success = '';
            this.imagePreview = this.oeuvre.imagePath;
            setTimeout(() => {
              this.$router.push({
                path: '/oeuvre',
                query: { q: this.oeuvre.idOeuvre }
              });
            }, 1500);
          });
      }
    },
    deleteOeuvre () {
      this.$axios
        .$delete(
          'https://emporiumback.fly.dev/oeuvres/delete/' + this.oeuvre.idOeuvre
        )
        .then(() => {
          this.deleteSuccess = '';
          setTimeout(this.$router.push({ path: '/oeuvres' }), 1000);
        });
    }
  }
};
</script>
