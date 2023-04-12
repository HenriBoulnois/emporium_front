<template>
  <div class="grid grid-cols-[auto_1fr] h-screen">
    <SideBar />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EmHeader'
}
</script>

<style scoped></style>
