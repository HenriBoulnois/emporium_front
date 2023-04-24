<template>
  <div class="h-screen bg-gray-800">
    <div class="grid grid-rows-[auto_1fr] h-full">
      <EmHeader />
      <div class="grid grid-cols-[auto_1fr]">
        <EmSideBar />
        <div class="rounded-tl-lg bg-gray-600 pt-10 px-10 shadow-inner shadow-gray-700">
          <Nuxt class=" bg-gray-800 rounded-t-lg h-full shadow-2xl shadow-gray-500" />
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
