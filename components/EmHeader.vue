<template>
  <div class="h-full px-3 py-4 bg-gray-50 dark:bg-gray-800">
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
  </div>
</template>

<script>
export default {
  name: 'EmHeader'
};
</script>

<style scoped></style>
