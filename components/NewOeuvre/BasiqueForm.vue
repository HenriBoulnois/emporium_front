<template>
  <form class="bg-white rounded-b-lg px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <a class="block text-gray-700 text-sm font-bold mb-2"> Titre </a>
      <input
        v-model="inputTitre"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Titre"
      >
      <a class="block text-gray-700 text-sm font-bold mb-2"> Sous titre </a>
      <input
        v-model="inputSousTitre"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Sous titre"
      >
      <a class="block text-gray-700 text-sm font-bold mb-2"> Description </a>
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
        success: 'hidden'
    }
  },
  methods: {
    submitBasique: function () {
      if (
        this.inputTitre !== undefined &&
        this.inputImage !== undefined &&
        this.inputType !== undefined &&
        this.inputAuteur !== undefined &&
        this.inputEditeur !== undefined &&
        this.inputSupport !== undefined &&
        this.inputGenre !== undefined
      ) {
        const oeuvre = {
          titre: this.inputTitre,
          sousTitre: this.inputSousTitre,
          description: this.inputDescription,
          image: { image: '', imageName: 'image' + this.inputTitre, imageExtension: 'jpg' },
          idType: this.inputType,
          idAuteur: this.inputAuteur,
          idEditeur: this.inputEditeur,
          idSupport: this.inputSupport,
          idGenre: this.inputGenre
        };
        console.log(oeuvre);
        this.$axios.$post('https://emporiumback.fly.dev/oeuvres', oeuvre).then(() => {
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
