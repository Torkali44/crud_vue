<template>
  <div class="d-flex flex-column vh-100">
    <AppHeader />

    <div class="container-fluid flex-grow-1 overflow-hidden px-0">
      <div class="row h-100 g-0">
        <div class="col-auto h-100 border-end border-2">
          <AppSidebar />
        </div>

        <div class="col p-4 overflow-auto bg-light">
          <RouterView />
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "../../components/AppHeader.vue";
import AppSidebar from "../../components/AppSidebar.vue";
import AppFooter from "../../components/AppFooter.vue";
import { RouterView } from "vue-router";
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
