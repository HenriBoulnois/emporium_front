<template>
  <div>
    <v-row v-if="!canDisableDialog" justify="center">
      <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="text-h5">
            Stop, pas plus loin !
          </v-card-title>
          <v-card-text>
            Votre compte n'est pas encore créé, pour naviguer pleinement,
            veuillez créer votre compte
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="gray"
              text
              @click="
                $router.push({
                  path: '/'
                })
              "
            >
              Revenir à l'accueil
            </v-btn>
            <v-btn
              v-if="!$auth.loggedIn"
              color="green darken-1"
              text
              @click="
                $router.push({
                  path: '/login'
                })
              "
            >
              Connectez-vous
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-if="$auth.loggedIn"
              color="green darken-1"
              text
              @click="
                $router.push({
                  path: '/new/user'
                })
              "
            >
              Cliquer ici pour configurer votre compte
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <div :class="display">
      <div
        v-if="canDisableDialog"
        class="bg-green-700 p-2 mb-2 grid grid-cols-[auto_auto_1fr_auto] rounded-lg"
      >
        <div class="mr-3">
          Pour profiter pleinement des fonctionnalités d'Emporium, veuillez
          finir votre connexion !
        </div>
        <div
          class="cursor-pointer"
          @click="
            $router.push({
              path: '/new/user'
            })
          "
        >
          Cliquer ici pour configurer votre compte
        </div>
        <div />
        <div
          class="cursor-pointer"
          @click="
            () => {
              display = 'hidden';
            }
          "
        >
          X
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompleteAccountDialog',
  props: {
    canDisable: undefined
  },
  data () {
    return {
      dialog: true,
      canDisableDialog: this.canDisable,
      display: ''
    };
  }
};
</script>
