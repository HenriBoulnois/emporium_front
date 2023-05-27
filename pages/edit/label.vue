<template>
  <div>
    <div class="grid">
      <div class="grid grid-cols-2 bg-gray-700 shadow-inner rounded-lg h-fit">
        <div class="grid bg-white p-4 rounded-l-lg h-full text-xl font-bold">
          Liste des labels
          <v-autocomplete
            v-model="inputLabel"
            :items="listType"
            item-text="name"
            return-object
            label="Type"
          />
          <v-autocomplete
            v-model="inputLabel"
            :items="listAuteur"
            item-text="name"
            return-object
            label="Auteur"
          />
          <v-autocomplete
            v-model="inputLabel"
            :items="listEditeur"
            item-text="name"
            return-object
            label="Editeur"
          />
          <v-autocomplete
            v-model="inputLabel"
            :items="listSupport"
            item-text="name"
            return-object
            label="Support"
          />
          <v-autocomplete
            v-model="inputLabel"
            :items="listGenre"
            item-text="name"
            return-object
            label="Genre"
          />
        </div>
        <div class="bg-gray-200 p-4 rounded-r-lg drop-shadow-xl">
          <div class="text-gray-700 text-xl font-bold mb-2">
            Nouveau nom :
          </div>
          <div v-if="inputLabel" class="m-4">
            Label selectionné : {{ inputLabel.name }}
          </div>
          <input
            v-model="inputNewName"
            class="shadow appearance-none border rounded m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Nouveau nom"
          >
          <div
            class="w-fit text-center text-white bg-gray-800 cursor-pointer hover:bg-gray-900 font-medium rounded-lg text-sm m-4 px-4 py-2"
            @click="submitChange()"
          >
            Envoyer
          </div>
          <div :class="error">
            Une erreur est survenue.
          </div>
          <div :class="errorNoInput">
            Veuillez selectionner un label ET sa nouvelle appellation.
          </div>
          <div :class="success">
            Le label a bien été modifié.
          </div>
        </div>
      </div>
    </div>
    <CompleteAccountDialog v-if="dialog" :can-disable="false" />
  </div>
</template>

<script>
import CompleteAccountDialog from '~/components/User/CompleteAccountDialog.vue';
export default {
  name: 'EditLabelPage',
  components: {
    CompleteAccountDialog
  },
  data () {
    return {
      listType: undefined,
      listAuteur: undefined,
      listEditeur: undefined,
      listSupport: undefined,
      listGenre: undefined,
      inputLabel: null,
      inputNewName: '',
      error: 'hidden',
      success: 'hidden',
      errorNoInput: 'hidden',
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
    submitChange () {
      if (this.inputNewName !== '' && this.inputLabel !== null) {
        if (this.inputLabel.idType !== undefined) {
          const newLabelName = {
            id: this.inputLabel.idType,
            name: this.inputNewName
          };
          this.submitMethod('type', newLabelName);
        }
        if (this.inputLabel.idAuteur !== undefined) {
          const newLabelName = {
            id: this.inputLabel.idAuteur,
            name: this.inputNewName
          };
          this.submitMethod('auteur', newLabelName);
        }
        if (this.inputLabel.idGenre !== undefined) {
          const newLabelName = {
            id: this.inputLabel.idGenre,
            name: this.inputNewName
          };
          this.submitMethod('genre', newLabelName);
        }
        if (this.inputLabel.idEditeur !== undefined) {
          const newLabelName = {
            id: this.inputLabel.idEditeur,
            name: this.inputNewName
          };
          this.submitMethod('editeur', newLabelName);
        }
        if (this.inputLabel.idSupport !== undefined) {
          const newLabelName = {
            id: this.inputLabel.idSupport,
            name: this.inputNewName
          };
          this.submitMethod('support', newLabelName);
        }
      } else {
        this.errorNoInput = '';
        setTimeout(() => {
          this.errorNoInput = 'hidden';
        }, 2000);
      }
    },
    submitMethod (typeLabel, newLabelName) {
      this.$axios
        .$put('https://emporiumback.fly.dev/' + typeLabel, newLabelName)
        .then(() => {
          this.inputNewName = '';
          this.error = 'hidden';
          this.success = '';
        })
        .catch(() => {
          this.success = 'hidden';
          this.error = '';
        });
        this.inputLabel = null
    }
  }
};
</script>
