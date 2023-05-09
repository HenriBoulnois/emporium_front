<template>
  <div id="default-sidebar" class="w-60 h-screen sticky top-0 bg-gray-800" aria-label="Sidebar">
    <div
      class="px-3 py-4 grid grid-rows-[auto_1fr_auto]"
    >
      <ul class="space-y-2 font-medium">
        <li>
          <NuxtLink to="/">
            <a
              class="flex items-center p-2 text-white hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <span class="ml-3"> Accueil </span>
            </a>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/oeuvres">
            <a
              class="flex items-center p-2 text-white hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5
                 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap"> Oeuvres </span>
            </a>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/users">
            <a
              class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                />
                <path
                  d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                />
              </svg>
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
