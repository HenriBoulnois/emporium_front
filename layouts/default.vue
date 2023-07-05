<template>
  <v-app>
    <div class="h-screen bg-gray-700">
      <div class="grid grid-rows-[auto_1fr] h-full">
        <EmHeader />
        <div class="grid grid-cols-[auto_1fr]">
          <EmSideBar />
          <div
            class="rounded-tl-lg bg-zinc-600 pt-10 px-10 shadow-inner shadow-gray-700"
          >
            <Nuxt
              class="rounded-t-lg h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data: () => ({})
};
</script>
