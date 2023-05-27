<template>
  <div>
    <div class="grid">
      <div class="grid grid-cols-3 bg-gray-700 shadow-inner rounded-lg h-fit">
        <div class="grid bg-white p-4 rounded-l-lg h-full">
          <span
            class="material-symbols-outlined cursor-pointer hover:bg-red-400 h-fit w-fit rounded-full p-1"
            @click="deleteAccount()"
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
            v-if="user.profilPicturePath"
            class="max-w-full max-h-52 place-self-center"
            :src="user.profilPicturePath"
          >
          <ImagePlaceholder
            v-if="!user.profilPicturePath"
            class="place-self-center"
          />
          <div v-if="user.pseudo" class="place-self-center">
            Pseudo : {{ user.pseudo }}
          </div>
          <div v-if="user.description" class="place-self-center">
            Description : {{ user.description }}
          </div>
        </div>
        <div class="grid bg-white p-4 h-full rounded-r-lg drop-shadow-xl">
          <div class="place-self-center">
            Formulaire de modification
          </div>
          <form class="p-4">
            <div class="mb-4">
              <a class="block text-gray-700 text-sm font-bold mb-2"> Pseudo </a>
              <input
                v-model="inputPseudo"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Pseudo"
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
            </div>
            <div class="grid grid-rows-2 text-center">
              <div
                class="flex-auto text-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
                @click="submitEditedUser()"
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
          <div v-if="user" class="">
            Visualisation des changements
          </div>
          <img
            v-if="imagePreview"
            class="max-w-full max-h-52"
            :src="imagePreview"
          >
          <ImagePlaceholder v-if="!imagePreview" />
          <div v-if="inputPseudo">
            Pseudo : {{ inputPseudo }}
          </div>
          <div v-if="!inputDescription">
            Titre : {{ inputDescription }}
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
  name: 'EditUser',
  components: {
    CompleteAccountDialog
  },
  data () {
    return {
      user: [],
      success: 'hidden',
      fillFullFormError: 'hidden',
      inputPseudo: undefined,
      inputDescription: undefined,
      deleteSuccess: 'hidden',
      imageUpload: undefined,
      imagePreview: undefined,
      dialog: false
    };
  },
  async fetch () {
    await this.$axios
      .$get(
        'https://emporiumback.fly.dev/utilisateur/identification/' +
          this.$route.query.q
      )
      .then(reponse => (this.user = reponse))
      .catch(error => console.log(error));
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
    submitEditedUser () {
      if (this.user.pseudo !== undefined) {
        const editedUser = new FormData();
        editedUser.append('UWUid', this.user.uwuid);
        editedUser.append('email', this.user.email);
        if (this.imageUpload !== undefined) {
          editedUser.append('profilPicture', this.imageUpload);
          editedUser.append('imageName', this.imageUpload.name);
        }
        editedUser.append(
          'pseudo',
          this.inputPseudo === undefined ? this.user.pseudo : this.inputPseudo
        );
        editedUser.append(
          'description',
          this.inputDescription === undefined
            ? this.user.description
            : this.inputDescription
        );
        this.$axios
          .$put('https://emporiumback.fly.dev/utilisateur/', editedUser)
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
    deleteUser () {
      //
    }
  }
};
</script>
