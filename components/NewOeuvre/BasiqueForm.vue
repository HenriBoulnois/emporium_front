<template>
  <form class="bg-white rounded-b-lg px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <a class="block text-gray-700 text-sm font-bold mb-2"> Titre *</a>
      <input
        v-model="inputTitre"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Titre"
      >
      <a class="block text-gray-700 text-sm font-bold mb-2"> Sous titre *</a>
      <input
        v-model="inputSousTitre"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Sous titre"
      >
      <a class="block text-gray-700 text-sm font-bold mb-2"> Description *</a>
      <textarea
        v-model="inputDescription"
        placeholder="Description"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        cols="40"
        rows="5"
        maxlength="300"
      />
      <a class="block text-gray-700 text-sm font-bold mb-2"> Image *</a>
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
        item-value="idType"
        label="Catégorie *"
      />
      <v-autocomplete
        v-model="inputAuteur"
        :items="listAuteur"
        item-text="name"
        item-value="idAuteur"
        label="Auteur *"
      />
      <v-autocomplete
        v-model="inputEditeur"
        :items="listEditeur"
        item-text="name"
        item-value="idEditeur"
        label="Editeur *"
      />
      <v-autocomplete
        v-model="inputSupport"
        :items="listSupport"
        item-text="name"
        item-value="idSupport"
        label="Support *"
      />
      <v-autocomplete
        v-model="inputGenre"
        :items="listGenre"
        item-text="name"
        item-value="idGenre"
        label="Genre *"
      />
    </div>
    * Champs obligatoires
    <div class="grid grid-rows-2 text-center">
      <div
        class="flex-auto text-center text-white bg-gray-800 cursor-pointer hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
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
</template>

<script>
export default {
  name: 'BasiqueForm',
  props: {
    listType: undefined,
    listAuteur: undefined,
    listEditeur: undefined,
    listSupport: undefined,
    listGenre: undefined
  },
  data () {
    return {
      fillFullFormError: 'hidden',
      success: 'hidden',
      imageUpload: undefined,
      imagePreview: undefined,
      inputTitre: '',
      inputSousTitre: '',
      inputDescription: '',
      inputType: '',
      inputAuteur: '',
      inputEditeur: '',
      inputSupport: '',
      inputGenre: ''
    };
  },
  methods: {
    fileUpload () {
      this.imageUpload = this.$refs.file.files[0];
      this.imagePreview = URL.createObjectURL(this.imageUpload);
      this.$emit('display-preview-event', { image: this.imagePreview });
    },
    submitBasique () {
      if (
        this.inputTitre !== '' &&
        this.inputSousTitre !== '' &&
        this.inputDescription !== '' &&
        this.imageUpload !== undefined &&
        this.inputType !== '' &&
        this.inputAuteur !== '' &&
        this.inputEditeur !== '' &&
        this.inputSupport !== '' &&
        this.inputGenre !== ''
      ) {
        const formData = new FormData();
        formData.append('image', this.imageUpload);
        formData.append('imageName', this.imageUpload.name);
        formData.append('titre', this.inputTitre);
        formData.append('sousTitre', this.inputSousTitre);
        formData.append('description', this.inputDescription);
        formData.append('idType', this.inputType);
        formData.append('idAuteur', this.inputAuteur);
        formData.append('idEditeur', this.inputEditeur);
        formData.append('idSupport', this.inputSupport);
        formData.append('idGenre', this.inputGenre);
        this.$axios
          .$post('https://emporiumback.fly.dev/oeuvres', formData)
          .then(() => {
            this.fillFullFormError = 'hidden';
            this.success = '';
          });
      } else {
        this.fillFullFormError = '';
      }
    }
  }
};
</script>
