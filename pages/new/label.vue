<template>
  <div class="grid grid-cols-[1fr_auto_1fr]">
    <div />
    <div class="grid-rows-2 m-10">
      <ul
        class="flex flex-wrap text-center text-white bg-gray-500 rounded-t-lg"
      >
        <li class="">
          <a :class="tab1Title" @click="selectedTab(1)">Type</a>
        </li>
        <li class="">
          <a :class="tab2Title" @click="selectedTab(2)">Auteur</a>
        </li>
        <li class="">
          <a :class="tab3Title" @click="selectedTab(3)">Editeur</a>
        </li>
        <li class="">
          <a :class="tab4Title" @click="selectedTab(4)">Support</a>
        </li>
        <li class="">
          <a :class="tab5Title" @click="selectedTab(5)">Genre</a>
        </li>
      </ul>
      <div :class="tab1Text">
        <form class="bg-white rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Nouveau type (Musique, Jeux-vidéo...)
            </a>
            <input
              v-model="inputType"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Nouveau type"
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="submitType()"
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
      <div :class="tab2Text">
        <form class="bg-white rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Auteur (Groupe, Créateur...)
            </a>
            <input
              v-model="inputAuteur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Auteur"
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="submitAuteur()"
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
        <form class="bg-white rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Editeur (Label, Studio...)
            </a>
            <input
              v-model="inputEditeur"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Editeur"
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="submitEditeur()"
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
      <div :class="tab4Text">
        <form class="bg-white rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Support (Dématerialisé, CD...)</a>
            <input
              v-model="inputSupport"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Support"
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="submitSupport()"
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
      <div :class="tab5Text">
        <form class="bg-white rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <a class="block text-gray-700 text-sm font-bold mb-2">
              Genre (Metal, MMORPG...)
            </a>
            <input
              v-model="inputGenre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Genre"
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="submitGenre()"
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
    </div>
    <div />
  </div>
</template>

<script>
export default {
  name: 'NewLabelPage',
  data () {
    return {
      oeuvre: [],
      tab1Title:
        'inline-block p-4 rounded-t-lg text-gray-600 bg-white active cursor-pointer',
      tab1Text: '',
      tab2Title:
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-white cursor-pointer',
      tab2Text: 'hidden',
      tab3Title:
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-white cursor-pointer',
      tab3Text: 'hidden',
      tab4Title:
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-white cursor-pointer',
      tab4Text: 'hidden',
      tab5Title:
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-white cursor-pointer',
      tab5Text: 'hidden',
      inputType: undefined,
      inputAuteur: undefined,
      inputEditeur: undefined,
      inputSupport: undefined,
      inputGenre: undefined,
      fillFullFormError: 'hidden',
      success: 'hidden'
    };
  },
  methods: {
    selectedTab: function (tabNumber) {
      const styleSelected =
        'inline-block p-4 rounded-t-lg text-gray-600 bg-white active cursor-pointer';
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
      this.success = 'hidden';
    },
    submitType: function () {
      if (this.inputType !== undefined) {
        const type = {
          name: this.inputType
        };
        this.$axios.$post('https://emporiumback.fly.dev/type', type);
        this.fillFullFormError = 'hidden';
        this.success = '';
      } else {
        this.fillFullFormError = '';
      }
    },
    submitAuteur: function () {
      if (this.inputAuteur !== undefined) {
        const auteur = {
          name: this.inputAuteur
        };
        this.$axios.$post('https://emporiumback.fly.dev/auteur', auteur);
        this.fillFullFormError = 'hidden';
        this.success = '';
      } else {
        this.fillFullFormError = '';
      }
    },
    submitEditeur: function () {
      if (this.inputEditeur !== undefined) {
        const editeur = {
          name: this.inputEditeur
        };
        this.$axios.$post('https://emporiumback.fly.dev/editeur', editeur);
        this.fillFullFormError = 'hidden';
        this.success = '';
      } else {
        this.fillFullFormError = '';
      }
    },
    submitSupport: function () {
      if (this.inputSupport !== undefined) {
        const support = {
          name: this.inputSupport
        };
        this.$axios.$post('https://emporiumback.fly.dev/support', support);
        this.fillFullFormError = 'hidden';
        this.success = '';
      } else {
        this.fillFullFormError = '';
      }
    },
    submitGenre: function () {
      if (this.inputGenre !== undefined) {
        const genre = {
          name: this.inputGenre
        };
        this.$axios.$post('https://emporiumback.fly.dev/genre', genre);
        this.fillFullFormError = 'hidden';
        this.success = '';
      } else {
        this.fillFullFormError = '';
      }
    }
  }
};
</script>
