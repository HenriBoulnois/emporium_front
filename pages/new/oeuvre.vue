<template>
  <div class="grid grid-cols-[auto_1fr]">
    <div class="m-10">
      <div
        class="flex flex-wrap text-center text-white bg-gray-500 rounded-t-lg"
      >
        <div class="">
          <a :class="tab1Title" @click="selectedTab(1)">Basique</a>
        </div>
        <div class="">
          <a :class="tab2Title" @click="selectedTab(2)">Musique</a>
        </div>
        <div class="">
          <a :class="tab3Title" @click="selectedTab(3)">Jeux vidéo</a>
        </div>
        <div class="">
          <a :class="tab4Title">Cosmétique</a>
        </div>
        <div class="">
          <a :class="tab5Title">Figurine</a>
        </div>
      </div>
      <div :class="tab1Text">
        <BasiqueForm
          :list-auteur="listAuteur"
          :list-type="listType"
          :list-editeur="listEditeur"
          :list-support="listSupport"
          :list-genre="listGenre"
        />
      </div>
      <div :class="tab2Text">
        <MusiqueForm
          :list-auteur="listAuteur"
          :list-editeur="listEditeur"
          :list-support="listSupport"
          :list-genre="listGenre"
        />
      </div>
      <div :class="tab3Text">
        <JVForm
          :list-auteur="listAuteur"
          :list-editeur="listEditeur"
          :list-support="listSupport"
          :list-genre="listGenre"
        />
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
    <div class="grid grid-rows-[auto_1fr]">
      <div class="flex items-center bg-white rounded-lg m-10 p-4">
        <div class="flex-auto">
          Un label (Auteur, Studio...) n'est pas présent ?
        </div>
        <div
          class="flex-auto text-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
          @click="
            $router.push({
              path: '/new/label'
            })
          "
        >
          Ajoutez le !
        </div>
      </div>
      <div class="bg-gray-700 rounded-lg m-10">
        Preview Image
      </div>
    </div>
  </div>
</template>

<script>
import BasiqueForm from '~/components/NewOeuvre/BasiqueForm.vue';
import MusiqueForm from '~/components/NewOeuvre/MusiqueForm.vue';
import JVForm from '~/components/NewOeuvre/JVForm.vue';

export default {
  name: 'NewOeuvrePage',
  components: {
    BasiqueForm,
    MusiqueForm,
    JVForm
  },
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
      /* inputTitre: undefined,
      inputSousTitre: undefined,
      inputDescription: undefined,
      inputImage: undefined,
      inputType: undefined,
      inputAuteur: undefined,
      inputEditeur: undefined,
      inputSupport: undefined,
      inputGenre: undefined, */
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
          this.inputType = 'Musique';
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
          type: this.inputType,
          auteur: this.inputAuteur,
          editeur: this.inputEditeur,
          support: this.inputSupport,
          genre: this.inputGenre
        };
        // check if auteur already exist, if not create it
        /* this.$axios
          .$get(
            'https://emporiumback.fly.dev/auteur/search/' + this.inputAuteur
          )
          .then((response) => {
            this.auteur = response;
            console.log(this.auteur[0]);
            if (this.auteur[0] === undefined) {
              this.$axios
                .$post('https://emporiumback.fly.dev/auteur', {
                  name: this.inputAuteur
                })
                .then((responsePost) => { oeuvre.idAuteur = responsePost.idAuteur });
            } else {
              oeuvre.idAuteur = response.idAuteur;
            }
          }); */
        console.log(oeuvre);
        // this.$axios.$post('https://emporiumback.fly.dev/oeuvres', oeuvre);
        this.fillFullFormError = 'hidden';
        this.success = '';
      } else {
        this.fillFullFormError = '';
      }
    }
  }
};
</script>
