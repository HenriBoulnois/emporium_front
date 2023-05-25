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
          <a :class="tab4Title" @click="selectedTab(4)">Livre</a>
        </div>
        <div class="">
          <a :class="tab5Title" @click="selectedTab(5)">Goodies</a>
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
        <GenericTypeFormVue
          :list-auteur="listAuteur"
          :list-editeur="listEditeur"
          :list-support="listSupport"
          :list-genre="listGenre"
          type-id="1"
          label-auteur="Auteur (Groupe, Chanteur...) *"
          label-editeur="Label *"
          label-genre="Genre (POP, Rap, Metal...) *"
          label-support="Support (CD, Vinyl...) *"
        />
      </div>
      <div :class="tab3Text">
        <GenericTypeFormVue
          :list-auteur="listAuteur"
          :list-editeur="listEditeur"
          :list-support="listSupport"
          :list-genre="listGenre"
          type-id="2"
          label-auteur="Studio (Riot, Rare...) *"
          label-editeur="Editeur *"
          label-genre="Genre (MMORPG, FPS, Souls-like...) *"
          label-support="Support (Cartouche, Demat...) *"
        />
      </div>
      <div :class="tab4Text">
        <GenericTypeFormVue
          :list-auteur="listAuteur"
          :list-editeur="listEditeur"
          :list-support="listSupport"
          :list-genre="listGenre"
          type-id="d62f53bb-6952-4ce3-84c2-b6dcf8a666bd"
          label-auteur="Auteur (Livre)"
          label-editeur="Editeur (Livre)"
          label-genre="Genre (Livre)"
          label-support="Support (Livre)"
        />
      </div>
      <div :class="tab5Text">
        <GenericTypeFormVue
          :list-auteur="listAuteur"
          :list-editeur="listEditeur"
          :list-support="listSupport"
          :list-genre="listGenre"
          type-id="177fd06b-6075-4c5e-93df-77c8de66c8d8"
          label-auteur="Auteur (Goodies)"
          label-editeur="Editeur (Goodies)"
          label-genre="Genre (Goodies)"
          label-support="Support (Goodies)"
        />
      </div>
    </div>
    <div class="grid grid-rows-[auto_1fr]">
      <div class="flex items-center bg-white rounded-lg m-10 p-4">
        <div class="flex-auto">
          Un label (Auteur, Studio...) n'est pas présent ?
        </div>
        <div
          class="flex-auto text-center text-white bg-gray-800 cursor-pointer hover:bg-gray-900 font-medium rounded-lg text-sm px-4 py-2"
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
        <UploadImage />
      </div>
    </div>
  </div>
</template>

<script>
import BasiqueForm from '~/components/NewOeuvre/BasiqueForm.vue';
import GenericTypeFormVue from '~/components/NewOeuvre/GenericTypeForm.vue';
import UploadImage from '~/components/UploadImage.vue';

export default {
  name: 'NewOeuvrePage',
  components: {
    BasiqueForm,
    GenericTypeFormVue,
    UploadImage
  },
  data () {
    return {
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
    }
  }
};
</script>
