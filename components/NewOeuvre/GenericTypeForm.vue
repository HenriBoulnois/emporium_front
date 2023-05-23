<template>
  <form class="bg-white shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <a class="block text-gray-700 text-sm font-bold mb-2"> Titre * </a>
      <input
        v-model="inputTitre"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-gray-900"
        type="text"
        placeholder="Titre"
      >
      <a class="block text-gray-700 text-sm font-bold mb-2"> Sous titre * </a>
      <input
        v-model="inputSousTitre"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Sous titre"
      >
      <a class="block text-gray-700 text-sm font-bold mb-2"> Description * </a>
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
        v-model="inputAuteur"
        :items="listAuteur"
        item-text="name"
        item-value="idAuteur"
        :label="labelAuteur"
      />
      <v-autocomplete
        v-model="inputEditeur"
        :items="listEditeur"
        item-text="name"
        item-value="idEditeur"
        :label="labelEditeur"
      />
      <v-autocomplete
        v-model="inputSupport"
        :items="listSupport"
        item-text="name"
        item-value="idSupport"
        :label="labelSupport"
      />
      <v-autocomplete
        v-model="inputGenre"
        :items="listGenre"
        item-text="name"
        item-value="idGenre"
        :label="labelGenre"
      />
    </div>
    * Champs faculatifs
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
</template>

<script>
export default {
  name: 'GenericTypeForm',
  props: {
    typeId: undefined,
    listAuteur: undefined,
    listEditeur: undefined,
    listSupport: undefined,
    listGenre: undefined,
    labelAuteur: undefined,
    labelEditeur: undefined,
    labelSupport: undefined,
    labelGenre: undefined
  },
  data () {
    return {
      fillFullFormError: 'hidden',
      success: 'hidden'
    };
  },
  methods: {
    submitOeuvre: function () {
      if (
        this.inputTitre !== undefined &&
        this.inputSousTitre !== undefined &&
        this.inputDescription !== undefined &&
        this.inputImage !== undefined &&
        this.inputAuteur !== undefined &&
        this.inputEditeur !== undefined &&
        this.inputSupport !== undefined &&
        this.inputGenre !== undefined
      ) {
        const oeuvre = {
          titre: this.inputTitre,
          sousTitre: this.inputSousTitre,
          description: this.inputDescription,
          image: {
            image: '',
            imageName: 'image' + this.inputTitre,
            imageExtension: 'jpg'
          },
          idType: this.typeId,
          idAuteur: this.inputAuteur,
          idEditeur: this.inputEditeur,
          idSupport: this.inputSupport,
          idGenre: this.inputGenre
        };
        console.log(oeuvre);
        this.$axios
          .$post('https://emporiumback.fly.dev/oeuvres', oeuvre)
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
