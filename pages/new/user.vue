<template>
  <div>
    <div class="grid place-items-center relative">
      <form class="bg-white rounded-lg px-8 pt-6 pb-8 w-fit absolute top-10">
        <div class="mb-4">
          <a class="block text-gray-700 text-sm font-bold mb-2"> Pseudo </a>
          <input
            v-model="inputPseudo"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="pseudo"
          >
          <a class="block text-gray-700 text-sm font-bold mb-2"> Email </a>
          <input
            v-model="inputEmail"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Email"
            :readonly="true"
          >
          <a class="block text-gray-700 text-sm font-bold mb-2">
            Profil picture
          </a>
          <label class="btn btn-default">
            <input
              id="file"
              ref="file"
              type="file"
              accept="image/jpeg, image/png"
              @change="fileUpload()"
            >
          </label>
          <img
            v-if="imagePreview"
            class="max-w-full max-h-52"
            :src="imagePreview"
          >
        </div>
        <div class="grid grid-rows-2 text-center">
          <div
            class="flex-auto text-center text-white bg-gray-700 cursor-pointer hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2"
            @click="submitNewUser()"
          >
            Envoyer
          </div>
          <a :class="fillFullFormError"> Veuillez remplir tous les champs. </a>
          <a :class="success"> Votre compte est complété. </a>
        </div>
      </form>
    </div>
    <CompleteAccountDialog v-if="dialog" :can-disable="false" />
  </div>
</template>

<script>
import CompleteAccountDialog from '~/components/User/CompleteAccountDialog.vue';

export default {
  name: 'NewUser',
  components: {
    CompleteAccountDialog
  },
  data () {
    return {
      inputPseudo: undefined,
      inputEmail: undefined,
      profilPicture: undefined,
      imagePreview: undefined,
      fillFullFormError: 'hidden',
      success: 'hidden',
      dialog: false
    };
  },
  fetch () {
    if (this.$auth.loggedIn === true) {
      this.inputEmail = this.$auth.user.email;
      this.$axios
        .$get(
          'https://emporiumback.fly.dev/utilisateur/' + this.$auth.user.email
        )
        .then((response) => {
          this.$router.push({
            path: '/user',
            query: { q: response.uwuid }
          });
        });
      this.dialog = false;
    } else {
      this.dialog = true;
    }
  },
  methods: {
    fileUpload () {
      this.profilPicture = this.$refs.file.files[0];
      this.imagePreview = URL.createObjectURL(this.profilPicture);
    },
    submitNewUser () {
      if (
        this.inputPseudo !== undefined &&
        this.profilPicture !== undefined &&
        this.inputEmail !== undefined
      ) {
        const newUser = new FormData();
        newUser.append('pseudo', this.inputPseudo);
        newUser.append('imageName', this.profilPicture.name);
        newUser.append('profilPicture', this.profilPicture);
        newUser.append('email', this.inputEmail);
        this.$axios
          .$post('https://emporiumback.fly.dev/utilisateur', newUser)
          .then(() => {
            this.fillFullFormError = 'hidden';
            this.success = '';
            setTimeout(this.$nuxt.refresh(), 1000);
          });
      } else {
        this.fillFullFormError = '';
      }
    }
  }
};
</script>
