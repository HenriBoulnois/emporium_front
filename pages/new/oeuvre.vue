<template>
  <div>
    <div class="grid grid-cols-[auto_1fr]">
      <div class="mr-6">
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
            @display-preview-event="displayPreview"
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
            @display-preview-event="displayPreview"
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
            @display-preview-event="displayPreview"
          />
        </div>
        <div :class="tab4Text">
          <GenericTypeFormVue
            :list-auteur="listAuteur"
            :list-editeur="listEditeur"
            :list-support="listSupport"
            :list-genre="listGenre"
            type-id="3"
            label-auteur="Auteur (Livre)"
            label-editeur="Editeur (Livre)"
            label-genre="Genre (Livre)"
            label-support="Support (Livre)"
            @display-preview-event="displayPreview"
          />
        </div>
        <div :class="tab5Text">
          <GenericTypeFormVue
            :list-auteur="listAuteur"
            :list-editeur="listEditeur"
            :list-support="listSupport"
            :list-genre="listGenre"
            type-id="4"
            label-auteur="Auteur (Goodies)"
            label-editeur="Editeur (Goodies)"
            label-genre="Genre (Goodies)"
            label-support="Support (Goodies)"
            @display-preview-event="displayPreview"
          />
        </div>
      </div>
      <div class="grid grid-rows-[auto_1fr]">
        <div class="flex items-center bg-white rounded-lg ml-6 mb-6 p-4">
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
            Ajoutez-le !
          </div>
        </div>
        <div class="bg-gray-700 rounded-lg ml-6 grid place-items-center">
          <img :src="previewImage" class="max-h-[700px] max-w-fit">
        </div>
      </div>
    </div>
    <CompleteAccountDialog v-if="dialog" :can-disable="false" />
  </div>
</template>

<script>
import BasiqueForm from '~/components/NewOeuvre/BasiqueForm.vue';
import GenericTypeFormVue from '~/components/NewOeuvre/GenericTypeForm.vue';
import CompleteAccountDialog from '~/components/User/CompleteAccountDialog.vue';

export default {
  name: 'NewOeuvrePage',
  components: {
    BasiqueForm,
    GenericTypeFormVue,
    CompleteAccountDialog
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
      listType: undefined,
      listAuteur: undefined,
      listEditeur: undefined,
      listSupport: undefined,
      listGenre: undefined,
      previewImage: undefined,
      dialog: false
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
    },
    displayPreview (payload) {
      this.previewImage = payload.image;
    }
  }
};
</script>
