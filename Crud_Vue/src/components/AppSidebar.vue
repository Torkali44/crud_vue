<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-3 bg-light h-100"
    style="width: 250px"
  >
    <ul class="nav nav-pills flex-column mb-auto gap-2">
      <li class="nav-item">
        <RouterLink
          to="/"
          class="nav-link"
          :class="({ isActive }) => (isActive ? 'active' : 'link-dark')"
        >
          Home
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/students"
          class="nav-link"
          :class="({ isActive }) => (isActive ? 'active' : 'link-dark')"
        >
          Students
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/contact"
          class="nav-link"
          :class="({ isActive }) => (isActive ? 'active' : 'link-dark')"
        >
          Contact
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/about"
          class="nav-link"
          :class="({ isActive }) => (isActive ? 'active' : 'link-dark')"
        >
          About
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/gallery"
          class="nav-link"
          :class="({ isActive }) => (isActive ? 'active' : 'link-dark')"
        >
          Gallery
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
