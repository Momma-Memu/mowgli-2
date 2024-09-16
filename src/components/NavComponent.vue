<script setup></script>

<template>
  <div class="logo">M<img src="/logo.svg" alt="Mowgli App Logo" />wgli</div>
  <div class="nav-items">
    <mo-modal class="nav-item">
       <template v-slot:open-btn>
         <div class="nav-title">Sign Up</div>
       </template>
       <template v-slot:head>
         <div id="head">Sign Up</div>
       </template>
       <template v-slot:body>
         <div id="body">Content</div>
       </template>
    </mo-modal>

    <mo-modal class="nav-item">
      <template v-slot:open-btn>
        <div class="nav-title">Sign In</div>
      </template>
      <template v-slot:head>
         <div id="head">Sign In</div>
       </template>
       <template v-slot:body>
        <mo-form id="sign-in"></mo-form>
       </template>
    </mo-modal>
  </div>

  <mo-dropdown side-bar>
    <template v-slot:button>
      <mo-icon mo-fa="fa-duotone fa-solid fa-bars"></mo-icon>
    </template>
    <template v-slot:content>
      <div>Hello There!</div>
    </template>
  </mo-dropdown>

</template>
<style>

</style>
