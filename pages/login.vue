<template>
  <div>
    <div class="grid grid-cols-[1fr_auto_1fr]">
      <div />
      <div
        class="grid grid-rows-[auto_auto_auto] bg-white p-5 rounded-lg place-items-center"
      >
        <div v-if="!$auth.loggedIn">
          Emporium utilise le service d'authentification Auth0, pour vous
          connecter cliquer sur ce boutton.
        </div>
        <div
          v-if="!$auth.loggedIn"
          class="w-fit text-center text-white bg-gray-700 cursor-pointer hover:bg-gray-800 font-medium rounded-lg text-sm m-4 px-4 py-2"
          @click="$auth.loginWith('auth0')"
        >
          Se connecter / S'inscrire
        </div>
        <div>
          Il faudra ensuite compléter votre profil pour profiter de toutes les
          fonctionnalités du site comme :
          <div>- L'ajout et la modification d'oeuvre</div>
          <div>- L'ajout et la modification de label</div>
          <div>- La personnalisation du profil</div>
          <div>- L'ajout de commentaires</div>
          <div>
            - La gestion de sa collection personnelle avec des favoris !
          </div>
        </div>
        <div
          v-if="$auth.loggedIn"
          class="w-fit text-center text-white bg-gray-700 cursor-pointer hover:bg-gray-800 font-medium rounded-lg text-sm m-4 px-4 py-2"
          @click="$auth.logout()"
        >
          Se déconnecter
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
};
</script>
