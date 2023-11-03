<script setup></script>
<template>
  <div class="balance" v-if="(login = true)">
    <img class="head-img" src="../../assets/logo.svg" />
    <li class="nav-item dropdown">
      <a
        class="dropdown-toggle head-profile"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        username
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="#">個人資料</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">登出</a></li>
      </ul>
    </li>
  </div>
</template>
