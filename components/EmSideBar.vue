<template>
  <div
    id="default-sidebar"
    class="w-60 h-screen sticky top-0 bg-gray-700 pt-10"
    aria-label="Sidebar"
  >
    <div class="px-3 py-4 grid grid-rows-[auto_1fr_auto]">
      <ul class="space-y-2 font-medium">
        <li>
          <NuxtLink to="/">
            <a
              class="flex items-center rounded-lg p-2 text-white hover:bg-gray-600"
            >
              <span class="material-symbols-outlined"> home </span>
              <span class="ml-3"> Accueil </span>
            </a>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/oeuvres">
            <a
              class="flex items-center rounded-lg p-2 text-white hover:bg-gray-600"
            >
              <span class="material-symbols-outlined">
                featured_play_list
              </span>
              <span class="flex-1 ml-3 whitespace-nowrap"> Oeuvres </span>
            </a>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/new/oeuvre">
            <a
              class="flex items-center rounded-lg p-2 text-white hover:bg-gray-600"
            >
              <span class="material-symbols-outlined"> playlist_add </span>
              <span class="flex-1 ml-3 whitespace-nowrap">
                Nouvelle Oeuvre
              </span>
            </a>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/users">
            <a
              class="flex items-center p-2 rounded-lg text-white hover:bg-gray-600"
            >
              <span class="material-symbols-outlined"> group </span>
              <span class="flex-1 ml-3 whitespace-nowrap"> Utilisateurs </span>
            </a>
          </NuxtLink>
        </li>
      </ul>
      <div />
      <EmFooterSideBar />
    </div>
  </div>
</template>
