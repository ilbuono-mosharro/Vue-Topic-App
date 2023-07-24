<script setup>

</script>

<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main class="container mt-4">
    <div class="row justify-content-center align-items-center bg-body">
      <slot></slot>
    </div>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>

<style>
body {
  padding-top: 56px;
}
</style>