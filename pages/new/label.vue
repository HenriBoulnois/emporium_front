<template>
  <div class="grid grid-cols-[auto_1fr]">
    <div class="grid-rows-2 m-10">
      <div
        class="flex flex-wrap text-center text-white bg-gray-500 rounded-t-lg"
      >
        <a :class="tab1Title" @click="selectedTab(1)">Type</a>
        <a :class="tab2Title" @click="selectedTab(2)">Auteur</a>
        <a :class="tab3Title" @click="selectedTab(3)">Editeur</a>
        <a :class="tab4Title" @click="selectedTab(4)">Support</a>
        <a :class="tab5Title" @click="selectedTab(5)">Genre</a>
      </div>
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
          <div class="grid grid-rows-2 text-center">
            <div
              class="flex-auto text-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
              @click="submitType()"
            >
              Envoyer
            </div>
            <a :class="fillFullFormError">
              Un rongeur semble avoir grignotté le câble
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
          <div class="grid grid-rows-2 text-center">
            <div
              class="flex-auto text-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
              @click="submitAuteur()"
            >
              Envoyer
            </div>
            <a :class="fillFullFormError">
              Un rongeur semble avoir grignotté le câble
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
          <div class="grid grid-rows-2 text-center">
            <div
              class="flex-auto text-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
              @click="submitEditeur()"
            >
              Envoyer
            </div>
            <a :class="fillFullFormError">
              Un rongeur semble avoir grignotté le câble
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
          <div class="grid grid-rows-2 text-center">
            <div
              class="flex-auto text-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
              @click="submitSupport()"
            >
              Envoyer
            </div>
            <a :class="fillFullFormError">
              Un rongeur semble avoir grignotté le câble
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
          <div class="grid grid-rows-2 text-center">
            <div
              class="flex-auto text-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
              @click="submitGenre()"
            >
              Envoyer
            </div>
            <a :class="fillFullFormError">
              Un rongeur semble avoir grignotté le câble
            </a>
            <a :class="success"> L'oeuvre a bien été ajoutée. </a>
          </div>
        </form>
      </div>
    </div>
    <div class="m-10 bg-white rounded-lg">
      <div :class="tab1Text">
        <GenericPreview :list="listType" label-type="Type" />
      </div>
      <div :class="tab2Text">
        <GenericPreview :list="listAuteur" label-type="Auteur" />
      </div>
      <div :class="tab3Text">
        <GenericPreview :list="listEditeur" label-type="Editeur" />
      </div>
      <div :class="tab4Text">
        <GenericPreview :list="listSupport" label-type="Support" />
      </div>
      <div :class="tab5Text">
        <GenericPreview :list="listGenre" label-type="Genre" />
      </div>
    </div>
  </div>
</template>

<script>
import GenericPreview from '~/components/NewLabel/GenericPreview.vue';

export default {
  name: 'NewLabelPage',
  components: { GenericPreview },
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
      success: 'hidden',
      listType: '',
      listAuteur: '',
      listEditeur: '',
      listSupport: '',
      listGenre: ''
    };
  },
  async fetch () {
    await this.fetchType();
    await this.fetchAuteur();
    await this.fetchEditeur();
    await this.fetchSupport();
    await this.fetchGenre();
  },
  methods: {
    async fetchType () {
      await this.$axios
        .$get('https://emporiumback.fly.dev/type')
        .then((response) => {
          this.listType = response;
        });
    },
    async fetchAuteur () {
      await this.$axios
        .$get('https://emporiumback.fly.dev/auteur')
        .then((response) => {
          this.listAuteur = response;
        });
    },
    async fetchEditeur () {
      await this.$axios
        .$get('https://emporiumback.fly.dev/editeur')
        .then((response) => {
          this.listEditeur = response;
        });
    },
    async fetchSupport () {
      await this.$axios
        .$get('https://emporiumback.fly.dev/support')
        .then((response) => {
          this.listSupport = response;
        });
    },
    async fetchGenre () {
      await this.$axios
        .$get('https://emporiumback.fly.dev/genre')
        .then((response) => {
          this.listGenre = response;
        });
    },
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
        this.$axios
          .$post('https://emporiumback.fly.dev/type', type)
          .then(() => {
            this.fillFullFormError = 'hidden';
            this.success = '';
            this.fetchType();
            this.inputType = undefined;
          });
      } else {
        this.fillFullFormError = '';
      }
    },
    submitAuteur: function () {
      if (this.inputAuteur !== undefined) {
        const auteur = {
          name: this.inputAuteur
        };
        this.$axios.$post('https://emporiumback.fly.dev/auteur', auteur)
        .then(() => {
            this.fillFullFormError = 'hidden';
            this.success = '';
            this.fetchAuteur();
            this.inputAuteur = undefined;
          });
      } else {
        this.fillFullFormError = '';
      }
    },
    submitEditeur: function () {
      if (this.inputEditeur !== undefined) {
        const editeur = {
          name: this.inputEditeur
        };
        this.$axios.$post('https://emporiumback.fly.dev/editeur', editeur)
        .then(() => {
            this.fillFullFormError = 'hidden';
            this.success = '';
            this.fetchEditeur();
            this.inputEditeur = undefined;
          });
      } else {
        this.fillFullFormError = '';
      }
    },
    submitSupport: function () {
      if (this.inputSupport !== undefined) {
        const support = {
          name: this.inputSupport
        };
        this.$axios.$post('https://emporiumback.fly.dev/support', support)
        .then(() => {
            this.fillFullFormError = 'hidden';
            this.success = '';
            this.fetchSupport();
            this.inputSupport = undefined;
          });
      } else {
        this.fillFullFormError = '';
      }
    },
    submitGenre: function () {
      if (this.inputGenre !== undefined) {
        const genre = {
          name: this.inputGenre
        };
        this.$axios.$post('https://emporiumback.fly.dev/genre', genre)
        .then(() => {
            this.fillFullFormError = 'hidden';
            this.success = '';
            this.fetchGenre();
            this.inputGenre = undefined;
          });
      } else {
        this.fillFullFormError = '';
      }
    }
  }
};
</script>
