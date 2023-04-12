<template>
  <div class="h-full px-3 py-4 bg-gray-50 dark:bg-gray-800 grid grid-cols-[auto_1fr_auto]">
    <a
      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-fit"
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      >
      <span class="material-symbols-outlined"> diamond </span>
      <span class="ml-3 font-extrabold">
        <NuxtLink to="/"> Emporium </NuxtLink>
      </span>
    </a>
    <div />
    <div class="flex items-center">
      <span class="flex material-symbols-outlined"> person </span>
      <span class="flex ml-3 whitespace-nowrap"> Mon compte </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmHeader'
};
</script>

<style scoped></style>
