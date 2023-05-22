<template>
  <div class="grid grid-cols-[1fr_auto_1fr]">
    <div />
    <div class="grid-rows-2 m-10">
      <ul
        class="flex flex-wrap text-center text-white bg-gray-500 rounded-t-lg"
      >
        <li class="">
          <a :class="tab1Title" @click="selectedTab(1)">Basique</a>
        </li>
        <li class="">
          <a :class="tab2Title" @click="selectedTab(2)">CD</a>
        </li>
        <li class="">
          <a :class="tab3Title" @click="selectedTab(3)">Jeux vidéo</a>
        </li>
        <li class="">
          <a :class="tab4Title" @click="selectedTab(4)">Cosmétique</a>
        </li>
        <li class="">
          <a :class="tab5Title" @click="selectedTab(5)">Figurine</a>
        </li>
      </ul>
      <div :class="tab1Text">
        <form class="bg-white rounded-b-lg px-8 pt-6 pb-8 mb-4">
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
            <a class="block text-gray-700 text-sm font-bold mb-2"> Type </a>
            <input
              v-model="inputType"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Type"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2"> Auteur </a>
            <input
              v-model="inputAuteur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2"> Editeur </a>
            <input
              v-model="inputEditeur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Editeur"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2"> Support </a>
            <input
              v-model="inputSupport"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Support"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2"> Genre </a>
            <input
              v-model="inputGenre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Genre"
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
              @click="submitOeuvre()"
            >
              Envoyer
            </button>
            <a :class="fillFullFormError">
              Veuillez remplir tous les champs obligatoires.
            </a>
          </div>
        </form>
      </div>
      <div :class="tab2Text">
        <form class="bg-white shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Titre (Album, EP, Single...)
            </a>
            <input
              v-model="inputTitre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-gray-900"
              type="text"
              placeholder="Titre"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Sous titre *
            </a>
            <input
              v-model="inputSousTitre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Sous titre"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Description *
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
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Auteur (Groupe, Chanteur...)</a>
            <div class="grid grid-cols-[auto_auto]">
              <input
                v-model="inputAuteur"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Auteur"
              >

              <NuxtLink
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 h-full rounded text-center"
                to="/new/label"
              >
                +
              </NuxtLink>
            </div>
            <a class="block text-gray-700 text-sm font-bold mb-2"> Label </a>
            <input
              v-model="inputEditeur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Label"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Support (CD, Vinyl...)
            </a>
            <input
              v-model="inputSupport"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Support"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Genre (POP, Rap, Metal...)
            </a>
            <input
              v-model="inputGenre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Genre"
            >
          </div>
          * Champs faculatifs
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
              @click="submitOeuvre()"
            >
              Envoyer
            </button>
            <a :class="fillFullFormError">
              Veuillez remplir tous les champs obligatoires.
            </a>
            <a :class="success"> L'oeuvre a bien été ajoutée. </a>
          </div>
        </form>
      </div>
      <div :class="tab3Text">
        <form class="bg-white shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4">
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
            <a class="block text-gray-700 text-sm font-bold mb-2"> Type </a>
            <input
              v-model="inputType"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Type"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2"> Auteur </a>
            <input
              v-model="inputAuteur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2"> Editeur </a>
            <input
              v-model="inputEditeur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Editeur"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2"> Support </a>
            <input
              v-model="inputSupport"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Support"
            >
            <a class="block text-gray-700 text-sm font-bold mb-2"> Genre </a>
            <input
              v-model="inputGenre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Genre"
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
              @click="submitOeuvre()"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
      <div :class="tab4Text">
        <form class="bg-white shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              id="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
      <div :class="tab5Text">
        <form class="bg-white shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              id="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="bg-gray-300" />
  </div>
</template>

<script>
export default {
  name: 'NewOeuvrePage',
  data () {
    return {
      oeuvre: [],
      tab1Title:
        'inline-block p-4 rounded-t-lg text-gray-600 bg-white active cursor-pointer',
      tab1Text: '',
      tab2Title:
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer',
      tab2Text: 'hidden',
      tab3Title:
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer',
      tab3Text: 'hidden',
      tab4Title:
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer',
      tab4Text: 'hidden',
      tab5Title:
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer',
      tab5Text: 'hidden',
      inputTitre: undefined,
      inputSousTitre: undefined,
      inputDescription: undefined,
      inputImage: undefined,
      inputType: undefined,
      inputAuteur: undefined,
      inputEditeur: undefined,
      inputSupport: undefined,
      inputGenre: undefined,
      fillFullFormError: 'hidden',
      success: 'hidden'
    };
  },
  async fetch () {
    const response = await this.$axios.$get(
      'https://emporiumback.fly.dev/type'
    );
    this.listType = response;
  },
  methods: {
    selectedTab: function (tabNumber) {
      const styleSelected =
        'inline-block p-4 rounded-t-lg bg-white text-gray-600 active cursor-pointer';
      const textToShow = '';
      switch (tabNumber) {
        case 1:
          this.resetTab();
          this.tab1Title = styleSelected;
          this.tab1Text = textToShow;
          break;
        case 2:
          this.resetTab();
          this.tab2Title = styleSelected;
          this.tab2Text = textToShow;
          this.inputType = 1;
          break;
        case 3:
          this.resetTab();
          this.tab3Title = styleSelected;
          this.tab3Text = textToShow;
          break;
        case 4:
          this.resetTab();
          this.tab4Title = styleSelected;
          this.tab4Text = textToShow;
          break;
        case 5:
          this.resetTab();
          this.tab5Title = styleSelected;
          this.tab5Text = textToShow;
          break;
        default:
          this.resetTab();
      }
    },
    resetTab: function () {
      this.tab1Title =
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer';
      this.tab1Text = 'hidden';
      this.tab2Title =
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer';
      this.tab2Text = 'hidden';
      this.tab3Title =
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer';
      this.tab3Text = 'hidden';
      this.tab4Title =
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer';
      this.tab4Text = 'hidden';
      this.tab5Title =
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer';
      this.tab5Text = 'hidden';
      this.inputType = undefined;
      this.success = 'hidden';
    },
    submitOeuvre: function () {
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
          image: this.inputImage,
          idType: this.inputType,
          idAuteur: this.inputAuteur,
          idEditeur: this.inputEditeur,
          idSupport: this.inputSupport,
          idGenre: this.inputGenre
        };

        this.$axios.$post('https://emporiumback.fly.dev/oeuvres', oeuvre);
        this.fillFullFormError = 'hidden';
        this.success = '';
      } else {
        this.fillFullFormError = '';
      }
    }
  }
};
</script>
