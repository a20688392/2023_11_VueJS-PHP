<script setup>
import NavBoard from '@/components/Nav/NavBoard.vue'
import UserProfile from '@/components/UserProfile/UserProfile.vue'
import OwnComment from '@/components/Comment/OwnComment.vue'
</script>

<template>
  <NavBoard />
  <div class="bg-secondary bg-opacity-25">
    <div class="container">
      <div class="row align-items-start p-3">
        <UserProfile />
        <OwnComment />
      </div>
    </div>
  </div>
</template>
