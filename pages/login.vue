<template>
  <div class="grid grid-cols-[1fr_auto_1fr]">
    <div>gauche</div>
    <div class="bg-blue-500 p-5 m-5">
      <button @click="$auth.loginWith('auth0')">
        Log in
      </button>
      <button v-if="$auth.loggedIn" @click="$auth.logout()">
        Logout
      </button>
      {{ $auth.user.name }}
    </div>
    <div>droite</div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
};
</script>
