<template>
  <div>
    <div class="grid">
      <div class="grid grid-cols-3 bg-gray-100 shadow-inner rounded-lg h-fit">
        <div class="grid bg-white p-4 rounded-l-lg h-full">
          <span
            class="material-symbols-outlined cursor-pointer hover:bg-red-400 h-fit w-fit rounded-full p-1"
            @click="deleteUser()"
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
            class="max-w-full max-h-52 place-self-center shadow-md shadow-black"
            :src="user.profilPicturePath"
          >
          <ImagePlaceholder
            v-if="!user.profilPicturePath"
            class="place-self-center"
          />
          <div v-if="user.pseudo" class="place-self-center truncate">
            Pseudo : {{ user.pseudo }}
          </div>
          <div v-if="user.description" class="place-self-center line-clamp-10">
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
              <textarea
                v-model="inputDescription"
                placeholder="Description"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                cols="40"
                rows="5"
                maxlength="500"
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
              <div v-if="imagePreview">
                Image chargée avec succés
              </div>
            </div>
            <div class="grid grid-rows-2 text-center">
              <div
                class="flex-auto text-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
                @click="submitEditedUser()"
              >
                Envoyer
              </div>
              <a :class="errorPseudo">
                Le pseudo ne peut pas être vide !
              </a>
              <a :class="success"> Le profil a bien été modifié. </a>
            </div>
          </form>
        </div>
        <div class="grid p-4 h-full place-items-center">
          <div v-if="user" class="">
            Visualisation des changements
          </div>
          <img
            v-if="imagePreview"
            class="max-w-full max-h-52 shadow-md shadow-black"
            :src="imagePreview"
          >
          <ImagePlaceholder v-if="!imagePreview" />
          <div class="truncate">
            Pseudo :
            {{ inputPseudo === undefined ? user.pseudo : inputPseudo }}
          </div>
          <div class="line-clamp-10">
            Description :
            {{ inputDescription === '' ? user.description : inputDescription }}
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
      inputPseudo: undefined,
      inputDescription: '',
      deleteSuccess: 'hidden',
      imageUpload: undefined,
      imagePreview: undefined,
      dialog: false,
      errorPseudo: 'hidden'
    };
  },
  async fetch () {
    await this.$axios
      .$get(
        'https://emporiumback.fly.dev/utilisateur/identification/' +
          this.$route.query.q
      )
      .then(reponse => (this.user = reponse))
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
        editedUser.append('authId', this.$auth.user.sub);
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
        if (editedUser.get('pseudo') !== '') {
            this.$axios
          .$put('https://emporiumback.fly.dev/utilisateur/', editedUser)
          .then(() => {
            this.success = '';
            setTimeout(() => {
                this.$router.push({
                path: '/user',
                query: { q: this.user.uwuid }
              })
            }, 3000)
          });
        } else {
            this.errorPseudo = ''
        }
      }
    },
    deleteUser () {
        this.$axios
          .$delete('https://emporiumback.fly.dev/utilisateur/delete/' + this.$auth.user.sub)
          .then(() => {
            setTimeout(() => { this.$auth.logout() }, 1500);
          })
    }
  }
};
</script>
