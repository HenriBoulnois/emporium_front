<template>
  <div class="h-screenbg-gray-10 dark:bg-gray-800">
    <div class="grid grid-rows-[auto_1fr] h-full">
      <EmHeader />
      <div class="grid grid-cols-[auto_1fr]">
        <EmSideBar />
        <div class="rounded-tl-lg dark:bg-gray-600 pt-10 px-10">
          <Nuxt class=" bg-gray-50 dark:bg-gray-800 rounded-t-lg h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data: () => ({})
};
</script>
