<script setup></script>
<template>
  <nav class="header-nav balance">
    <a class="navbar-brand" href="#">CMRDB-Board</a>
    <div class="balance">
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
  </nav>
</template>

<style>
.header-nav {
  background-color: #242f42;
  color: aliceblue;
  padding: 0.5rem;
}
.head-img {
  border-radius: 100%;
  width: 3rem;
}
.head-profile{
  padding: 1rem;
  color: aliceblue;
  text-decoration: none;
}
.balance{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
