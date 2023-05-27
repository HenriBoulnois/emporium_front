<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>
        <v-card-text>
          Votre compte n'est pas encore créé pour naviguer pleinement, veuillez
          créer votre compte ici
          <div v-if="$auth.user">
            {{ $auth.user.email }}
          </div>
          <div
            class="cursor-pointer"
            @click="
              $router.push({
                path: '/new/user'
              })
            "
          >
            ICI
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="canDisableDialog"
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
      canDisableDialog: this.canDisable
    };
  }
};
</script>
